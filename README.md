# Minerva

Personal productivity software with task management, note storage, and AI integration.

## Design Philosophy

Minerva draws inspiration from **Persona 3 Reload's acclaimed UI design**, embracing the game's sophisticated aquatic-themed aesthetic that symbolizes diving deep into one's psychological state and relationships. The interface captures the essence of the "Sea of Souls" with:

- **Oceanic color palette** - Deep blues (#001736, #00183e), bright aqua (#79d7fd, #00bbfa), and golden accents (#ffc54a)
- **Underwater visual effects** - Shimmering gradients, glass-like reflections, and flowing animations
- **Elegant glass morphism** - Translucent panels with subtle reflections and depth
- **Sophisticated typography** - Clean, modern fonts that balance readability with style
- **Fluid animations** - Smooth transitions that evoke the feeling of moving through water
- **Symbolic depth** - UI elements that reflect introspection and personal growth themes

The design philosophy centers on creating a productivity environment that feels like navigating one's inner consciousness - serene yet purposeful, with each interaction feeling meaningful and reflective. Like the protagonist diving into their Sea of Souls, users immerse themselves in a beautifully crafted digital space for personal development and task management.

### Persona 3 Design System Documentation

Based on detailed analysis of Persona 3 Reload's interface design, our UI system follows these core principles:

#### Color System & Visual Hierarchy

**Primary Palette:**
- `#00BBFA` - Electric blue for primary actions, highlights, and interactive elements
- `#79D7FD` - Secondary light blue for accents, triangular elements, and secondary actions
- `#001736` - Deep navy blue for backgrounds and containers
- `#00183E` - Slightly lighter navy for elevated surfaces and panels

**Usage Patterns:**
- Electric blue (#00BBFA) creates strong visual hierarchy for critical UI elements
- Light blue (#79D7FD) provides subtle contrast without competing with primary elements
- Deep navy backgrounds create depth and establish the underwater atmosphere
- High contrast ratios ensure accessibility while maintaining the aesthetic

#### Typography & Information Design

**Hierarchy Principles:**
- **Primary headers** use electric blue (#00BBFA) for maximum visibility
- **Secondary text** employs light blue (#79D7FD) for supporting information
- **Body text** uses high-contrast white/light colors against dark backgrounds
- **Small labels** maintain readability with careful contrast management

**Text Treatment:**
- Clean, sans-serif fonts prioritize readability in aquatic-themed environments
- Generous letter spacing enhances legibility on dark backgrounds
- Strategic use of font weights creates clear information hierarchy
- Consistent text sizing maintains visual harmony across components

#### Layout Patterns & Spatial Design

**Container Architecture:**
- **Rounded rectangles** (12-16px border radius) establish consistent component boundaries
- **Generous padding** (24-32px) creates breathing room and premium feel
- **Layered shadows** with 1-2px offsets and rotation add dimensional depth
- **Angled shadow boxes** rotated 1-2 degrees create dynamic visual interest

**Spacing System:**
- **8px base unit** for consistent spacing relationships
- **24px gaps** between major sections maintain visual hierarchy
- **16px internal padding** for comfortable content spacing
- **48px margins** around primary containers establish focus areas

#### Interactive Elements & Component Design

**Button & Input Patterns:**
- **Transparent borders** by default, revealing colored borders on hover/focus
- **Subtle background tints** using primary colors at 10-20% opacity
- **Smooth transitions** (300ms duration) for all interactive state changes
- **Glass morphism effects** with backdrop blur and border highlights

**Component Construction:**
- **Triangular accent elements** using CSS borders for geometric visual interest
- **Floating header badges** positioned absolutely with bright blue backgrounds
- **Layered depth** through multiple shadow levels and strategic z-indexing
- **Responsive scaling** maintaining proportions across different screen sizes

#### Animation & Transition Philosophy

**Motion Design:**
- **Entrance animations** fade and scale elements with ease-out timing
- **Hover states** provide immediate feedback through subtle color and shadow changes
- **Loading states** maintain user engagement with smooth, purposeful animations
- **Page transitions** evoke underwater movement with flowing, organic timing

**Performance Considerations:**
- Hardware-accelerated transforms for smooth 60fps animations
- Minimal layout thrashing through transform-only animations
- Strategic use of will-change for performance optimization
- Reduced motion preferences respected for accessibility

#### Accessibility & Usability Standards

**Contrast & Readability:**
- Minimum 4.5:1 contrast ratios for all text elements
- Color is never the sole indicator of meaning or state
- Focus indicators clearly visible with high-contrast outlines
- Text remains legible at 200% zoom levels

**Interaction Design:**
- Minimum 44px touch targets for mobile accessibility
- Clear hover and focus states for keyboard navigation
- Consistent interaction patterns across all components
- Error states and validation feedback provide clear guidance

This design system creates a cohesive, accessible, and aesthetically striking interface that honors Persona 3's visual legacy while serving modern productivity needs.

## Tech Stack

**Frontend**

- React - UI library
- Tailwind CSS / Shadcn - Styling and component library
- React Router - Client-side routing

**Backend**

- Next.js - Full-stack framework
- TypeScript - Programming language
- Convex - Real-time data management and authentication
- Vercel AI SDK - AI service integration

**Development & Deployment**

- Bun - Package manager, runtime, and test runner
- Proto - Tool version management (see .prototools)
- GitHub - Version control and CI/CD
- Vercel - Hosting platform

## Features (Planned)

### Task Management

- **Task Table View**: Display tasks in a sortable/filterable table format
- **Task Fields**:
  - Name (required)
  - Status (e.g., Todo, In Progress, Done)
  - Priority (e.g., Low, Medium, High)
  - Due Date (optional)
- **Task Details Modal**: Click any task to open editing modal with:
  - Field editing for name, status, priority, due date
  - Markdown details section using Tiptap editor
- **Tiptap Integration**: Rich markdown editor for task descriptions and notes

### Additional Features

- Note storage and organization
- AI service integrations
- Real-time data synchronization

## Development

### Prerequisites

- [Proto](https://moonrepo.dev/proto) for tool version management
- Run `proto install` to install required tools (Bun, etc.)

### Setup

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Start Convex backend (requires login)
bun run convex

# Build for production
bun run build
```

This project uses Bun as the JavaScript runtime and package manager.
