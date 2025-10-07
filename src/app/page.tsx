"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Braces, Save } from "lucide-react";
import { AuroraBackground } from "@/components/aurora";
 

export default function Home() {
  return (
    <main className="relative w-full px-6 py-20">
      <AuroraBackground />
      <section className="relative rounded-[24px] overflow-hidden p-10 md:p-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500"
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
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/tool">
            <Button size="lg" className="rounded-2xl w-full sm:w-auto">Try Tool</Button>
          </Link>
          <Link href="/tester">
            <Button size="lg" variant="secondary" className="rounded-2xl w-full sm:w-auto">Try Tester</Button>
          </Link>
          <Link href="/docs">
            <Button size="lg" variant="outline" className="rounded-2xl w-full sm:w-auto">Learn More</Button>
          </Link>
        </motion.div>
        <div className="absolute -inset-24 -z-10 blur-3xl bg-gradient-to-tr from-indigo-500/20 to-violet-500/20" />
      </section>

      <section className="mt-16 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
        <Card className="rounded-2xl border-transparent bg-background/60 shadow-[0_0_1px_1px_hsl(var(--border))]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Braces className="h-5 w-5" /> Format & Beautify JSON</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">Pretty-print with color-coded keys and values.</CardContent>
        </Card>
        </motion.div>
        <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
        <Card className="rounded-2xl border-transparent bg-background/60 shadow-[0_0_1px_1px_hsl(var(--border))]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5" /> Inspect Nested Data</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">Expandable tree view to explore deeply nested responses.</CardContent>
        </Card>
        </motion.div>
        <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
        <Card className="rounded-2xl border-transparent bg-background/60 shadow-[0_0_1px_1px_hsl(var(--border))]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Save className="h-5 w-5" /> Export & Share Responses</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">Copy, download, and share formatted payloads.</CardContent>
        </Card>
        </motion.div>
      </section>

      <section className="mt-16 grid sm:grid-cols-2 gap-6">
        <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
        <Card className="rounded-2xl border-transparent bg-background/60 shadow-[0_0_1px_1px_hsl(var(--border))]">
          <CardHeader>
            <CardTitle>Visualizer Tool</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Paste API responses (JSON/XML/Raw), beautify them, explore via Tree/Pretty/Raw views, copy/download, and get instant keyboard shortcuts. Perfect for quickly understanding payloads.
            <div className="mt-4">
              <Link href="/tool"><Button className="rounded-2xl">Open Tool</Button></Link>
            </div>
          </CardContent>
        </Card>
        </motion.div>
        <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
        <Card className="rounded-2xl border-transparent bg-background/60 shadow-[0_0_1px_1px_hsl(var(--border))]">
          <CardHeader>
            <CardTitle>API Tester</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Build requests like a mini‑Postman: choose method, set URL, headers, and body. Send and inspect status/time/size and a pretty response. Use “Explain with AI” for quick summaries.
            <div className="mt-4">
              <Link href="/tester"><Button variant="secondary" className="rounded-2xl">Open Tester</Button></Link>
    </div>
          </CardContent>
        </Card>
        </motion.div>
      </section>

      
    </main>
  );
}
