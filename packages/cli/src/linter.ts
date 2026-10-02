import { readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join, extname, relative } from "node:path";

export interface SlopViolation {
	file: string;
	line: number;
	rule: string;
	severity: "error" | "warning";
	message: string;
	snippet: string;
}

const EMOJI_REGEX =
	/[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/u;

const PURPLE_GRADIENT_REGEX =
	/(?:bg-gradient-to-[a-z]+\s+from-(?:purple|indigo|violet)|linear-gradient\([^)]*(?:#6366f1|#8b5cf6|#a855f7|purple|indigo))/i;

export function lintFile(filePath: string, content: string): SlopViolation[] {
	const violations: SlopViolation[] = [];
	const lines = content.split("\n");

	let hasCoolGrey = false;
	let hasWarmGrey = false;
	let coolGreyLine = 0;

	for (let i = 0; i < lines.length; i++) {
		const lineNum = i + 1;
		const line = lines[i];

		// 1. Emoji check in UI files
		if (EMOJI_REGEX.test(line)) {
			// Ignore comments
			if (
				!line.trim().startsWith("//") &&
				!line.trim().startsWith("*") &&
				!line.trim().startsWith("<!--")
			) {
				violations.push({
					file: filePath,
					line: lineNum,
					rule: "NO_EMOJI",
					severity: "error",
					message:
						"Emoji detected in UI chrome. Use Lucide icons or SF/Material Symbols.",
					snippet: line.trim(),
				});
			}
		}

		// 2. Purple gradient slop check
		if (PURPLE_GRADIENT_REGEX.test(line)) {
			violations.push({
				file: filePath,
				line: lineNum,
				rule: "NO_PURPLE_GRADIENTS",
				severity: "error",
				message:
					"Generic AI purple/indigo glow gradient detected. Use solid 1-accent system.",
				snippet: line.trim(),
			});
		}

		// 3. Mixed greys check
		if (/\b(?:zinc|slate)-[1-9]00\b/.test(line)) {
			hasCoolGrey = true;
			coolGreyLine = lineNum;
		}
		if (/\b(?:stone|sand)-[1-9]00\b|#fbf9f9|#e8e4df/i.test(line)) {
			hasWarmGrey = true;
		}

		// 4. Svelte thin-page violation: async fetch or mutations directly in +page.svelte
		if (filePath.endsWith("+page.svelte")) {
			if (/fetch\(|axios\.|\.then\(/.test(line) && !line.includes("//")) {
				violations.push({
					file: filePath,
					line: lineNum,
					rule: "THIN_PAGE_VIOLATION",
					severity: "warning",
					message:
						"Data fetching directly in +page.svelte. Move state/logic into src/lib/features/<name>/ composable.",
					snippet: line.trim(),
				});
			}
		}
	}

	if (hasCoolGrey && hasWarmGrey) {
		violations.push({
			file: filePath,
			line: coolGreyLine,
			rule: "NO_MIXED_GREYS",
			severity: "warning",
			message:
				"Mixed cool greys (zinc/slate) and warm greys (stone/sand) in the same file. Stick to one family.",
			snippet: lines[coolGreyLine - 1]?.trim() || "",
		});
	}

	return violations;
}

export function scanDirectory(
	dir: string,
	targetExts = [".svelte", ".dart", ".ts", ".tsx"],
): string[] {
	let files: string[] = [];
	try {
		const entries = readdirSync(dir);
		for (const entry of entries) {
			if (
				entry === "nodeToScan" ||
				entry === "node_modules" ||
				entry === ".git" ||
				entry === "dist" ||
				entry === "build" ||
				entry === ".svelte-kit"
			) {
				continue;
			}
			const fullPath = join(dir, entry);
			const stat = statSync(fullPath);
			if (stat.isDirectory()) {
				files = files.concat(scanDirectory(fullPath, targetExts));
			} else if (targetExts.includes(extname(fullPath))) {
				files.push(fullPath);
			}
		}
	} catch {}
	return files;
}

export function runAntiSlopLinter(targetDir: string): {
	totalFiles: number;
	violations: SlopViolation[];
} {
	const files = scanDirectory(targetDir);
	const allViolations: SlopViolation[] = [];

	for (const file of files) {
		try {
			const content = readFileSync(file, "utf8");
			const relPath = relative(targetDir, file);
			const v = lintFile(relPath, content);
			allViolations.push(...v);
		} catch {}
	}

	return { totalFiles: files.length, violations: allViolations };
}

export function fixSlop(content: string): {
	fixedContent: string;
	fixCount: number;
} {
	let fixCount = 0;
	const lines = content.split("\n");
	const fixedLines = lines.map((line) => {
		const trimmed = line.trim();
		if (
			trimmed.startsWith("//") ||
			trimmed.startsWith("*") ||
			trimmed.startsWith("<!--")
		) {
			return line;
		}
		if (EMOJI_REGEX.test(line)) {
			const cleaned = line.replace(new RegExp(EMOJI_REGEX.source, "gu"), "");
			const normalized = cleaned.replace(/\s{2,}/g, " ");
			if (normalized !== line) {
				fixCount++;
				return normalized;
			}
		}
		return line;
	});

	return { fixedContent: fixedLines.join("\n"), fixCount };
}

export function runAntiSlopFixer(targetDir: string): {
	totalFiles: number;
	filesModified: number;
	totalFixes: number;
} {
	const files = scanDirectory(targetDir);
	let filesModified = 0;
	let totalFixes = 0;

	for (const file of files) {
		try {
			const content = readFileSync(file, "utf8");
			const { fixedContent, fixCount } = fixSlop(content);
			if (fixCount > 0 && fixedContent !== content) {
				writeFileSync(file, fixedContent, "utf8");
				filesModified++;
				totalFixes += fixCount;
			}
		} catch {}
	}

	return { totalFiles: files.length, filesModified, totalFixes };
}
