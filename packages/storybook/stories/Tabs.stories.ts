import type { Meta, StoryObj } from '@storybook/svelte';
import { Tabs, TabsList, TabsTrigger, TabsContent, Card } from '@vultra/ui';

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Tabs, TabsList, TabsTrigger, TabsContent, Card },
    template: `
      <Tabs value="account" style="max-width: 480px;">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card class="p-4 mt-4"><p style="font-size:14px;">Make changes to your account here.</p></Card>
        </TabsContent>
        <TabsContent value="password">
          <Card class="p-4 mt-4"><p style="font-size:14px;">Change your password here.</p></Card>
        </TabsContent>
        <TabsContent value="billing">
          <Card class="p-4 mt-4"><p style="font-size:14px;">Manage your billing details here.</p></Card>
        </TabsContent>
      </Tabs>
    `,
  }),
};