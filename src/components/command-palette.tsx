"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isMod = navigator.platform.includes("Mac") ? e.metaKey : e.ctrlKey;
      if (isMod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search actions..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => { router.push("/"); setOpen(false); }}>Home</CommandItem>
          <CommandItem onSelect={() => { router.push("/tool"); setOpen(false); }}>Tool</CommandItem>
          <CommandItem onSelect={() => { router.push("/docs"); setOpen(false); }}>Docs</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setOpen(false); }}>Scroll to top</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}


