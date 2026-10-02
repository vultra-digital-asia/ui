import type { Meta, StoryObj } from "@storybook/svelte";
import { ScreenPaywall } from "@vultra/screens";

const meta = {
	title: "Screens/ScreenPaywall",
	component: ScreenPaywall,
	tags: ["autodocs"],
	argTypes: {
		title: { control: "text" },
		subtitle: { control: "text" },
		ctaText: { control: "text" },
	},
} satisfies Meta<typeof ScreenPaywall>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "Tingkatkan ke Akses Pro",
		subtitle: "Buka seluruh automasi faktur, laporan analitik, dan integrasi WhatsApp.",
		ctaText: "Mulai 7 Hari Uji Coba Gratis",
	},
};

export const CustomBrand: Story = {
	args: {
		title: "GlowArc Atelier Membership",
		subtitle: "Akses kurasi personal styling dan rekomendasi perawatan harian.",
		ctaText: "Daftar Membership Sekarang",
	},
};
