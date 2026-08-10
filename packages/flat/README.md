# @vultra/flat

[![npm version](https://img.shields.io/npm/v/@vultra/flat?style=flat-square&color=7c3aed)](https://www.npmjs.com/package/@vultra/flat)
[![Docs](https://img.shields.io/badge/docs-ui.vultra.id-7c3aed?style=flat-square&labelColor=1a1a1a)](https://ui.vultra.id)
[![License MIT](https://img.shields.io/npm/l/@vultra/flat?style=flat-square&color=7c3aed)](https://github.com/vultra-digital-asia/ui/blob/main/LICENSE)


Flat color geometric components with clip-path shapes for Vultra UI — BlobCard, HexagonGrid, DiamondBadge, WaveSection, PentagonStat, StarCard, TriangleAlert, CircleAvatar.

## Install

```bash
npm install @vultra/flat
```

## Usage

```svelte
<script>
  import { HexagonGrid, BlobCard, PentagonStat } from '@vultra/flat';
</script>

<HexagonGrid>
  <BlobCard>Organic shape</BlobCard>
</HexagonGrid>
<PentagonStat value={42} label="tasks" />
```

Pair with the flat theme for the full look:

```css
@import "@vultra/tokens/flat.css";
```

## License

MIT
