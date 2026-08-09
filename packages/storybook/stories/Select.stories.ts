import type { Meta, StoryObj } from '@storybook/svelte';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@vultra/ui';

const meta = {
  title: 'Form/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Select, SelectTrigger, SelectContent, SelectItem, SelectValue },
    template: `
      <Select>
        <SelectTrigger style="min-width: 180px;">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple" label="Apple" />
          <SelectItem value="banana" label="Banana" />
          <SelectItem value="blueberry" label="Blueberry" />
          <SelectItem value="grapes" label="Grapes" />
          <SelectItem value="pineapple" label="Pineapple" />
        </SelectContent>
      </Select>
    `,
  }),
};