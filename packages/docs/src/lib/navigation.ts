export interface NavItem {
	title: string;
	href: string;
	items?: { title: string; href: string }[];
}

export const navigation: NavItem[] = [
	{
		title: "Getting Started",
		href: "/docs/getting-started",
		items: [
			{ title: "Installation", href: "/docs/getting-started" },
			{ title: "Guides", href: "/docs/guides/theming" },
			{ title: "— Theming", href: "/docs/guides/theming" },
			{ title: "— Mobile apps", href: "/docs/guides/mobile" },
			{ title: "— CLI workflow", href: "/docs/guides/cli" },
			{ title: "Examples", href: "/examples" },
			{ title: "Playground", href: "/playground" }
		]
	},
	{
		title: "Benchmark Screens",
		href: "/docs/components/screen-paywall",
		items: [
			{
						"title": "Paywall Screen",
						"href": "/docs/components/screen-paywall"
			},
			{
						"title": "Data Table Screen",
						"href": "/docs/components/screen-datatable"
			},
			{
						"title": "Checkout Modal",
						"href": "/docs/components/screen-checkout-modal"
			},
			{
						"title": "Sidebar Shell",
						"href": "/docs/components/screen-sidebar-shell"
			},
			{
						"title": "Onboarding Carousel",
						"href": "/docs/components/screen-onboarding"
			}
]
	},
	{
		title: "Components",
		href: "/docs/components",
		items: [
			{
						"title": "Overview",
						"href": "/docs/components"
			},
			{
						"title": "Accordion",
						"href": "/docs/components/accordion"
			},
			{
						"title": "Actionsheet",
						"href": "/docs/components/actionsheet"
			},
			{
						"title": "Alert",
						"href": "/docs/components/alert"
			},
			{
						"title": "Alert Dialog",
						"href": "/docs/components/alert-dialog"
			},
			{
						"title": "Aside",
						"href": "/docs/components/aside"
			},
			{
						"title": "Aspect Ratio",
						"href": "/docs/components/aspect-ratio"
			},
			{
						"title": "Avatar",
						"href": "/docs/components/avatar"
			},
			{
						"title": "Avatar Group",
						"href": "/docs/components/avatar-group"
			},
			{
						"title": "Avatarstack",
						"href": "/docs/components/avatarstack"
			},
			{
						"title": "Badge",
						"href": "/docs/components/badge"
			},
			{
						"title": "Barcode",
						"href": "/docs/components/barcode"
			},
			{
						"title": "Bento Grid",
						"href": "/docs/components/bento-grid"
			},
			{
						"title": "Box",
						"href": "/docs/components/box"
			},
			{
						"title": "Breadcrumb",
						"href": "/docs/components/breadcrumb"
			},
			{
						"title": "Button",
						"href": "/docs/components/button"
			},
			{
						"title": "Calendar",
						"href": "/docs/components/calendar"
			},
			{
						"title": "Camera",
						"href": "/docs/components/camera"
			},
			{
						"title": "Card",
						"href": "/docs/components/card"
			},
			{
						"title": "Carousel",
						"href": "/docs/components/carousel"
			},
			{
						"title": "Charts",
						"href": "/docs/components/charts"
			},
			{
						"title": "Checkbox",
						"href": "/docs/components/checkbox"
			},
			{
						"title": "Clipboard",
						"href": "/docs/components/clipboard"
			},
			{
						"title": "Code Block",
						"href": "/docs/components/code-block"
			},
			{
						"title": "Collapsible",
						"href": "/docs/components/collapsible"
			},
			{
						"title": "Color Picker",
						"href": "/docs/components/color-picker"
			},
			{
						"title": "Combobox",
						"href": "/docs/components/combobox"
			},
			{
						"title": "Command",
						"href": "/docs/components/command"
			},
			{
						"title": "Comment",
						"href": "/docs/components/comment"
			},
			{
						"title": "Context Menu",
						"href": "/docs/components/context-menu"
			},
			{
						"title": "Copy To Clipboard",
						"href": "/docs/components/copy-to-clipboard"
			},
			{
						"title": "Cta Section",
						"href": "/docs/components/cta-section"
			},
			{
						"title": "Data Table",
						"href": "/docs/components/data-table"
			},
			{
						"title": "Date Picker",
						"href": "/docs/components/date-picker"
			},
			{
						"title": "Datetime Picker",
						"href": "/docs/components/datetime-picker"
			},
			{
						"title": "Details",
						"href": "/docs/components/details"
			},
			{
						"title": "Dialog",
						"href": "/docs/components/dialog"
			},
			{
						"title": "Divider",
						"href": "/docs/components/divider"
			},
			{
						"title": "Drawer",
						"href": "/docs/components/drawer"
			},
			{
						"title": "Dropdown Menu",
						"href": "/docs/components/dropdown-menu"
			},
			{
						"title": "Editable Label",
						"href": "/docs/components/editable-label"
			},
			{
						"title": "Emoji",
						"href": "/docs/components/emoji"
			},
			{
						"title": "Empty State",
						"href": "/docs/components/empty-state"
			},
			{
						"title": "Fabmenu",
						"href": "/docs/components/fabmenu"
			},
			{
						"title": "Feature Grid",
						"href": "/docs/components/feature-grid"
			},
			{
						"title": "Figure",
						"href": "/docs/components/figure"
			},
			{
						"title": "File Uploader",
						"href": "/docs/components/file-uploader"
			},
			{
						"title": "Flat Arrow Card",
						"href": "/docs/components/flat-arrow-card"
			},
			{
						"title": "Flat Blob Card",
						"href": "/docs/components/flat-blob-card"
			},
			{
						"title": "Flat Circle Avatar",
						"href": "/docs/components/flat-circle-avatar"
			},
			{
						"title": "Flat Circle Grid",
						"href": "/docs/components/flat-circle-grid"
			},
			{
						"title": "Flat Cross Badge",
						"href": "/docs/components/flat-cross-badge"
			},
			{
						"title": "Flat Diamond Badge",
						"href": "/docs/components/flat-diamond-badge"
			},
			{
						"title": "Flat Ellipse Badge",
						"href": "/docs/components/flat-ellipse-badge"
			},
			{
						"title": "Flat Hexagon Grid",
						"href": "/docs/components/flat-hexagon-grid"
			},
			{
						"title": "Flat Octagon Card",
						"href": "/docs/components/flat-octagon-card"
			},
			{
						"title": "Flat Parallelogram Card",
						"href": "/docs/components/flat-parallelogram-card"
			},
			{
						"title": "Flat Pentagon Stat",
						"href": "/docs/components/flat-pentagon-stat"
			},
			{
						"title": "Flat Star Card",
						"href": "/docs/components/flat-star-card"
			},
			{
						"title": "Flat Trapezoid Card",
						"href": "/docs/components/flat-trapezoid-card"
			},
			{
						"title": "Flat Triangle Alert",
						"href": "/docs/components/flat-triangle-alert"
			},
			{
						"title": "Flat Wave Section",
						"href": "/docs/components/flat-wave-section"
			},
			{
						"title": "Flat Zigzag Divider",
						"href": "/docs/components/flat-zigzag-divider"
			},
			{
						"title": "Flex",
						"href": "/docs/components/flex"
			},
			{
						"title": "Footer",
						"href": "/docs/components/footer"
			},
			{
						"title": "Form",
						"href": "/docs/components/form"
			},
			{
						"title": "Gallery",
						"href": "/docs/components/gallery"
			},
			{
						"title": "Grid",
						"href": "/docs/components/grid"
			},
			{
						"title": "Gyroscope",
						"href": "/docs/components/gyroscope"
			},
			{
						"title": "Heatmap",
						"href": "/docs/components/heatmap"
			},
			{
						"title": "Hero",
						"href": "/docs/components/hero"
			},
			{
						"title": "Hover Card",
						"href": "/docs/components/hover-card"
			},
			{
						"title": "Infinite Scroll",
						"href": "/docs/components/infinite-scroll"
			},
			{
						"title": "Input",
						"href": "/docs/components/input"
			},
			{
						"title": "Input Group",
						"href": "/docs/components/input-group"
			},
			{
						"title": "Kanban",
						"href": "/docs/components/kanban"
			},
			{
						"title": "Label",
						"href": "/docs/components/label"
			},
			{
						"title": "Listview",
						"href": "/docs/components/listview"
			},
			{
						"title": "Live Badge",
						"href": "/docs/components/live-badge"
			},
			{
						"title": "Logo Cloud",
						"href": "/docs/components/logo-cloud"
			},
			{
						"title": "Main",
						"href": "/docs/components/main"
			},
			{
						"title": "Markdown Renderer",
						"href": "/docs/components/markdown-renderer"
			},
			{
						"title": "MD3 Badge",
						"href": "/docs/components/md3-badge"
			},
			{
						"title": "MD3 Bottom Sheet",
						"href": "/docs/components/md3-bottom-sheet"
			},
			{
						"title": "MD3 Chip",
						"href": "/docs/components/md3-chip"
			},
			{
						"title": "MD3 Fab",
						"href": "/docs/components/md3-fab"
			},
			{
						"title": "MD3 Navigation Bar",
						"href": "/docs/components/md3-navigation-bar"
			},
			{
						"title": "MD3 Navigation Rail",
						"href": "/docs/components/md3-navigation-rail"
			},
			{
						"title": "MD3 Progress Indicator",
						"href": "/docs/components/md3-progress-indicator"
			},
			{
						"title": "MD3 Radio",
						"href": "/docs/components/md3-radio"
			},
			{
						"title": "MD3 Ripple",
						"href": "/docs/components/md3-ripple"
			},
			{
						"title": "MD3 Search Bar",
						"href": "/docs/components/md3-search-bar"
			},
			{
						"title": "MD3 Segmented Button",
						"href": "/docs/components/md3-segmented-button"
			},
			{
						"title": "MD3 Snackbar",
						"href": "/docs/components/md3-snackbar"
			},
			{
						"title": "MD3 Switch",
						"href": "/docs/components/md3-switch"
			},
			{
						"title": "MD3 Text Field",
						"href": "/docs/components/md3-text-field"
			},
			{
						"title": "MD3 Time Picker",
						"href": "/docs/components/md3-time-picker"
			},
			{
						"title": "MD3 Top App Bar",
						"href": "/docs/components/md3-top-app-bar"
			},
			{
						"title": "Mention",
						"href": "/docs/components/mention"
			},
			{
						"title": "Menubar",
						"href": "/docs/components/menubar"
			},
			{
						"title": "Mobile Toast",
						"href": "/docs/components/mobile-toast"
			},
			{
						"title": "Navbar",
						"href": "/docs/components/navbar"
			},
			{
						"title": "Navigation Menu",
						"href": "/docs/components/navigation-menu"
			},
			{
						"title": "Notification",
						"href": "/docs/components/notification"
			},
			{
						"title": "Number Input",
						"href": "/docs/components/number-input"
			},
			{
						"title": "Otp Input",
						"href": "/docs/components/otp-input"
			},
			{
						"title": "Pagination",
						"href": "/docs/components/pagination"
			},
			{
						"title": "Password Input",
						"href": "/docs/components/password-input"
			},
			{
						"title": "Popover",
						"href": "/docs/components/popover"
			},
			{
						"title": "Pricing Card",
						"href": "/docs/components/pricing-card"
			},
			{
						"title": "Pricing Table",
						"href": "/docs/components/pricing-table"
			},
			{
						"title": "Progress",
						"href": "/docs/components/progress"
			},
			{
						"title": "Progress Steps",
						"href": "/docs/components/progress-steps"
			},
			{
						"title": "Pulltorefresh",
						"href": "/docs/components/pulltorefresh"
			},
			{
						"title": "Qr Code",
						"href": "/docs/components/qr-code"
			},
			{
						"title": "Radio Group",
						"href": "/docs/components/radio-group"
			},
			{
						"title": "Rating",
						"href": "/docs/components/rating"
			},
			{
						"title": "Reaction Bar",
						"href": "/docs/components/reaction-bar"
			},
			{
						"title": "Resizable",
						"href": "/docs/components/resizable"
			},
			{
						"title": "Scroll Area",
						"href": "/docs/components/scroll-area"
			},
			{
						"title": "Search Select",
						"href": "/docs/components/search-select"
			},
			{
						"title": "Section",
						"href": "/docs/components/section"
			},
			{
						"title": "Section Header",
						"href": "/docs/components/section-header"
			},
			{
						"title": "Segmentedcontrol",
						"href": "/docs/components/segmentedcontrol"
			},
			{
						"title": "Select",
						"href": "/docs/components/select"
			},
			{
						"title": "Separator",
						"href": "/docs/components/separator"
			},
			{
						"title": "Sheet",
						"href": "/docs/components/sheet"
			},
			{
						"title": "Sidebar",
						"href": "/docs/components/sidebar"
			},
			{
						"title": "Signature Pad",
						"href": "/docs/components/signature-pad"
			},
			{
						"title": "Skeleton",
						"href": "/docs/components/skeleton"
			},
			{
						"title": "Slidemenu",
						"href": "/docs/components/slidemenu"
			},
			{
						"title": "Slider",
						"href": "/docs/components/slider"
			},
			{
						"title": "Split View",
						"href": "/docs/components/split-view"
			},
			{
						"title": "Stack",
						"href": "/docs/components/stack"
			},
			{
						"title": "Stat Card",
						"href": "/docs/components/stat-card"
			},
			{
						"title": "Stats",
						"href": "/docs/components/stats"
			},
			{
						"title": "Stats Counter",
						"href": "/docs/components/stats-counter"
			},
			{
						"title": "Status Indicator",
						"href": "/docs/components/status-indicator"
			},
			{
						"title": "Stepper",
						"href": "/docs/components/stepper"
			},
			{
						"title": "Swipeableitem",
						"href": "/docs/components/swipeableitem"
			},
			{
						"title": "Switch",
						"href": "/docs/components/switch"
			},
			{
						"title": "Tabbar",
						"href": "/docs/components/tabbar"
			},
			{
						"title": "Table",
						"href": "/docs/components/table"
			},
			{
						"title": "Tabs",
						"href": "/docs/components/tabs"
			},
			{
						"title": "Testimonial",
						"href": "/docs/components/testimonial"
			},
			{
						"title": "Testimonial Carousel",
						"href": "/docs/components/testimonial-carousel"
			},
			{
						"title": "Textarea",
						"href": "/docs/components/textarea"
			},
			{
						"title": "Timeline",
						"href": "/docs/components/timeline"
			},
			{
						"title": "Toast",
						"href": "/docs/components/toast"
			},
			{
						"title": "Toggle",
						"href": "/docs/components/toggle"
			},
			{
						"title": "Toggle Group",
						"href": "/docs/components/toggle-group"
			},
			{
						"title": "Tooltip",
						"href": "/docs/components/tooltip"
			},
			{
						"title": "Tree View",
						"href": "/docs/components/tree-view"
			},
			{
						"title": "User Profile Card",
						"href": "/docs/components/user-profile-card"
			},
			{
						"title": "Validate",
						"href": "/docs/components/validate"
			},
			{
						"title": "Virtual List",
						"href": "/docs/components/virtual-list"
			}
]
	},
	{
		title: "Design Tokens",
		href: "/docs/tokens",
		items: [{ title: "Tokens", href: "/docs/tokens" }]
	},
	{
		title: "Themes",
		href: "/docs/themes",
		items: [
			{ title: "Overview", href: "/docs/themes" },
			{ title: "shadcn", href: "/docs/themes" },
			{ title: "Material Design 3", href: "/docs/themes/md3" },
			{ title: "Flat", href: "/docs/themes/flat" },
			{ title: "Glass", href: "/docs/themes/glass" },
			{ title: "Brutalist", href: "/docs/themes/brutalist" },
			{ title: "Neumorphism", href: "/docs/themes/neumorphism" },
			{ title: "Retro", href: "/docs/themes/retro" },
			{ title: "Cyberpunk", href: "/docs/themes/cyberpunk" },
			{ title: "Minimalist", href: "/docs/themes/minimalist" }
		]
	}
];
