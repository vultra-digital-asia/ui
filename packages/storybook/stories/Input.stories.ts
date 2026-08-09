import type { Meta, StoryObj } from '@storybook/svelte';
import { Input, Label } from '@vultra/ui';

const meta = {
  title: 'Primitives/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'Enter your name' },
};

export const WithLabel: Story = {
  render: () => ({
    components: { Input, Label },
    template: `
      <div style="display:flex; flex-direction:column; gap:8px; max-width:320px;">
        <Label>Email address</Label>
        <Input type="email" placeholder="you@example.com" />
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: { placeholder: 'Disabled input', disabled: true },
};

export const Password: Story = {
  args: { type: 'password', placeholder: 'Enter your password', defaultValue: 'hunter2' },
};

export const Number: Story = {
  args: { type: 'number', placeholder: '0' },
};