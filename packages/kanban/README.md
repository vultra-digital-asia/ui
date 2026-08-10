# @vultra/kanban

[![npm version](https://img.shields.io/npm/v/@vultra/kanban?style=flat-square&color=7c3aed)](https://www.npmjs.com/package/@vultra/kanban)
[![Docs](https://img.shields.io/badge/docs-ui.vultra.id-7c3aed?style=flat-square&labelColor=1a1a1a)](https://ui.vultra.id)
[![License MIT](https://img.shields.io/npm/l/@vultra/kanban?style=flat-square&color=7c3aed)](https://github.com/vultra-digital-asia/ui/blob/main/LICENSE)


Kanban board component with drag-and-drop for Vultra UI.

## Install

```bash
npm install @vultra/kanban
```

## Usage

```svelte
<script>
  import { KanbanBoard, KanbanColumn } from '@vultra/kanban';
</script>

<KanbanBoard columns={[{ id: 'todo', title: 'To do', cards: [] }]} />
```

## License

MIT
