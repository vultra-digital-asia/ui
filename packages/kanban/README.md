# @vultra/kanban

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
