# @vultra/rich-text

Rich text editor component powered by TipTap for Vultra UI.

## Install

```bash
npm install @vultra/rich-text
```

## Usage

```svelte
<script>
  import { RichTextEditor } from '@vultra/rich-text';
  import { ref } from 'svelte';

  let content = $state('<p>Hello</p>');
</script>

<RichTextEditor bind:content />
```

## License

MIT
