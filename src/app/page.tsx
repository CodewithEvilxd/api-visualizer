"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Braces, Save } from "lucide-react";
import { AuroraBackground } from "@/components/aurora";

export default function Home() {
  return (
    <main className="relative mx-auto max-w-6xl px-6 py-16">
      <AuroraBackground />
      <section className="relative rounded-3xl border border-border overflow-hidden bg-background/50 backdrop-blur-xl supports-[backdrop-filter]:bg-background/50 p-12 md:p-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500"
        >
          Understand APIs Like Never Before.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Smart, fast, and beautiful API response visualizer for developers.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <Link href="/tool">
            <Button size="lg" className="rounded-2xl">Try Tool</Button>
          </Link>
          <Link href="/docs">
            <Button size="lg" variant="outline" className="rounded-2xl">Learn More</Button>
          </Link>
        </motion.div>
        <div className="absolute -inset-20 -z-10 blur-3xl bg-gradient-to-tr from-indigo-500/20 to-violet-500/20" />
      </section>

      <section className="mt-16 grid md:grid-cols-3 gap-6">
        <Card className="rounded-2xl border-transparent bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-[0_0_1px_1px_hsl(var(--border))]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Braces className="h-5 w-5" /> Format & Beautify JSON</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">Pretty-print with color-coded keys and values.</CardContent>
        </Card>
        <Card className="rounded-2xl border-transparent bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-[0_0_1px_1px_hsl(var(--border))]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5" /> Inspect Nested Data</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">Expandable tree view to explore deeply nested responses.</CardContent>
        </Card>
        <Card className="rounded-2xl border-transparent bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-[0_0_1px_1px_hsl(var(--border))]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Save className="h-5 w-5" /> Export & Share Responses</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">Copy, download, and share formatted payloads.</CardContent>
        </Card>
      </section>
    </main>
  );
}
