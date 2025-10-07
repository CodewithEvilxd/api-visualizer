"use client";

import { ApiTester } from "@/components/api-tester";

export default function TesterPage() {
  return (
    <div className="w-full px-6 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">API Testing</h1>
        <p className="text-sm text-muted-foreground">Send requests, inspect responses, and get AI explanations.</p>
      </div>
      <ApiTester />
    </div>
  );
}


