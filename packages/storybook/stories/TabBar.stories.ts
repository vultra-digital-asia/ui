import type { Meta, StoryObj } from '@storybook/svelte';
import { House, Search, Bell, User } from 'lucide-svelte';
import { TabBar, TabBarItem } from '@vultra/ui';

const meta = {
  title: 'Mobile/TabBar',
  component: TabBar,
  tags: ['autodocs'],
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { TabBar, TabBarItem, House, Search, Bell, User },
    template: `
      <TabBar value="home">
        <TabBarItem value="home" label="Home">
          {#snippet icon()}<House />{/snippet}
        </TabBarItem>
        <TabBarItem value="search" label="Search">
          {#snippet icon()}<Search />{/snippet}
        </TabBarItem>
        <TabBarItem value="notifications" label="Alerts" badge={3}>
          {#snippet icon()}<Bell />{/snippet}
        </TabBarItem>
        <TabBarItem value="profile" label="Profile">
          {#snippet icon()}<User />{/snippet}
        </TabBarItem>
      </TabBar>
    `,
  }),
};