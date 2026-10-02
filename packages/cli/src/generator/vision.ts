import { readFileSync, existsSync } from "node:fs";
import { extname } from "node:path";
import type { GeneratedFile, GeneratorPlatform } from "./types.js";

function getApiKey(): string {
	if (process.env.NINEROUTER_API_KEY) return process.env.NINEROUTER_API_KEY;
	if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY;

	try {
		const yaml = readFileSync("/root/.hermes/config.yaml", "utf8");
		const match = yaml.match(/api_key:\s*['"]?(sk-[^'"\s]+)/);
		if (match?.[1]) return match[1];
	} catch {}

	return "";
}

function getMimeType(filePath: string): string {
	const ext = extname(filePath).toLowerCase();
	switch (ext) {
		case ".jpg":
		case ".jpeg":
			return "image/jpeg";
		case ".webp":
			return "image/webp";
		case ".svg":
			return "image/svg+xml";
		default:
			return "image/png";
	}
}

export interface VisionGenerateOptions {
	imagePath: string;
	platform: GeneratorPlatform;
	entityName: string;
	baseUrl?: string;
	model?: string;
	prompt?: string;
}

export async function generateVisionScreen(
	opts: VisionGenerateOptions,
): Promise<{ files: GeneratedFile[] }> {
	if (!existsSync(opts.imagePath)) {
		throw new Error(`Image file not found: ${opts.imagePath}`);
	}

	const apiKey = getApiKey();
	const baseUrl = opts.baseUrl || "http://127.0.0.1:20128/v1";
	const model = opts.model || "opencode-combo";

	const imageBuffer = readFileSync(opts.imagePath);
	const mimeType = getMimeType(opts.imagePath);
	const base64Data = imageBuffer.toString("base64");
	const dataUri = `data:${mimeType};base64,${base64Data}`;

	const systemPrompt = `You are Vultra Vision, an expert UI reverse-engineer and code generator.
Analyze the provided screenshot with microscopic precision and reconstruct it into production code.
STRICT ANTI-SLOP LAWS:
1. NEVER use generic purple/indigo AI glow gradients.
2. ZERO emoji icons in UI chrome. Use Lucide icons for Web, SF Symbols / Material Symbols for Flutter.
3. Lock continuous squircle radius: 16px on cards, 12px on inputs/buttons.
4. Single primary accent locked: Terracotta #A13F20 unless the screenshot explicitly uses another cohesive accent.
5. Canvas: warm light-mode first (#FBF9F9) with ink text (#1B1C1C) and subtle borders (#E8E4DF).
6. Tabular figures: 'tabular-nums font-mono' on numeric columns, currency, timestamps.

ARCHITECTURE RULES:
- If platform is 'svelte5':
  * Thin-page pattern: reactive state and handlers in 'src/lib/features/<name>/<name>.svelte.ts' with Svelte 5 Runes ($state, $derived).
  * Thin view markup in 'src/routes/<name>/+page.svelte' with Tailwind v4 @theme and Lucide icons.
- If platform is 'flutter':
  * Clean architecture with Flutter BLoC + Freezed.
  * 6 files: models/<name>_model.dart, bloc/<name>_event.dart, bloc/<name>_state.dart, bloc/<name>_bloc.dart, presentation/<name>_page.dart, presentation/widgets/<name>_content_widget.dart.

Respond in raw JSON ONLY:
{
  "files": [
    {
      "path": "relative/path/to/file.ext",
      "content": "full source code",
      "description": "brief description"
    }
  ]
}`;

	const userInstruction = opts.prompt
		? `Additional user instruction: ${opts.prompt}\n`
		: "";

	const userContent = [
		{
			type: "text",
			text: `Analyze this UI screenshot and reconstruct it for platform '${opts.platform}' with entity name '${opts.entityName}'.\n${userInstruction}Output production-ready code complying with all anti-slop rules. Respond in JSON only.`,
		},
		{
			type: "image_url",
			image_url: {
				url: dataUri,
			},
		},
	];

	const res = await fetch(`${baseUrl}/chat/completions`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`,
		},
		body: JSON.stringify({
			model,
			messages: [
				{ role: "system", content: systemPrompt },
				{ role: "user", content: userContent },
			],
			temperature: 0.1,
		}),
	});

	if (!res.ok) {
		const errText = await res.text();
		throw new Error(`Vision API error (${res.status}): ${errText}`);
	}

	const rawText = await res.text();
	let content = "";

	if (rawText.includes("data: ")) {
		for (const line of rawText.split("\n")) {
			const trimmed = line.trim();
			if (trimmed.startsWith("data: ") && !trimmed.includes("[DONE]")) {
				try {
					const json = JSON.parse(trimmed.slice(6));
					content +=
						json.choices?.[0]?.delta?.content || json.choices?.[0]?.text || "";
				} catch {}
			}
		}
	} else {
		try {
			const data = JSON.parse(rawText);
			content = data.choices?.[0]?.message?.content || "";
		} catch {
			content = rawText;
		}
	}

	let cleanJson = content.trim();
	const matchFence = cleanJson.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
	if (matchFence) {
		cleanJson = matchFence[1].trim();
	}

	const parsed = JSON.parse(cleanJson);
	return { files: parsed.files ?? [] };
}
