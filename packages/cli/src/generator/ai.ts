import { readFileSync } from "node:fs";
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

export interface AiGenerateOptions {
	prompt: string;
	platform: GeneratorPlatform;
	entityName: string;
	baseUrl?: string;
	model?: string;
}

export async function generateAiScreen(
	opts: AiGenerateOptions,
): Promise<{ files: GeneratedFile[] }> {
	const apiKey = getApiKey();
	const baseUrl = opts.baseUrl || "http://127.0.0.1:20128/v1";
	const model = opts.model || "opencode-combo";

	const systemPrompt = `You are Vultra AI, an elite UI/UX engineer and code generator.
You generate production-ready code adhering to these STRICT anti-slop laws:
1. Anti-Slop Rules:
   - NO generic purple/indigo glow gradients.
   - NO glassmorphism or blurry card abuse.
   - ZERO emoji icons in UI chrome. Use Lucide for Web, SF Symbols / Material Symbols for Flutter.
   - STRICT continuous squircle radius: 16px on all cards.
   - 1 Accent Color Locked: Terracotta #A13F20.
   - Light mode first: canvas #FBF9F9, ink text #1B1C1C, borders #E8E4DF.
   - Tabular numerals (font-mono tabular-nums) for IDs, currency, metrics.

2. Architecture Requirements:
   - If platform is 'svelte5':
     * Thin-page pattern: page templates contain only markup and bindings.
     * All reactive state, derived computations, and async actions live in 'src/lib/features/<name>/<name>.svelte.ts' using Svelte 5 Runes ($state, $derived).
     * View lives in 'src/routes/<name>/+page.svelte' with Tailwind v4 @theme utilities and @lucide/svelte.
   - If platform is 'flutter':
     * Flutter BLoC + Freezed clean architecture.
     * Pure separation: business logic in bloc/ and models/, UI in presentation/ and widgets/.
     * Output 6 files:
       - lib/features/<name>/models/<name>_model.dart (@freezed model)
       - lib/features/<name>/bloc/<name>_event.dart (@freezed union events)
       - lib/features/<name>/bloc/<name>_state.dart (@freezed union states)
       - lib/features/<name>/bloc/<name>_bloc.dart (pure Bloc controller)
       - lib/features/<name>/presentation/<name>_page.dart (route wrapper with BlocProvider)
       - lib/features/<name>/presentation/widgets/<name>_content_widget.dart (stateless presentational widget)

Return JSON ONLY with this exact structure:
{
  "files": [
    {
      "path": "relative/file/path.ext",
      "content": "full code content here",
      "description": "brief description of this file"
    }
  ]
}`;

	const userPrompt = `Target Platform: ${opts.platform}
Entity Name: ${opts.entityName}
User Prompt: ${opts.prompt}

Generate all necessary production files now. Respond in valid raw JSON only.`;

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
				{ role: "user", content: userPrompt },
			],
			temperature: 0.2,
			response_format: { type: "json_object" },
		}),
	});

	if (!res.ok) {
		const errText = await res.text();
		throw new Error(`9Router API error (${res.status}): ${errText}`);
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

	// Extract JSON block from markdown fences if any
	let cleanJson = content.trim();
	const matchFence = cleanJson.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
	if (matchFence) {
		cleanJson = matchFence[1].trim();
	}

	const parsed = JSON.parse(cleanJson);
	return { files: parsed.files ?? [] };
}
