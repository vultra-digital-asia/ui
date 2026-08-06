# Progress

A progress bar showing completion status of a task or operation.

## Install

```bash
npx @vultra/cli add progress
```

## Usage

```svelte
<script>
  import { Progress } from '@vultra/ui';
</script>

<Progress value={33} max={100} />
```

## Props

| Prop | Type | Default |
|------|------|---------|
| `value` | `number` | `0` |
| `max` | `number` | `100` |
| `class` | `string` | — |

The progress bar is a styled native `<progress>` element with design token colors and smooth transitions.
