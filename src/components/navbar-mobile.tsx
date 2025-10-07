"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";

export function NavbarMobile() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-xl">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <SheetHeader>
            <SheetTitle>API Visualizer</SheetTitle>
          </SheetHeader>
          <nav className="mt-6 grid gap-3">
            <Link href="/">Home</Link>
            <Link href="/tool">Tool</Link>
            <Link href="/docs">Docs</Link>
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}


