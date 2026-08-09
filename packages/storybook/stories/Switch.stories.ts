import type { Meta, StoryObj } from '@storybook/svelte';
import { Switch, Label } from '@vultra/ui';

const meta = {
  title: 'Form/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'default'],
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Switch, Label },
    template: `
      <div style="display:flex; align-items:center; gap:8px;">
        <Switch />
        <Label>Airplane mode</Label>
      </div>
    `,
  }),
};

export const Checked: Story = {
  args: { checked: true },
};

export const Unchecked: Story = {
  args: { checked: false },
};

export const Disabled: Story = {
  args: { checked: true, disabled: true },
};

export const Small: Story = {
  args: { size: 'sm', checked: true },
};