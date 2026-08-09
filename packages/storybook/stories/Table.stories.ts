import type { Meta, StoryObj } from '@storybook/svelte';
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from '@vultra/ui';

const meta = {
  title: 'Data/Table',
  component: Table,
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption },
    template: `
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead style="width:100px;">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead style="text-align:right;">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell style="font-weight:500;">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell style="text-align:right;">$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style="font-weight:500;">INV002</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell>PayPal</TableCell>
            <TableCell style="text-align:right;">$150.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style="font-weight:500;">INV003</TableCell>
            <TableCell>Unpaid</TableCell>
            <TableCell>Bank Transfer</TableCell>
            <TableCell style="text-align:right;">$350.00</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colspan="3">Total</TableCell>
            <TableCell style="text-align:right;">$750.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    `,
  }),
};