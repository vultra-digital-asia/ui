# @vultra/flat

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
