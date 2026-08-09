import type { Meta, StoryObj } from '@storybook/svelte';
import { Hero, Button } from '@vultra/ui';

const meta = {
  title: 'Marketing/Hero',
  component: Hero,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['centered', 'split', 'fullwidth'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Centered: Story = {
  render: (args) => ({
    components: { Hero, Button },
    props: args,
    template: `
      <Hero {...$$restProps}>
        <p style="font-size:14px; color:var(--ui-muted-foreground); margin:0;">New release · v2.0</p>
        <h1 style="font-size:48px; font-weight:700; line-height:1.1; margin:0; max-width:640px;">
          Build faster with Vultra UI
        </h1>
        <p style="font-size:18px; color:var(--ui-muted-foreground); margin:0; max-width:480px;">
          A beautiful, accessible component library for Svelte 5 — ship polished interfaces in hours, not weeks.
        </p>
        <div style="display:flex; gap:12px;">
          <Button size="lg">Get started</Button>
          <Button size="lg" variant="outline">View docs</Button>
        </div>
      </Hero>
    `,
  }),
  args: { variant: 'centered', size: 'default' },
};

export const Split: Story = {
  render: (args) => ({
    components: { Hero, Button },
    props: args,
    template: `
      <Hero {...$$restProps}>
        <div style="flex:1; display:flex; flex-direction:column; gap:12px; align-items:flex-start; max-width:480px;">
          <p style="font-size:14px; color:var(--ui-muted-foreground); margin:0;">Product of the day</p>
          <h1 style="font-size:40px; font-weight:700; margin:0;">
            Analytics that make sense
          </h1>
          <p style="font-size:16px; color:var(--ui-muted-foreground); margin:0;">
            Understand your users with dashboards built for humans.
          </p>
          <Button size="lg">Start free trial</Button>
        </div>
        <div style="flex:1; min-width:280px; height:240px; border-radius:16px; background:linear-gradient(135deg, var(--ui-primary), var(--ui-primary-foreground)); display:flex; align-items:center; justify-content:center;">
          <p style="color:white; font-weight:600;">Dashboard preview</p>
        </div>
      </Hero>
    `,
  }),
  args: { variant: 'split', size: 'default' },
};