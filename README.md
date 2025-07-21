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

#### Icon Design Language & Visual Symbols

**Persona 3 Reload Icon Aesthetic Research:**

Based on extensive research into Persona 3 Reload's UI design philosophy, the game's icon system follows these key principles:

**Core Design Philosophy:**

- Icons embody the "Sea of Souls" concept - representing depth, introspection, and psychological navigation
- Visual elements evoke underwater imagery with flowing, organic shapes
- Emphasis on elegance and sophistication over aggressive or sharp design elements
- Icons feel "ephemeral" and contemplative, matching the game's themes of mortality and self-discovery

**Visual Characteristics:**

- **Organic curves** instead of sharp geometric shapes - icons flow like water currents
- **Translucent layers** with subtle opacity variations creating depth
- **Subtle gradients** from deep blue to aqua, mimicking underwater lighting
- **Minimal line weights** with elegant, refined strokes
- **Glass-like reflections** and shimmer effects on interactive elements
- **Rounded corners** and soft edges throughout all icon designs

**Color Application in Icons:**

- Primary electric blue (#00BBFA) for active/primary action icons
- Light aqua (#79D7FD) for secondary or supportive action icons
- Deep navy (#001736) for background elements and containers
- Subtle white highlights for glass-like reflection effects
- Golden accents (#ffc54a) sparingly used for important status indicators

**Icon Animation Principles:**

- **Gentle floating motions** - icons subtly move as if suspended in water
- **Fade transitions** rather than sharp appearing/disappearing
- **Scale transformations** with ease-out timing for organic feel
- **Shimmer effects** on hover states to suggest underwater light play
- **Cascading animations** where multiple icons animate in sequence like bubbles rising

**Symbolic Elements:**

- **Water droplets** and **bubble motifs** for ephemeral actions
- **Flowing ribbons** or **wave patterns** for navigation elements
- **Crystalline shapes** for data/information related icons
- **Organic geometric patterns** that suggest psychological depth
- **Layered transparency** to represent different levels of consciousness

**Technical Implementation:**

- SVG-based icons for crisp rendering at all sizes
- CSS animations for hover and interaction states
- Subtle drop shadows and inner shadows for dimensional depth
- Consistent stroke-width (2px) for visual harmony
- 24x24px base size with scalable vector architecture

**Icon Categories:**

- **Action icons**: Edit, Add, Delete - using flowing, organic shapes
- **Status icons**: Priority levels using gradient-filled geometric forms
- **Navigation icons**: Soft, rounded arrows and directional indicators
- **Content icons**: Document, task, note symbols with aquatic styling
- **System icons**: Settings, profile, logout using minimalist water-inspired forms

This research reveals that Persona 3 Reload's icons are fundamentally different from standard app icons - they prioritize emotional resonance and thematic consistency over conventional usability patterns, creating a cohesive underwater psychological landscape.

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
- Resend - Email service integration
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
- Email notifications and reminders

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

## Email Integration (Resend)

Minerva includes email functionality powered by Resend and Convex for sending notifications, reminders, and user communications.

### Setup

1. **Get a Resend API Key**
   - Sign up at [Resend](https://resend.com)
   - Create an API key in your dashboard
   - Add your domain for sending emails

2. **Configure Environment Variables**

   ```bash
   # Set the API key in your Convex deployment
   bunx convex env set RESEND_API_KEY your_api_key_here

   # Optional: Set your app URL for email links
   bunx convex env set NEXT_PUBLIC_APP_URL https://your-domain.com
   ```

3. **Install Dependencies** (already included)
   ```bash
   bun add @convex-dev/resend
   ```

### Available Email Functions

The email system includes several pre-built functions in `convex/emails.ts`:

#### Welcome Email

```typescript
// Send a welcome email to new users
sendWelcomeEmail({
  to: "user@example.com",
  name: "User Name",
});
```

#### Task Reminder Email

```typescript
// Send task reminders with details
sendTaskReminderEmail({
  to: "user@example.com",
  userName: "User Name",
  taskName: "Complete project",
  taskDescription: "Finish the quarterly report",
  dueDate: "2024-01-15",
  priority: "high",
});
```

#### Daily Task Summary

```typescript
// Send daily productivity summaries
sendDailyTaskSummary({
  to: "user@example.com",
  userName: "User Name",
  totalTasks: 10,
  completedTasks: 7,
  pendingTasks: 3,
  highPriorityTasks: 2,
});
```

#### Test Email

```typescript
// Send test emails for development
sendTestEmail({
  to: "test@example.com",
});
```

### Email Templates

All emails use beautiful, responsive HTML templates that match Minerva's Persona 3-inspired design:

- **Gradient headers** with the Minerva branding
- **Responsive design** that works on all devices
- **Consistent styling** with the app's aquatic theme
- **Call-to-action buttons** linking back to the app
- **Professional formatting** for task details and summaries

### Features

- **Durable email delivery** - Emails are queued and retried automatically
- **Rate limiting** - Built-in protection against spam
- **Idempotency** - Duplicate emails are prevented
- **Rich HTML templates** - Beautiful, branded email designs
- **Responsive design** - Emails look great on all devices

### Usage in Application

Email functions are internal mutations that can be called from other Convex functions or scheduled actions. They're perfect for:

- User onboarding flows
- Task deadline reminders
- Daily/weekly productivity reports
- System notifications
- Feature announcements

### Development & Testing

Use the test email function to verify your setup:

```bash
# In Convex dashboard or via API call
sendTestEmail({ to: "your-email@example.com" })
```

The email system integrates seamlessly with Convex's real-time capabilities, allowing you to send contextual emails based on user actions and task changes.
