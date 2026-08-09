import type { Meta, StoryObj } from '@storybook/svelte';
import { Alert, AlertTitle, AlertDescription } from '@vultra/ui';

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Alert, AlertTitle, AlertDescription },
    props: args,
    template: `
      <Alert {...$$restProps}>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
      </Alert>
    `,
  }),
  args: { variant: 'default' },
};

export const Destructive: Story = {
  render: (args) => ({
    components: { Alert, AlertTitle, AlertDescription },
    props: args,
    template: `
      <Alert {...$$restProps}>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
      </Alert>
    `,
  }),
  args: { variant: 'destructive' },
};