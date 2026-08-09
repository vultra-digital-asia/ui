import { fileURLToPath } from "node:url";
import { dirname, join } from 'path';
import type { StorybookConfig } from '@storybook/svelte-vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|ts)'],
  addons: [],
  framework: {
    name: '@storybook/svelte-vite',
    options: {}
  },
  svelte: {
    compilerOptions: {}
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};

    const storybookDir = __dirname;
    const rootDir = join(storybookDir, '../..');

    // Components inside packages import their own utils via $lib
    config.resolve.alias['$lib'] = join(rootDir, 'core/src/lib');
    config.resolve.alias['@vultra/tokens'] = join(rootDir, 'tokens/src/base.css');
    config.resolve.alias['@vultra/grid-core/utils'] = join(rootDir, 'grid-core/src/lib/utils.ts');
    config.resolve.alias['@vultra/grid-core'] = join(rootDir, 'grid-core/src/lib/index.ts');
    config.resolve.alias['@vultra/data-table'] = join(rootDir, 'data-table/src/lib/index.ts');
    config.resolve.alias['@vultra/charts'] = join(rootDir, 'charts/src/lib/index.ts');
    config.resolve.alias['@vultra/calendar'] = join(rootDir, 'calendar/src/lib/index.ts');
    config.resolve.alias['@vultra/kanban'] = join(rootDir, 'kanban/src/lib/index.ts');
    config.resolve.alias['@vultra/rich-text'] = join(rootDir, 'rich-text/src/lib/index.ts');
    config.resolve.alias['@vultra/motion-player'] = join(rootDir, 'motion-player/src/lib/index.ts');
    config.resolve.alias['@vultra/motion'] = join(rootDir, 'motion/src/lib/index.ts');
    config.resolve.alias['@vultra/motion-effects'] = join(rootDir, 'motion-effects/src/lib/index.ts');

    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.exclude = config.optimizeDeps.exclude || [];
    config.optimizeDeps.exclude.push('formsnap', '@vultra/core');

    config.server = config.server || {};
    config.server.fs = config.server.fs || {};
    config.server.fs.allow = config.server.fs.allow || [];
    config.server.fs.allow.push(rootDir);

    return config;
  }
};

export default config;