import { Footer, Navbar } from "@/components";
import { cn } from "@/styles/cn";
import { fonts } from "@/styles/font";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: {
    default: "AI Chat Starter",
    template: "%s | AI Chat Starter",
  },
  description: "AI Chat Starter",
};

interface RootLayoutProps {
  children: Readonly<React.ReactNode>;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          fonts.sans.variable,
          fonts.mono.variable,
          fonts.serif.variable,
          "antialiased",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar
              title="AI Chat Starter"
              homeLink="/"
              links={[{ href: "/", label: "Home" }]}
              logoPath="/logo.png"
            />
            <main className="flex-1">{children}</main>
            <Footer
              copyright="AI Chat Starter"
              author="AGIManifesto"
              authorLink="https://github.com/AGIManifesto"
              year={new Date().getFullYear()}
              country="🇨🇦"
            />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
