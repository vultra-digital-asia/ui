import type { Meta, StoryObj } from '@storybook/svelte';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@vultra/ui';

const meta = {
  title: 'Layout/Accordion',
  component: Accordion,
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Accordion, AccordionItem, AccordionTrigger, AccordionContent },
    template: `
      <Accordion type="single" collapsible value="item-1" style="max-width: 480px;">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            <p>Yes. It adheres to the WAI-ARIA design pattern.</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            <p>Yes. It comes with default styles that match the other components' aesthetic.</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            <p>Yes. It's animated by default, but you can disable it if you prefer.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    `,
  }),
};