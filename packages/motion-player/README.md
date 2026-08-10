# @vultra/motion-player

[![npm version](https://img.shields.io/npm/v/@vultra/motion-player?style=flat-square&color=7c3aed)](https://www.npmjs.com/package/@vultra/motion-player)
[![Docs](https://img.shields.io/badge/docs-ui.vultra.id-7c3aed?style=flat-square&labelColor=1a1a1a)](https://ui.vultra.id)
[![License MIT](https://img.shields.io/npm/l/@vultra/motion-player?style=flat-square&color=7c3aed)](https://github.com/vultra-digital-asia/ui/blob/main/LICENSE)


Player, VideoPlayer, Timeline, and renderer for @vultra/motion — play back motion compositions in Svelte.

## Install

```bash
npm install @vultra/motion-player
```

## Usage

```svelte
<script>
  import { Player, Timeline } from '@vultra/motion-player';
</script>

<Player composition={myComposition}>
  <Timeline />
</Player>
```

## License

MIT
