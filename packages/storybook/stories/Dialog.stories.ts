import type { Meta, StoryObj } from '@storybook/svelte';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Button } from '@vultra/ui';

const meta = {
  title: 'Overlay/Dialog',
  component: Dialog,
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Button },
    template: `
      <Dialog>
        <DialogTrigger>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive">Delete account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    `,
  }),
};

export const Controlled: Story = {
  args: { open: true },
  render: (args) => ({
    components: { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, Button },
    props: args,
    template: `
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Controlled dialog</DialogTitle>
            <DialogDescription>
              This dialog is rendered open by default via the \`open\` prop.
            </DialogDescription>
          </DialogHeader>
          <DialogClose>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    `,
  }),
};