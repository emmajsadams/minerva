# Minerva

Personal productivity software with task management, note storage, and AI integration.

## Design Philosophy

Minerva embraces a **90s cyberpunk aesthetic** inspired by iconic works like Ghost in the Shell, Serial Experiments Lain, and The Matrix. The interface evokes the digital landscapes of early internet culture with:

- **Dark, terminal-inspired themes** with deep blacks and muted grays
- **Neon accent colors** - bright greens, electric blues, and cyan highlights
- **Monospace typography** for that authentic code/terminal feel
- **Glowing effects and subtle animations** reminiscent of CRT monitors
- **Grid patterns and scan lines** as subtle background textures
- **Minimalist yet futuristic UI elements** that feel both retro and timeless

The goal is to create a productivity environment that feels like navigating the digital realm itself - functional, focused, and aesthetically striking.

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
