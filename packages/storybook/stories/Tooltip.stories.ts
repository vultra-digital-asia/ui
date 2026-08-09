import type { Meta, StoryObj } from '@storybook/svelte';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent, Button } from '@vultra/ui';

const meta = {
  title: 'Overlay/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent, Button },
    template: `
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    `,
  }),
};

export const Placements: Story = {
  render: () => ({
    components: { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent, Button },
    template: `
      <TooltipProvider>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <Tooltip>
            <TooltipTrigger><Button variant="outline">Top</Button></TooltipTrigger>
            <TooltipContent side="top"><p>Top tooltip</p></TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger><Button variant="outline">Bottom</Button></TooltipTrigger>
            <TooltipContent side="bottom"><p>Bottom tooltip</p></TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger><Button variant="outline">Left</Button></TooltipTrigger>
            <TooltipContent side="left"><p>Left tooltip</p></TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger><Button variant="outline">Right</Button></TooltipTrigger>
            <TooltipContent side="right"><p>Right tooltip</p></TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    `,
  }),
};