import type { Meta, StoryObj } from '@storybook/svelte';
import { Skeleton } from '@vultra/ui';

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div style="display:flex; align-items:center; gap:16px; width:300px;">
        <Skeleton class="h-12 w-12" />
        <div style="flex:1; display:flex; flex-direction:column; gap:8px;">
          <Skeleton class="h-4 w-40" />
          <Skeleton class="h-4 w-28" />
        </div>
      </div>
    `,
  }),
};

export const CardSkeleton: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div style="display:flex; flex-direction:column; gap:12px; width:280px; border:1px solid var(--ui-border); border-radius:12px; padding:16px;">
        <Skeleton class="h-32 w-full" />
        <Skeleton class="h-4 w-3/4" />
        <Skeleton class="h-4 w-1/2" />
      </div>
    `,
  }),
};