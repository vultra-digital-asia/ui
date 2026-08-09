import type { Meta, StoryObj } from '@storybook/svelte';
import { Toast, toasts, Button } from '@vultra/ui';

const meta = {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Toast, toasts, Button },
    template: `
      <Button onclick={() => toasts.info('Heads up', 'You can add components to your app using the CLI.')}>
        Show toast
      </Button>
      <Toast />
    `,
  }),
};

export const Success: Story = {
  render: () => ({
    components: { Toast, toasts, Button },
    template: `
      <Button onclick={() => toasts.success('Saved', 'Your changes have been saved successfully.')}>
        Show success toast
      </Button>
      <Toast />
    `,
  }),
};

export const Error: Story = {
  render: () => ({
    components: { Toast, toasts, Button },
    template: `
      <Button variant="destructive" onclick={() => toasts.error('Delete failed', 'Something went wrong while deleting the file.')}>
        Show error toast
      </Button>
      <Toast />
    `,
  }),
};