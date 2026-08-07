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
			{ title: 'Action Sheet', href: '/docs/components/actionsheet' },
			{ title: 'Alert', href: '/docs/components/alert' },
			{ title: 'Avatar Stack', href: '/docs/components/avatarstack' },
			{ title: 'Badge', href: '/docs/components/badge' },
			{ title: 'Bento Grid', href: '/docs/components/bento-grid' },
			{ title: 'Box', href: '/docs/components/box' },
			{ title: 'Button', href: '/docs/components/button' },
			{ title: 'Camera', href: '/docs/components/camera' },
			{ title: 'Card', href: '/docs/components/card' },
			{ title: 'Carousel', href: '/docs/components/carousel' },
			{ title: 'Clipboard', href: '/docs/components/clipboard' },
			{ title: 'Comment', href: '/docs/components/comment' },
			{ title: 'CTA Section', href: '/docs/components/cta-section' },
			{ title: 'Dialog', href: '/docs/components/dialog' },
			{ title: 'Dropdown Menu', href: '/docs/components/dropdown-menu' },
			{ title: 'Editable Label', href: '/docs/components/editable-label' },
			{ title: 'FAB Menu', href: '/docs/components/fabmenu' },
			{ title: 'Feature Grid', href: '/docs/components/feature-grid' },
			{ title: 'Flex', href: '/docs/components/flex' },
			{ title: 'Footer', href: '/docs/components/footer' },
			{ title: 'Gallery', href: '/docs/components/gallery' },
			{ title: 'Grid', href: '/docs/components/grid' },
			{ title: 'Gyroscope', href: '/docs/components/gyroscope' },
			{ title: 'Heatmap', href: '/docs/components/heatmap' },
			{ title: 'Hero', href: '/docs/components/hero' },
			{ title: 'Input', href: '/docs/components/input' },
			{ title: 'List View', href: '/docs/components/listview' },
			{ title: 'Live Badge', href: '/docs/components/live-badge' },
			{ title: 'Mobile Toast', href: '/docs/components/mobile-toast' },
			{ title: 'Navbar', href: '/docs/components/navbar' },
			{ title: 'Notification', href: '/docs/components/notification' },
			{ title: 'Pricing Card', href: '/docs/components/pricing-card' },
			{ title: 'Progress Steps', href: '/docs/components/progress-steps' },
			{ title: 'Pull to Refresh', href: '/docs/components/pulltorefresh' },
			{ title: 'Reaction Bar', href: '/docs/components/reaction-bar' },
			{ title: 'Segmented Control', href: '/docs/components/segmentedcontrol' },
			{ title: 'Select', href: '/docs/components/select' },
			{ title: 'Slide Menu', href: '/docs/components/slidemenu' },
			{ title: 'Stack', href: '/docs/components/stack' },
			{ title: 'Stats', href: '/docs/components/stats' },
			{ title: 'Status Indicator', href: '/docs/components/status-indicator' },
			{ title: 'Swipeable Item', href: '/docs/components/swipeableitem' },
			{ title: 'Tab Bar', href: '/docs/components/tabbar' },
			{ title: 'Tabs', href: '/docs/components/tabs' },
			{ title: 'Table', href: '/docs/components/table' },
			{ title: 'Testimonial', href: '/docs/components/testimonial' },
			{ title: 'Toast', href: '/docs/components/toast' },
			{ title: 'User Profile Card', href: '/docs/components/user-profile-card' },
			{ title: 'Barcode', href: '/docs/components/barcode' },
			{ title: 'Calendar', href: '/docs/components/calendar' },
			{ title: 'Charts', href: '/docs/components/charts' },
			{ title: 'Infinite Scroll', href: '/docs/components/infinite-scroll' },
			{ title: 'Kanban', href: '/docs/components/kanban' },
			{ title: 'Mention', href: '/docs/components/mention' },
			{ title: 'QR Code', href: '/docs/components/qr-code' },
			{ title: 'Split View', href: '/docs/components/split-view' },
			{ title: 'Validate', href: '/docs/components/validate' },
			{ title: 'Virtual List', href: '/docs/components/virtual-list' }
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
