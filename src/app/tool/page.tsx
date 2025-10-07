"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, ClipboardCopy, Sparkles, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useToolShortcuts } from "./shortcuts";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AIPanel } from "./ai-panel";
import { ApiTester } from "@/components/api-tester";

type Mode = "pretty" | "raw" | "tree";

export default function ToolPage() {
  const [activeFormat, setActiveFormat] = useState<"json" | "xml" | "raw">("json");
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("tree");
  const [status, setStatus] = useState<{ code?: number; timeMs?: number; size?: number }>({});
  const fileRef = useRef<HTMLInputElement | null>(null);

  const beautify = useCallback(() => {
    try {
      const start = performance.now();
      if (activeFormat === "json") {
        const parsed = JSON.parse(input);
        const prettified = JSON.stringify(parsed, null, 2);
        setInput(prettified);
        setStatus({ timeMs: Math.round(performance.now() - start), size: prettified.length });
        toast.success("Beautified JSON");
      } else if (activeFormat === "xml") {
        // Minimal placeholder: simply trims and adds newlines.
        const prettified = input.replace(/></g, ">\n<").trim();
        setInput(prettified);
        setStatus({ timeMs: Math.round(performance.now() - start), size: prettified.length });
        toast.success("Beautified XML");
      } else {
        setStatus({ timeMs: Math.round(performance.now() - start), size: input.length });
        toast.info("Nothing to beautify for Raw");
      }
    } catch {
      toast.error("Invalid input for selected format");
    }
  }, [activeFormat, input]);

  const copyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(input);
    toast.success("Copied to clipboard");
  }, [input]);

  const clearAll = useCallback(() => {
    setInput("");
    setStatus({});
  }, []);

  const downloadContent = useCallback(() => {
    const blob = new Blob([input], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `response.${activeFormat === "json" ? "json" : activeFormat === "xml" ? "xml" : "txt"}`;
    a.click();
    URL.revokeObjectURL(url);
  }, [input, activeFormat]);

  useToolShortcuts({ beautify, copy: copyToClipboard });

  const jsonTree = useMemo(() => {
    if (activeFormat !== "json") return null;
    try {
      const parsed = JSON.parse(input);
      return <TreeView data={parsed} />;
    } catch {
      return <p className="text-sm text-muted-foreground">Enter valid JSON to view the tree.</p>;
    }
  }, [input, activeFormat]);

  return (
    <div className="w-full px-6 py-10">
      <Tabs defaultValue="visualize" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="visualize">Visualize Response</TabsTrigger>
          <TabsTrigger value="test">Test API</TabsTrigger>
        </TabsList>
        <TabsContent value="visualize">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            <Card className="rounded-2xl">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-3">
                  <Tabs value={activeFormat} onValueChange={(v) => setActiveFormat(v as "json" | "xml" | "raw")}>
                    <TabsList>
                      <TabsTrigger value="json">JSON</TabsTrigger>
                      <TabsTrigger value="xml">XML</TabsTrigger>
                      <TabsTrigger value="raw">Raw</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <div className="flex items-center gap-2">
                    <Input type="file" ref={fileRef} onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      file.text().then((txt) => setInput(txt));
                    }} className="hidden" />
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" onClick={() => fileRef.current?.click()}>Upload</Button>
                      </TooltipTrigger>
                      <TooltipContent>Upload a response file</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste API response here..." className="min-h-[360px] rounded-2xl" />
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button onClick={beautify}><Sparkles className="h-4 w-4 mr-2" /> Beautify</Button>
                    </TooltipTrigger>
                    <TooltipContent>Ctrl/Cmd + B</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="secondary" onClick={copyToClipboard}><ClipboardCopy className="h-4 w-4 mr-2" /> Copy</Button>
                    </TooltipTrigger>
                    <TooltipContent>Ctrl/Cmd + C</TooltipContent>
                  </Tooltip>
                  <Separator orientation="vertical" className="h-8" />
                  <Button variant="outline" onClick={clearAll}><Trash2 className="h-4 w-4 mr-2" /> Clear</Button>
                  <Button variant="outline" onClick={downloadContent}><Download className="h-4 w-4 mr-2" /> Download</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl lg:col-span-1 lg:col-start-2">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
                    <TabsList>
                      <TabsTrigger value="tree">Tree</TabsTrigger>
                      <TabsTrigger value="pretty">Pretty</TabsTrigger>
                      <TabsTrigger value="raw">Raw</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <div className="text-xs text-muted-foreground">
                    {status.code ? <span className="mr-3">Status: {status.code}</span> : null}
                    {status.timeMs !== undefined ? <span className="mr-3">Time: {status.timeMs}ms</span> : null}
                    {status.size !== undefined ? <span>Size: {status.size}b</span> : null}
                  </div>
                </div>
                <ScrollArea className="rounded-xl border border-border p-3 min-h-[360px] bg-card/50 h-[420px]">
                  <div className="pr-3">
                    {mode === "raw" && (
                      <pre className="whitespace-pre-wrap text-sm">{input}</pre>
                    )}
                    {mode === "pretty" && activeFormat === "json" && (
                      <pre className="whitespace-pre text-sm overflow-auto">
                        {(() => {
                          try {
                            return JSON.stringify(JSON.parse(input), null, 2);
                          } catch {
                            return "Invalid JSON";
                          }
                        })()}
                      </pre>
                    )}
                    {mode === "pretty" && activeFormat !== "json" && (
                      <pre className="whitespace-pre-wrap text-sm">{input}</pre>
                    )}
                    {mode === "tree" && (
                      <div className="text-sm">
                        {jsonTree}
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            <div className="lg:col-span-1">
              <AIPanel payload={input} format={activeFormat} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="test">
          <ApiTester />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TreeView({ data, name }: { data: unknown; name?: string }) {
  const [open, setOpen] = useState(true);
  const isObject = typeof data === "object" && data !== null && !Array.isArray(data);
  const isArray = Array.isArray(data);

  if (!isObject && !isArray) {
    return (
      <div className="ml-4">
        <span className="text-indigo-500">{JSON.stringify(name)}:</span> <span className="text-muted-foreground">{JSON.stringify(data)}</span>
      </div>
    );
  }

  const entries = isArray ? (data as unknown[]).map((v, i) => [i, v] as const) : Object.entries(data as Record<string, unknown>);

  return (
    <div className="ml-4">
      {name !== undefined && (
        <button className="text-left text-indigo-500 hover:underline" onClick={() => setOpen((v) => !v)}>
          {open ? "▾" : "▸"} {JSON.stringify(name)} {isArray ? `[${(data as unknown[]).length}]` : ""}
        </button>
      )}
      {open && (
        <div className="border-l pl-3 mt-1">
          {entries.map(([k, v]) => (
            <TreeView key={String(k)} data={v} name={String(k)} />
          ))}
        </div>
      )}
    </div>
  );
}


