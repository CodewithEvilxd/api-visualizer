"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function AIPanel({ payload, format }: { payload: string; format: "json" | "xml" | "raw" }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function analyze(q?: string) {
    try {
      setLoading(true);
      setAnswer("");
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: payload, format, question: q ?? question })
      });
      const data = await res.json();
      if (data.text) setAnswer(data.text);
      else setAnswer(`Error: ${data.error ?? "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="rounded-2xl">
      <CardContent className="pt-6">
        <div className="text-sm font-medium">AI Assistant</div>
        <p className="text-xs text-muted-foreground">Get a quick explanation and chat about this API response.</p>
        <div className="mt-3 flex gap-2">
          <Button size="sm" onClick={() => analyze("") } disabled={loading}>Analyze</Button>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-2">
          <Textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask a question about this response..." className="min-h-[90px] rounded-2xl" />
          <Button onClick={() => analyze()} disabled={loading}>Ask</Button>
        </div>
        {answer && (
          <div className="mt-4 rounded-xl border p-3 text-sm whitespace-pre-wrap">{answer}</div>
        )}
      </CardContent>
    </Card>
  );
}


