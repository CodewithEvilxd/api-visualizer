import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { CommandPalette } from "@/components/command-palette";
import { NavbarMobile } from "@/components/navbar-mobile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Github, Twitter, Mail, MessageSquare } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "API Visualizer",
    description: "Understand APIs Like Never Before.",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-zinc-900 dark:to-black`}> 
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider delayDuration={200}>
          <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
            <nav className="px-6 h-16 flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <Link href="/" className="font-semibold tracking-tight">API Visualizer</Link>
                <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
                  <Link href="/tool">Tool</Link>
                  <Link href="/tester">Tester</Link>
                  <Link href="/docs">Docs</Link>
                  <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <NavbarMobile />
                <ThemeToggle />
              </div>
            </nav>
          </header>
          {children}
          <CommandPalette />
          <footer className="mt-16">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="px-6 py-12 w-full">
              <div className="grid gap-10 md:grid-cols-3">
                <div>
                  <div className="text-lg font-semibold">API Visualizer</div>
                  <p className="mt-2 text-sm text-muted-foreground max-w-xs">Smart, fast, and beautiful API response visualizer for developers.</p>
                  <div className="mt-4 flex items-center gap-3">
                    <Tooltip><TooltipTrigger asChild><a aria-label="GitHub" href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-xl border hover:bg-foreground/5 transition-colors"><Github className="h-4 w-4" /></a></TooltipTrigger><TooltipContent>GitHub</TooltipContent></Tooltip>
                    <Tooltip><TooltipTrigger asChild><a aria-label="Twitter / X" href="https://x.com" target="_blank" rel="noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-xl border hover:bg-foreground/5 transition-colors"><Twitter className="h-4 w-4" /></a></TooltipTrigger><TooltipContent>Twitter / X</TooltipContent></Tooltip>
                    <Tooltip><TooltipTrigger asChild><a aria-label="Discord" href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-xl border hover:bg-foreground/5 transition-colors"><MessageSquare className="h-4 w-4" /></a></TooltipTrigger><TooltipContent>Discord</TooltipContent></Tooltip>
                    <Tooltip><TooltipTrigger asChild><a aria-label="Email" href="mailto:codeiwthevilxd@gnail" className="inline-flex h-9 w-9 items-center justify-center rounded-xl border hover:bg-foreground/5 transition-colors"><Mail className="h-4 w-4" /></a></TooltipTrigger><TooltipContent>Email</TooltipContent></Tooltip>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-sm">
                    <div className="font-medium mb-3">Product</div>
                    <ul className="space-y-2 text-muted-foreground">
                      <li><a className="hover:text-foreground" href="/tool">Tool</a></li>
                      <li><a className="hover:text-foreground" href="/docs">Docs</a></li>
                      <li><a className="hover:text-foreground" href="/changelog">Changelog</a></li>
                    </ul>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium mb-3">Company</div>
                    <ul className="space-y-2 text-muted-foreground">
                      <li><a className="hover:text-foreground" href="/about">About</a></li>
                      <li><a className="hover:text-foreground" href="/contact">Contact</a></li>
                      <li><a className="hover:text-foreground" href="/privacy">Privacy</a></li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Subscribe to updates</div>
                  <p className="mt-2 text-sm text-muted-foreground">Get release notes and tips. No spam.</p>
                  <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <Input type="email" placeholder="you@devmail.com" className="rounded-xl" />
                    <Button type="button" className="rounded-xl w-full sm:w-auto">Subscribe</Button>
                  </div>
                </div>
              </div>
              <Separator className="my-8" />
              <div className="flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground gap-4 w-full">
                <p>© 2025 API Visualizer. All rights reserved.</p>
                <div className="flex items-center gap-4">
                  <a className="hover:text-foreground" href="/terms">Terms</a>
                  <a className="hover:text-foreground" href="/privacy">Privacy</a>
                  <a className="hover:text-foreground" href="/cookies">Cookies</a>
                </div>
              </div>
            </div>
          </footer>
          <Toaster richColors position="top-right" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
