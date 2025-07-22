/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind v4 uses CSS-first configuration by default
  // This minimal config provides tool compatibility for Shadcn/UI and IDEs

  // Content detection is handled by @source directives in global.css
  // But we provide a fallback content array for tool compatibility
  content: [
    "./src/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: ["class"],

  theme: {
    // Basic theme extensions for Shadcn/UI compatibility
    // Main theme configuration is in global.css using CSS variables
    extend: {
      fontFamily: {
        sans: [
          "Space Grotesk",
          "Inter",
          "SF Pro Display",
          "system-ui",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "Fira Code", "Consolas", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Persona 3 theme colors from global.css
        gold: "hsl(var(--gold))",
        "glass-shimmer": "hsl(var(--glass-shimmer))",
        "underwater-blue": "hsl(var(--underwater-blue))",
        "soul-glow": "hsl(var(--soul-glow))",
        "persona-red": "hsl(var(--persona-red))",
        "persona-green": "hsl(var(--persona-green))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
    },
  },

  plugins: [
    // Plugins are handled in CSS using @plugin directive in v4
    // This is for backward compatibility with tools that expect plugins here
  ],
};
