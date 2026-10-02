import type { Meta, StoryObj } from "@storybook/svelte";
import { ScreenDatatable } from "@vultra/screens";

const meta = {
	title: "Screens/ScreenDatatable",
	component: ScreenDatatable,
	tags: ["autodocs"],
	argTypes: {
		title: { control: "text" },
		description: { control: "text" },
	},
} satisfies Meta<typeof ScreenDatatable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "Semua Transaksi",
		description: "Kelola dan audit rekonsiliasi pembayaran tagihan secara real-time.",
	},
};
