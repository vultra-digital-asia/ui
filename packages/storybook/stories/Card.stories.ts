import type { Meta, StoryObj } from '@storybook/svelte';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from '@vultra/ui';

const meta = {
  title: 'Layout/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button },
    template: `
      <Card>
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>A simple card with content</CardDescription>
        </CardHeader>
        <CardContent>
          <p style="font-size:14px;">This is the card content area.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Action</Button>
        </CardFooter>
      </Card>
    `,
  }),
};

export const StatsCard: Story = {
  render: () => ({
    components: { Card },
    template: `
      <Card class="p-5" style="max-width: 240px;">
        <p style="font-size:14px; color: var(--ui-muted-foreground);">Total Revenue</p>
        <p style="font-size:24px; font-weight: bold;">$45,231</p>
        <p style="font-size:12px; color: #22c55e;">+20.1% from last month</p>
      </Card>
    `,
  }),
};
