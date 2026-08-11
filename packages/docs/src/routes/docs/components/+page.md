# Components

155 standalone components — copy into your project with the CLI.

```bash
npx @vultra/cli add <component-name>
```

The CLI resolves transitive dependencies automatically and supports core, MD3, and Flat components.

## Quick Start

```bash
npx @vultra/cli add button card dialog input        # Core
npx @vultra/cli add fab chip snackbar                # MD3
npx @vultra/cli add blob-card hexagon-grid           # Flat
```

## Actions

| Component | Description | Install |
|-----------|-------------|---------|
| [button](/docs/components/button) |  | `npx @vultra/cli add button` |
| [FAB](/docs/components/md3-fab) | Floating Action Button — Material Design 3 component for primary actions. | `npx @vultra/cli add fab` (from @vultra/md3) |

## Layout

| Component | Description | Install |
|-----------|-------------|---------|
| [aside](/docs/components/aside) | Semantic aside element for sidebar or tangential content. | `npx @vultra/cli add aside` |
| [aspect-ratio](/docs/components/aspect-ratio) | Container that maintains a specific aspect ratio. | `npx @vultra/cli add aspect-ratio` |
| [box](/docs/components/box) | Generic layout container that renders as any element with token-based padding. | `npx @vultra/cli add box` |
| [card](/docs/components/card) |  | `npx @vultra/cli add card` |
| [details](/docs/components/details) | Collapsible details/summary element. | `npx @vultra/cli add details` |
| [divider](/docs/components/divider) | Visual divider or separator between content sections. | `npx @vultra/cli add divider` |
| [figure](/docs/components/figure) | Figure element with an optional caption. | `npx @vultra/cli add figure` |
| [flex](/docs/components/flex) | Flexbox layout container with direction, alignment, justification, gap, and wrap props. | `npx @vultra/cli add flex` |
| [grid](/docs/components/grid) | Responsive CSS grid container with responsive column overrides and token gaps. | `npx @vultra/cli add grid` |
| [resizable](/docs/components/resizable) | Resizable panels with drag handles. | `npx @vultra/cli add resizable` |
| [scroll-area](/docs/components/scroll-area) | Custom-styled scrollbar container. | `npx @vultra/cli add scroll-area` |
| [section](/docs/components/section) | Semantic section element for grouping content. | `npx @vultra/cli add section` |
| [separator](/docs/components/separator) |  | `npx @vultra/cli add separator` |
| [stack](/docs/components/stack) | Vertical flex container with token gaps and an optional divider between children. | `npx @vultra/cli add stack` |

## Navigation

| Component | Description | Install |
|-----------|-------------|---------|
| [accordion](/docs/components/accordion) |  | `npx @vultra/cli add accordion` |
| [breadcrumb](/docs/components/breadcrumb) |  | `npx @vultra/cli add breadcrumb` |
| [drawer](/docs/components/drawer) |  | `npx @vultra/cli add drawer` |
| [dropdown-menu](/docs/components/dropdown-menu) |  | `npx @vultra/cli add dropdown-menu` |
| [menubar](/docs/components/menubar) | Application menu bar with dropdown menus. | `npx @vultra/cli add menubar` |
| [navigation-menu](/docs/components/navigation-menu) |  | `npx @vultra/cli add navigation-menu` |
| [NavigationBar](/docs/components/md3-navigation-bar) | Material Design 3 bottom navigation bar for mobile layouts. | `npx @vultra/cli add navigation-bar` (from @vultra/md3) |
| [NavigationRail](/docs/components/md3-navigation-rail) | Material Design 3 vertical navigation for tablet and desktop layouts. | `npx @vultra/cli add navigation-rail` (from @vultra/md3) |
| [pagination](/docs/components/pagination) |  | `npx @vultra/cli add pagination` |
| [sidebar](/docs/components/sidebar) |  | `npx @vultra/cli add sidebar` |
| [slidemenu](/docs/components/slidemenu) | Edge drawer that slides in from the left or right with overlay, focus trap, and Escape-to-close. | `npx @vultra/cli add slidemenu` |
| [tabbar](/docs/components/tabbar) | Fixed bottom tab bar for mobile apps with icons, badges, blur, and safe-area insets. | `npx @vultra/cli add tabbar` |
| [tabs](/docs/components/tabs) |  | `npx @vultra/cli add tabs` |
| [TopAppBar](/docs/components/md3-top-app-bar) | Material Design 3 app bars in small, center, medium, and large sizes with scroll collapse. | `npx @vultra/cli add top-app-bar` (from @vultra/md3) |

## Forms

| Component | Description | Install |
|-----------|-------------|---------|
| [checkbox](/docs/components/checkbox) |  | `npx @vultra/cli add checkbox` |
| [Chip](/docs/components/md3-chip) | Material Design 3 chips for filtering, actions, and suggestions. | `npx @vultra/cli add chip` (from @vultra/md3) |
| [color-picker](/docs/components/color-picker) | Color picker input with preview and input modes. | `npx @vultra/cli add color-picker` |
| [combobox](/docs/components/combobox) | Searchable select with autocomplete | `npx @vultra/cli add combobox` |
| [date-picker](/docs/components/date-picker) |  | `npx @vultra/cli add date-picker` |
| [datetime-picker](/docs/components/datetime-picker) | Date and time picker with calendar and time selection. | `npx @vultra/cli add datetime-picker` |
| [editable-label](/docs/components/editable-label) | Inline text that becomes an input on click, rendered as any heading or span. | `npx @vultra/cli add editable-label` |
| [form](/docs/components/form) |  | `npx @vultra/cli add form` |
| [input](/docs/components/input) |  | `npx @vultra/cli add input` |
| [input-group](/docs/components/input-group) | Input field with leading/trailing addons. | `npx @vultra/cli add input-group` |
| [label](/docs/components/label) |  | `npx @vultra/cli add label` |
| [number-input](/docs/components/number-input) | Numeric input with increment/decrement buttons. | `npx @vultra/cli add number-input` |
| [otp-input](/docs/components/otp-input) | One-time password verification code input. | `npx @vultra/cli add otp-input` |
| [password-input](/docs/components/password-input) | Password input with show/hide toggle. | `npx @vultra/cli add password-input` |
| [Radio](/docs/components/md3-radio) | Material Design 3 radio buttons and radio groups for single-choice selection. | `npx @vultra/cli add radio` (from @vultra/md3) |
| [radio-group](/docs/components/radio-group) |  | `npx @vultra/cli add radio-group` |
| [rating](/docs/components/rating) | Star rating with half-star and read-only modes. | `npx @vultra/cli add rating` |
| [search-select](/docs/components/search-select) | Autocomplete with server-side search | `npx @vultra/cli add search-select` |
| [SearchBar](/docs/components/md3-search-bar) | Material Design 3 search input with leading icon, clear button, and full-pill styling. | `npx @vultra/cli add search-bar` (from @vultra/md3) |
| [SegmentedButton](/docs/components/md3-segmented-button) | Material Design 3 segmented buttons for single or multi selection. | `npx @vultra/cli add segmented-button` (from @vultra/md3) |
| [segmentedcontrol](/docs/components/segmentedcontrol) | Pill-style tab switcher with a sliding indicator and bindable value. | `npx @vultra/cli add segmentedcontrol` |
| [select](/docs/components/select) |  | `npx @vultra/cli add select` |
| [slider](/docs/components/slider) |  | `npx @vultra/cli add slider` |
| [switch](/docs/components/switch) |  | `npx @vultra/cli add switch` |
| [Switch](/docs/components/md3-switch) |  | `npx @vultra/cli add switch` (from @vultra/md3) |
| [textarea](/docs/components/textarea) |  | `npx @vultra/cli add textarea` |
| [TextField](/docs/components/md3-text-field) | Material Design 3 text fields with floating labels, helper text, and error states. | `npx @vultra/cli add text-field` (from @vultra/md3) |
| [TimePicker](/docs/components/md3-time-picker) | Material Design 3 time picker with analog clock and keyboard input modes. | `npx @vultra/cli add time-picker` (from @vultra/md3) |
| [toggle](/docs/components/toggle) |  | `npx @vultra/cli add toggle` |
| [toggle-group](/docs/components/toggle-group) |  | `npx @vultra/cli add toggle-group` |

## Feedback

| Component | Description | Install |
|-----------|-------------|---------|
| [alert](/docs/components/alert) |  | `npx @vultra/cli add alert` |
| [alert-dialog](/docs/components/alert-dialog) |  | `npx @vultra/cli add alert-dialog` |
| [BottomSheet](/docs/components/md3-bottom-sheet) | Material Design 3 modal panel that slides up from the bottom of the screen. | `npx @vultra/cli add bottom-sheet` (from @vultra/md3) |
| [dialog](/docs/components/dialog) |  | `npx @vultra/cli add dialog` |
| [live-badge](/docs/components/live-badge) | Pulsing LIVE badge with an optional viewer count. | `npx @vultra/cli add live-badge` |
| [mobile-toast](/docs/components/mobile-toast) | Lightweight toast for mobile UIs with variants, duration, position, and an optional action. | `npx @vultra/cli add mobile-toast` |
| [notification](/docs/components/notification) | Button that requests notification permission and shows a Web Notification, with a demo fallback. | `npx @vultra/cli add notification` |
| [popover](/docs/components/popover) |  | `npx @vultra/cli add popover` |
| [Ripple](/docs/components/md3-ripple) | Material Design 3 CSS-only touch ripple overlay effect. | `npx @vultra/cli add ripple` (from @vultra/md3) |
| [sheet](/docs/components/sheet) |  | `npx @vultra/cli add sheet` |
| [Snackbar](/docs/components/md3-snackbar) | Material Design 3 transient notification message with optional action. | `npx @vultra/cli add snackbar` (from @vultra/md3) |
| [status-indicator](/docs/components/status-indicator) | Presence dot with online, offline, away, busy, and custom states, in three sizes. | `npx @vultra/cli add status-indicator` |
| [toast](/docs/components/toast) |  | `npx @vultra/cli add toast` |
| [tooltip](/docs/components/tooltip) |  | `npx @vultra/cli add tooltip` |

## Data Display

| Component | Description | Install |
|-----------|-------------|---------|
| [avatar](/docs/components/avatar) |  | `npx @vultra/cli add avatar` |
| [avatar-group](/docs/components/avatar-group) | Stack multiple avatars in an overlapping layout. | `npx @vultra/cli add avatar-group` |
| [avatarstack](/docs/components/avatarstack) | Overlapping row of avatars that collapses extras into a +N badge. | `npx @vultra/cli add avatarstack` |
| [badge](/docs/components/badge) |  | `npx @vultra/cli add badge` |
| [Badge](/docs/components/md3-badge) |  | `npx @vultra/cli add badge` (from @vultra/md3) |
| [barcode](/docs/components/barcode) |  | `npx @vultra/cli add barcode` |
| [calendar](/docs/components/calendar) |  | `npx @vultra/cli add calendar` |
| [charts](/docs/components/charts) |  | `npx @vultra/cli add charts` |
| [clipboard](/docs/components/clipboard) | Button that copies text to the clipboard with success feedback and legacy fallback. | `npx @vultra/cli add clipboard` |
| [code-block](/docs/components/code-block) | Code display with syntax highlighting and copy button. | `npx @vultra/cli add code-block` |
| [data-table](/docs/components/data-table) | Data table with sorting and pagination | `npx @vultra/cli add data-table` |
| [heatmap](/docs/components/heatmap) | GitHub-style intensity heatmap with interpolated color scale and axis labels. | `npx @vultra/cli add heatmap` |
| [markdown-renderer](/docs/components/markdown-renderer) | Render Markdown content as HTML. | `npx @vultra/cli add markdown-renderer` |
| [progress](/docs/components/progress) |  | `npx @vultra/cli add progress` |
| [progress-steps](/docs/components/progress-steps) | Stepped progress indicator with completed, current, and upcoming states and backward navigation. | `npx @vultra/cli add progress-steps` |
| [ProgressIndicator](/docs/components/md3-progress-indicator) | Material Design 3 linear and circular progress indicators with determinate and indeterminate states. | `npx @vultra/cli add progress-indicator` (from @vultra/md3) |
| [qr-code](/docs/components/qr-code) |  | `npx @vultra/cli add qr-code` |
| [stat-card](/docs/components/stat-card) | Card displaying a single metric with label and trend. | `npx @vultra/cli add stat-card` |
| [stats-counter](/docs/components/stats-counter) | Animated number counter for metrics. | `npx @vultra/cli add stats-counter` |
| [table](/docs/components/table) |  | `npx @vultra/cli add table` |
| [timeline](/docs/components/timeline) |  | `npx @vultra/cli add timeline` |
| [tree-view](/docs/components/tree-view) |  | `npx @vultra/cli add tree-view` |
| [virtual-list](/docs/components/virtual-list) | Windowing for rendering 10K+ items smoothly | `npx @vultra/cli add virtual-list` |

## Marketing

| Component | Description | Install |
|-----------|-------------|---------|
| [cta-section](/docs/components/cta-section) |  | `npx @vultra/cli add cta-section` |
| [feature-grid](/docs/components/feature-grid) |  | `npx @vultra/cli add feature-grid` |
| [footer](/docs/components/footer) |  | `npx @vultra/cli add footer` |
| [hero](/docs/components/hero) |  | `npx @vultra/cli add hero` |
| [logo-cloud](/docs/components/logo-cloud) | Grid of partner or customer logos. | `npx @vultra/cli add logo-cloud` |
| [navbar](/docs/components/navbar) |  | `npx @vultra/cli add navbar` |
| [pricing-card](/docs/components/pricing-card) |  | `npx @vultra/cli add pricing-card` |
| [pricing-table](/docs/components/pricing-table) | Multi-tier pricing comparison table. | `npx @vultra/cli add pricing-table` |
| [section-header](/docs/components/section-header) | Section title with optional action buttons. | `npx @vultra/cli add section-header` |
| [stats](/docs/components/stats) |  | `npx @vultra/cli add stats` |
| [testimonial](/docs/components/testimonial) |  | `npx @vultra/cli add testimonial` |
| [testimonial-carousel](/docs/components/testimonial-carousel) | Rotating carousel of customer testimonials. | `npx @vultra/cli add testimonial-carousel` |

## Composite

| Component | Description | Install |
|-----------|-------------|---------|
| [bento-grid](/docs/components/bento-grid) |  | `npx @vultra/cli add bento-grid` |
| [carousel](/docs/components/carousel) |  | `npx @vultra/cli add carousel` |
| [collapsible](/docs/components/collapsible) |  | `npx @vultra/cli add collapsible` |
| [command](/docs/components/command) |  | `npx @vultra/cli add command` |
| [comment](/docs/components/comment) | Comment thread with add, like, and delete actions, author avatars, and a composer. | `npx @vultra/cli add comment` |
| [context-menu](/docs/components/context-menu) |  | `npx @vultra/cli add context-menu` |
| [empty-state](/docs/components/empty-state) | Placeholder display when no data is available. | `npx @vultra/cli add empty-state` |
| [file-uploader](/docs/components/file-uploader) | Drag-and-drop file upload area with progress. | `npx @vultra/cli add file-uploader` |
| [gallery](/docs/components/gallery) | Multi-file image picker with drag-and-drop, live previews, and file-limit enforcement. | `npx @vultra/cli add gallery` |
| [hover-card](/docs/components/hover-card) |  | `npx @vultra/cli add hover-card` |
| [kanban](/docs/components/kanban) |  | `npx @vultra/cli add kanban` |
| [mention](/docs/components/mention) |  | `npx @vultra/cli add mention` |
| [reaction-bar](/docs/components/reaction-bar) | Emoji reaction pills with counts, selection state, and optional deselect. | `npx @vultra/cli add reaction-bar` |
| [signature-pad](/docs/components/signature-pad) | Canvas-based signature capture input. | `npx @vultra/cli add signature-pad` |
| [split-view](/docs/components/split-view) |  | `npx @vultra/cli add split-view` |
| [stepper](/docs/components/stepper) | Step-by-step wizard with progress indicator. | `npx @vultra/cli add stepper` |
| [user-profile-card](/docs/components/user-profile-card) | Rich profile card with cover, avatar, role, bio, stats row, social links, and a contact button. | `npx @vultra/cli add user-profile-card` |

## Mobile

| Component | Description | Install |
|-----------|-------------|---------|
| [actionsheet](/docs/components/actionsheet) | A modal bottom sheet listing contextual actions, styled for mobile with destructive variants and focus trapping. | `npx @vultra/cli add actionsheet` |
| [camera](/docs/components/camera) | Camera capture component using getUserMedia with facing mode, capture, and file-input fallback. | `npx @vultra/cli add camera` |
| [fabmenu](/docs/components/fabmenu) | Floating action button speed dial that expands a stack of actions. | `npx @vultra/cli add fabmenu` |
| [gyroscope](/docs/components/gyroscope) | Device orientation sensor with permission handling, sensitivity, and a mouse-simulation fallback for desktop. | `npx @vultra/cli add gyroscope` |
| [infinite-scroll](/docs/components/infinite-scroll) |  | `npx @vultra/cli add infinite-scroll` |
| [listview](/docs/components/listview) | Mobile settings-style list with grouped items, leading/trailing content, and chevron navigation. | `npx @vultra/cli add listview` |
| [pulltorefresh](/docs/components/pulltorefresh) | Touch and pointer pull-to-refresh wrapper with an 80px threshold and async refresh callback. | `npx @vultra/cli add pulltorefresh` |
| [swipeableitem](/docs/components/swipeableitem) | List row that swipes to reveal actions with rubber-band physics and axis detection. | `npx @vultra/cli add swipeableitem` |

## Flat & Geometric

| Component | Description | Install |
|-----------|-------------|---------|
| [ArrowCard](/docs/components/flat-arrow-card) | Arrow-pointed flat card with direction variants. | `npx @vultra/cli add arrow-card` (from @vultra/flat) |
| [BlobCard](/docs/components/flat-blob-card) | Organic-shaped flat card with a SVG blob clip-path and bold colors. | `npx @vultra/cli add blob-card` (from @vultra/flat) |
| [CircleAvatar](/docs/components/flat-circle-avatar) | Flat avatar with a thick colored ring, image or initials. | `npx @vultra/cli add circle-avatar` (from @vultra/flat) |
| [CircleGrid](/docs/components/flat-circle-grid) | Row of flat colored circles for decoration and patterns. | `npx @vultra/cli add circle-grid` (from @vultra/flat) |
| [CrossBadge](/docs/components/flat-cross-badge) | Plus-shaped flat badge with bold colors and three sizes. | `npx @vultra/cli add cross-badge` (from @vultra/flat) |
| [DiamondBadge](/docs/components/flat-diamond-badge) | Diamond-shaped flat label with bold colors and three sizes. | `npx @vultra/cli add diamond-badge` (from @vultra/flat) |
| [EllipseBadge](/docs/components/flat-ellipse-badge) | Pill-shaped flat badge with bold colors and three sizes. | `npx @vultra/cli add ellipse-badge` (from @vultra/flat) |
| [HexagonGrid](/docs/components/flat-hexagon-grid) | Honeycomb-style layout container that clips its children into hexagons. | `npx @vultra/cli add hexagon-grid` (from @vultra/flat) |
| [OctagonCard](/docs/components/flat-octagon-card) | Octagon-shaped flat card with title, description, and content. | `npx @vultra/cli add octagon-card` (from @vultra/flat) |
| [ParallelogramCard](/docs/components/flat-parallelogram-card) | Slanted parallelogram flat card with title and content. | `npx @vultra/cli add parallelogram-card` (from @vultra/flat) |
| [PentagonStat](/docs/components/flat-pentagon-stat) | Pentagon-shaped flat metric display with value and label. | `npx @vultra/cli add pentagon-stat` (from @vultra/flat) |
| [StarCard](/docs/components/flat-star-card) | Star-shaped flat highlight card with title and value. | `npx @vultra/cli add star-card` (from @vultra/flat) |
| [TrapezoidCard](/docs/components/flat-trapezoid-card) | Trapezoid-shaped flat card with a tilted top edge. | `npx @vultra/cli add trapezoid-card` (from @vultra/flat) |
| [TriangleAlert](/docs/components/flat-triangle-alert) | Triangle-shaped flat warning banner with optional dismiss button. | `npx @vultra/cli add triangle-alert` (from @vultra/flat) |
| [WaveSection](/docs/components/flat-wave-section) | Flat section with a wavy SVG top or bottom divider. | `npx @vultra/cli add wave-section` (from @vultra/flat) |
| [ZigzagDivider](/docs/components/flat-zigzag-divider) | Flat zigzag SVG divider between sections. | `npx @vultra/cli add zigzag-divider` (from @vultra/flat) |

## Utility

| Component | Description | Install |
|-----------|-------------|---------|
| [copy-to-clipboard](/docs/components/copy-to-clipboard) | Button that copies text to the clipboard with feedback. | `npx @vultra/cli add copy-to-clipboard` |
| [emoji](/docs/components/emoji) | Emoji picker with search and categories. | `npx @vultra/cli add emoji` |
| [main](/docs/components/main) | Semantic main element for primary page content. | `npx @vultra/cli add main` |
| [skeleton](/docs/components/skeleton) |  | `npx @vultra/cli add skeleton` |
| [validate](/docs/components/validate) | Client-side form validation with custom validators and Zod | `npx @vultra/cli add validate` |

## Package Sources

| Package | Components | Install |
|---------|-----------|---------|
| [@vultra/ui](https://www.npmjs.com/package/@vultra/ui) | Core (123) | `npm install @vultra/ui` |
| [@vultra/md3](https://www.npmjs.com/package/@vultra/md3) | MD3 (16) | `npm install @vultra/md3` |
| [@vultra/flat](https://www.npmjs.com/package/@vultra/flat) | Flat geometric (16) | `npm install @vultra/flat` |

## Playground

Try components live with adjustable props in the [Playground](/playground).

## Related

- [Themes](/docs/themes) — 9 design directions
- [Guides](/docs/guides/theming) — advanced theming
- [Examples](/examples) — real-world patterns
