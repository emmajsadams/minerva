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

  plugins: [
    // Plugins are handled in CSS using @plugin directive in v4
    // This is for backward compatibility with tools that expect plugins here
  ],
};
