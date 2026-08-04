#!/usr/bin/env node
import { program } from 'commander';
import { loadRegistry } from './registry.js';
import { installComponents } from './install.js';

program
	.name('vultra')
	.description('Vultra UI component installer for Svelte projects')
	.version('0.1.0');

program
	.command('add')
	.description('Add a Vultra UI component to your project')
	.argument('<components...>', 'component names, e.g. button card data-table')
	.option('-y, --yes', 'skip confirmation and overwrite existing files')
	.option('-o, --overwrite', 'overwrite existing component files')
	.action(async (components: string[], opts: { yes?: boolean; overwrite?: boolean }) => {
		const overwrite = opts.yes || opts.overwrite || false;
		try {
			const registry = await loadRegistry();
			const known = new Set(registry.components.map((c) => c.name));
			const unknown = components.filter((c) => !known.has(c));
			if (unknown.length > 0) {
				console.error(
					`Unknown component${unknown.length > 1 ? 's' : ''}: ${unknown.join(', ')}`,
				);
				console.error(`Available: ${[...known].sort().join(', ')}`);
				process.exit(1);
			}

			const { installed, written, skipped, addedDeps } = await installComponents(
				components,
				{ overwrite, cwd: process.cwd() },
			);

			console.log(`Installed ${installed.length} component(s): ${installed.join(', ')}`);
			if (written.length > 0) {
				console.log(`Wrote ${written.length} file(s)`);
			}
			if (skipped.length > 0) {
				console.log(
					`Skipped ${skipped.length} existing file(s) (use --overwrite to replace):`,
				);
				for (const f of skipped) console.log(`  ${f}`);
			}
			const depNames = Object.keys(addedDeps);
			if (depNames.length > 0) {
				console.log(`Added ${depNames.length} dependency(ies) to package.json:`);
				for (const d of depNames) console.log(`  ${d}@${addedDeps[d]}`);
				console.log('Run `pnpm install` to install them.');
			}
		} catch (err) {
			console.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
			process.exit(1);
		}
	});

program
	.command('list')
	.description('List all available components')
	.action(async () => {
		try {
			const registry = await loadRegistry();
			const names = registry.components.map((c) => c.name).sort();
			console.log(`${names.length} components available:`);
			for (const name of names) console.log(`  ${name}`);
		} catch (err) {
			console.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
			process.exit(1);
		}
	});

program.parse();
