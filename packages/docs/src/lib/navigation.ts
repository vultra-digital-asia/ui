export interface NavItem {
	title: string;
	href: string;
	items?: { title: string; href: string }[];
}

export const navigation: NavItem[] = [
	{
		title: 'Getting Started',
		href: '/docs/getting-started',
		items: [
			{ title: 'Installation', href: '/docs/getting-started' },
			{ title: 'Examples', href: '/examples' },
			{ title: 'Playground', href: '/playground' }
		]
	},
	{
		title: 'Components',
		href: '/docs/components',
		items: [
			{ title: 'Overview', href: '/docs/components' },
			{ title: 'Accordion', href: '/docs/components/accordion' },
			{ title: 'Alert', href: '/docs/components/alert' },
			{ title: 'Badge', href: '/docs/components/badge' },
			{ title: 'Bento Grid', href: '/docs/components/bento-grid' },
			{ title: 'Button', href: '/docs/components/button' },
			{ title: 'Card', href: '/docs/components/card' },
			{ title: 'Carousel', href: '/docs/components/carousel' },
			{ title: 'CTA Section', href: '/docs/components/cta-section' },
			{ title: 'Dialog', href: '/docs/components/dialog' },
			{ title: 'Dropdown Menu', href: '/docs/components/dropdown-menu' },
			{ title: 'Feature Grid', href: '/docs/components/feature-grid' },
			{ title: 'Footer', href: '/docs/components/footer' },
			{ title: 'Hero', href: '/docs/components/hero' },
			{ title: 'Input', href: '/docs/components/input' },
			{ title: 'Navbar', href: '/docs/components/navbar' },
			{ title: 'Pricing Card', href: '/docs/components/pricing-card' },
			{ title: 'Select', href: '/docs/components/select' },
			{ title: 'Stats', href: '/docs/components/stats' },
			{ title: 'Tabs', href: '/docs/components/tabs' },
			{ title: 'Table', href: '/docs/components/table' },
			{ title: 'Testimonial', href: '/docs/components/testimonial' },
			{ title: 'Toast', href: '/docs/components/toast' }
		]
	},
	{
		title: 'Design Tokens',
		href: '/docs/tokens',
		items: [{ title: 'Tokens', href: '/docs/tokens' }]
	},
	{
		title: 'Themes',
		href: '/docs/themes',
		items: [
			{ title: 'Overview', href: '/docs/themes' },
			{ title: 'shadcn', href: '/docs/themes' },
			{ title: 'Material Design 3', href: '/docs/themes/md3' },
			{ title: 'Flat', href: '/docs/themes/flat' },
			{ title: 'Glass', href: '/docs/themes/glass' },
			{ title: 'Brutalist', href: '/docs/themes/brutalist' },
			{ title: 'Neumorphism', href: '/docs/themes/neumorphism' },
			{ title: 'Retro', href: '/docs/themes/retro' },
			{ title: 'Cyberpunk', href: '/docs/themes/cyberpunk' },
			{ title: 'Minimalist', href: '/docs/themes/minimalist' }
		]
	}
];
