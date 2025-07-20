import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "../components/ConvexClientProvider";

export const metadata: Metadata = {
  title: "Minerva - Personal Productivity",
  description: "Task management, note storage, and AI integration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
