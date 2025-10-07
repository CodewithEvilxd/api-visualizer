"use client";

import { useMemo, useState } from "react";

interface ApiResponse {
  status?: number;
  statusText?: string;
  timeMs?: number;
  size?: number;
  headers?: Record<string, string>;
  body?: string;
  error?: string;
}

interface CollectionAuth {
  type: string;
  data: Record<string, unknown>;
}

interface TestResult {
  name?: string;
  result?: ApiResponse;
  error?: string;
  iteration?: number;
  data?: unknown;
  response?: ApiResponse | null;
}
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ClipboardCopy, Trash2, Send, ChevronDown, Save as SaveIcon, History, Folder, Play, Settings, Code } from "lucide-react";

export function ApiTester() {
  const [method, setMethod] = useState<"GET" | "POST" | "PUT" | "PATCH" | "DELETE">("GET");
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/todos/1");
  const [headers, setHeaders] = useState(`{
  "Accept": "application/json"
}`);
  const [body, setBody] = useState(`{
  "title": "hello"
}`);
  const [resp, setResp] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [params, setParams] = useState<Array<{ key: string; value: string }>>([{ key: "", value: "" }]);
  const [authType, setAuthType] = useState<"None" | "Bearer" | "API Key" | "Basic">("None");
  const [authBearer, setAuthBearer] = useState("");
  const [authApiKeyKey, setAuthApiKeyKey] = useState("X-API-Key");
  const [authApiKeyValue, setAuthApiKeyValue] = useState("");
  const [authBasicUser, setAuthBasicUser] = useState("");
  const [authBasicPass, setAuthBasicPass] = useState("");
  const [savedName, setSavedName] = useState("");
  const [savedList, setSavedList] = useState<Array<{ name: string; data: string }>>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem("apiTester.saved") || "[]";
      return JSON.parse(raw);
    } catch {
      return [];
    }
  });
  const [varsJson, setVarsJson] = useState(`{
  "token": "",
  "userId": ""
}`);
  const [bodyMode, setBodyMode] = useState<"json" | "raw" | "urlencoded" | "graphql">("json");
  const [gqlQuery, setGqlQuery] = useState("query Example { __typename }");
  const [gqlVariables, setGqlVariables] = useState("{");
  // Advanced features
  const [collections, setCollections] = useState<Array<{ name: string; requests: Array<{ name: string; data: string }> }>>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem("apiTester.collections") || "[]";
      return JSON.parse(raw);
    } catch {
      return [];
    }
  });
  const [currentCollection, setCurrentCollection] = useState<string>("");
  const [preRequestScript, setPreRequestScript] = useState("");
  const [testScript, setTestScript] = useState("");
  const [runnerData, setRunnerData] = useState(`[
    { "id": 1, "name": "test1" },
    { "id": 2, "name": "test2" }
  ]`);
  const [runnerIterations, setRunnerIterations] = useState(1);
  const [timeout, setTimeout] = useState(30000);
  const [followRedirects, setFollowRedirects] = useState(true);
  const [proxyUrl, setProxyUrl] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [collectionAuth, setCollectionAuth] = useState<CollectionAuth>({ type: "None", data: {} });
  const [collectionHeaders, setCollectionHeaders] = useState(`{
    "User-Agent": "API Visualizer"
  }`);
  const [collectionTests, setCollectionTests] = useState("");

  function interpolate(input: string, vars: Record<string, string>): string {
    return input.replace(/\{\{\s*([a-zA-Z0-9_\-\.]+)\s*\}\}/g, (_m, key) => (vars[key] ?? ""));
  }

  async function send() {
    setLoading(true);
    setResp(null);
    try {
      const parsedVars = varsJson ? JSON.parse(varsJson) : {};
      const urlInterpolated = interpolate(url, parsedVars);
      const headersInterpolated = interpolate(headers, parsedVars);
      const bodyInterpolated = interpolate(body, parsedVars);
      const parsedHeaders = headersInterpolated ? JSON.parse(headersInterpolated) : {};
      // Auth helpers
      if (authType === "Bearer" && authBearer) {
        parsedHeaders["Authorization"] = `Bearer ${interpolate(authBearer, parsedVars)}`;
      } else if (authType === "API Key" && authApiKeyKey && authApiKeyValue) {
        parsedHeaders[interpolate(authApiKeyKey, parsedVars)] = interpolate(authApiKeyValue, parsedVars);
      } else if (authType === "Basic" && (authBasicUser || authBasicPass)) {
        const token = btoa(`${interpolate(authBasicUser, parsedVars)}:${interpolate(authBasicPass, parsedVars)}`);
        parsedHeaders["Authorization"] = `Basic ${token}`;
      }

      // Params sync into URL
      const u = new URL(urlInterpolated);
      const existing = new URLSearchParams(u.search);
      params.filter(p => p.key).forEach(p => existing.set(interpolate(p.key, parsedVars), interpolate(p.value, parsedVars)));
      u.search = existing.toString();

      // Prepare body and headers for special modes
      let outboundBody = bodyInterpolated as string | undefined;
      if (bodyMode === "urlencoded" && outboundBody) {
        try {
          const paramsObj = JSON.parse(outboundBody);
          const usp = new URLSearchParams();
          Object.entries(paramsObj).forEach(([k, v]) => usp.set(String(k), String(v)));
          outboundBody = usp.toString();
          if (!parsedHeaders["Content-Type"]) parsedHeaders["Content-Type"] = "application/x-www-form-urlencoded";
        } catch {
          // fallback: keep as-is
        }
      } else if (bodyMode === "graphql") {
        const gql = { query: gqlQuery, variables: (() => { try { return JSON.parse(gqlVariables || "{}"); } catch { return {}; } })() };
        outboundBody = JSON.stringify(gql);
        if (!parsedHeaders["Content-Type"]) parsedHeaders["Content-Type"] = "application/json";
      } else if (bodyMode === "json") {
        if (!parsedHeaders["Content-Type"]) parsedHeaders["Content-Type"] = "application/json";
      }

      const r = await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: u.toString(), method, headers: parsedHeaders, body: outboundBody }),
      });
      const j = await r.json();
      setResp(j);
    } catch (e) {
      setResp({ error: e instanceof Error ? e.message : String(e) });
    } finally {
      setLoading(false);
    }
  }

  const contentType = useMemo(() => {
    const ct = resp?.headers?.["content-type"] || resp?.headers?.["Content-Type"];
    return typeof ct === "string" ? ct : "";
  }, [resp]);

  const prettyBody = useMemo(() => {
    if (!resp?.body) return "";
    try {
      return JSON.stringify(JSON.parse(resp.body), null, 2);
    } catch {
      return resp.body;
    }
  }, [resp]);

  async function saveCurrent() {
    const item = {
      name: savedName || `${method} ${url}`,
      data: JSON.stringify({ method, url, headers, body, params, authType, authBearer, authApiKeyKey, authApiKeyValue, authBasicUser, authBasicPass }),
    };
    setSavedName("");
    // Try server first
    try {
      const r = await fetch("/api/requests", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) });
      const ok = await r.json();
      if (!ok?.ok) throw new Error("server save failed");
    } catch {
      const next = [item, ...savedList].slice(0, 50);
      setSavedList(next);
      try { localStorage.setItem("apiTester.saved", JSON.stringify(next)); } catch {}
    }
  }

  function loadSaved(index: number) {
    try {
      const parsed = JSON.parse(savedList[index].data);
      setMethod(parsed.method);
      setUrl(parsed.url);
      setHeaders(parsed.headers);
      setBody(parsed.body);
      setParams(parsed.params || [{ key: "", value: "" }]);
      setAuthType(parsed.authType || "None");
      setAuthBearer(parsed.authBearer || "");
      setAuthApiKeyKey(parsed.authApiKeyKey || "X-API-Key");
      setAuthApiKeyValue(parsed.authApiKeyValue || "");
      setAuthBasicUser(parsed.authBasicUser || "");
      setAuthBasicPass(parsed.authBasicPass || "");
    } catch {}
  }

  // Advanced features functions
  async function runPreRequestScript(vars: Record<string, string>) {
    if (!preRequestScript.trim()) return vars;
    try {
      // Simple eval-based execution (in production, use a proper JS sandbox)
      const func = new Function('pm', 'vars', preRequestScript);
      const pm = {
        variables: {
          set: (key: string, val: string) => { vars[key] = val; },
          get: (key: string) => vars[key] || ""
        },
        environment: {
          set: (key: string, val: string) => { vars[key] = val; },
          get: (key: string) => vars[key] || ""
        }
      };
      func(pm, vars);
    } catch (e) {
      console.warn("Pre-request script error:", e);
    }
    return vars;
  }

  async function runTestScript(resp: ApiResponse | null, vars: Record<string, string>) {
    if (!testScript.trim()) return;
    try {
      const func = new Function('pm', 'vars', 'response', testScript);
      const pm = {
        test: (name: string, fn: () => boolean) => {
          try {
            if (fn()) console.log(`✓ ${name}`);
            else console.log(`✗ ${name}`);
          } catch (e) {
            console.log(`✗ ${name}: ${e}`);
          }
        },
        expect: (val: unknown) => ({
          to: {
            be: {
              oneOf: (arr: unknown[]) => arr.includes(val),
              greaterThan: (n: number) => (val as number) > n,
              lessThan: (n: number) => (val as number) < n
            },
            have: {
              status: (code: number) => val === code,
              header: (name: string, value?: string) => {
                const headers = resp?.headers || {};
                if (value) return headers[name.toLowerCase()] === value;
                return headers[name.toLowerCase()] !== undefined;
              }
            }
          }
        })
      };
      func(pm, vars, resp);
    } catch (e) {
      console.warn("Test script error:", e);
    }
  }

  async function runCollection() {
    if (!currentCollection) return;
    const coll = collections.find(c => c.name === currentCollection);
    if (!coll) return;

    const results: TestResult[] = [];
    for (const req of coll.requests) {
      try {
        const parsed = JSON.parse(req.data);
        // Apply collection auth/headers
        const collHeaders = collectionHeaders ? JSON.parse(collectionHeaders) : {};
        const finalHeaders = { ...collHeaders, ...(parsed.headers ? JSON.parse(parsed.headers) : {}) };

        // Apply collection auth
        if (collectionAuth.type === "Bearer" && collectionAuth.data.token) {
          finalHeaders["Authorization"] = `Bearer ${collectionAuth.data.token}`;
        }
        // Similar for other auth types...

        const r = await fetch("/api/proxy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: parsed.url,
            method: parsed.method,
            headers: finalHeaders,
            body: parsed.body
          }),
        });
        const j = await r.json();
        results.push({ name: req.name, result: j });

        // Run collection tests
        if (collectionTests) {
          runTestScript(j, {});
        }
      } catch (e) {
        results.push({ name: req.name, error: String(e) });
      }
    }
    console.log("Collection run results:", results);
  }

  async function runWithData() {
    const data = JSON.parse(runnerData || "[]");
    const results: TestResult[] = [];

    for (let i = 0; i < Math.min(runnerIterations, data.length || 1); i++) {
      const iterationData = data[i] || {};
      let vars = { ...iterationData };

      // Pre-request
      vars = await runPreRequestScript(vars);

      // Send request with retries
      let lastResp: ApiResponse | null = null;
      for (let attempt = 0; attempt <= retryCount; attempt++) {
        try {
          const parsedVars = vars;
          const urlInterpolated = interpolate(url, parsedVars);
          const headersInterpolated = interpolate(headers, parsedVars);
          const bodyInterpolated = interpolate(body, parsedVars);
          const parsedHeaders = headersInterpolated ? JSON.parse(headersInterpolated) : {};

          // Auth
          if (authType === "Bearer" && authBearer) {
            parsedHeaders["Authorization"] = `Bearer ${interpolate(authBearer, parsedVars)}`;
          }

          const r = await fetch("/api/proxy", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              url: urlInterpolated,
              method,
              headers: parsedHeaders,
              body: bodyInterpolated,
              timeout,
              followRedirects,
              proxy: proxyUrl || undefined
            }),
          });
          const j = await r.json();
          lastResp = j;

          // Run tests
          await runTestScript(j, vars);
          break; // Success, exit retry loop
        } catch (e) {
          if (attempt === retryCount) {
            lastResp = { error: String(e) };
          }
        }
      }

      results.push({ iteration: i + 1, data: iterationData, response: lastResp });
    }

    console.log("Runner results:", results);
  }

  return (
    <Card className="rounded-2xl border-transparent bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-[0_0_1px_1px_hsl(var(--border))]">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4">
          {/* Mobile-first responsive layout */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-xl min-w-[100px]">
                    {method} <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {(["GET","POST","PUT","PATCH","DELETE"] as const).map(m => (
                    <DropdownMenuItem key={m} onSelect={() => setMethod(m)}>{m}</DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={send} disabled={loading} className="rounded-xl px-3 sm:px-4">
                    <Send className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">{loading ? "Sending..." : "Send"}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Send request</TooltipContent>
              </Tooltip>
            </div>
            <Input value={url} onChange={(e) => setUrl(e.target.value)} className="flex-1 rounded-xl text-sm" placeholder="https://api.example.com" />
          </div>

          {/* Action buttons - responsive grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={() => navigator.clipboard.writeText(url)} className="rounded-xl p-2">
                  <ClipboardCopy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy URL</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={() => { setHeaders(`{\n  "Accept": "application/json"\n}`); setBody(`{\n  "title": "hello"\n}`); }} className="rounded-xl p-2">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reset inputs</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={saveCurrent} className="rounded-xl p-2">
                  <SaveIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Save request</TooltipContent>
            </Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-xl p-2">
                  <Folder className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="max-h-[300px] overflow-auto w-[200px]">
                <DropdownMenuItem onSelect={() => {
                  const name = prompt("Collection name:");
                  if (name) {
                    setCollections([...collections, { name, requests: [] }]);
                    try { localStorage.setItem("apiTester.collections", JSON.stringify([...collections, { name, requests: [] }])); } catch {}
                  }
                }}>New Collection</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => {
                  if (currentCollection && savedName) {
                    const coll = collections.find(c => c.name === currentCollection);
                    if (coll) {
                      const req = { name: savedName, data: JSON.stringify({ method, url, headers, body, params, authType, authBearer, authApiKeyKey, authApiKeyValue, authBasicUser, authBasicPass }) };
                      coll.requests.push(req);
                      setCollections([...collections]);
                      try { localStorage.setItem("apiTester.collections", JSON.stringify(collections)); } catch {}
                    }
                  }
                }} disabled={!currentCollection}>Add to Collection</DropdownMenuItem>
                <div className="h-px my-1 bg-border" />
                {collections.length === 0 && <DropdownMenuItem disabled>No collections</DropdownMenuItem>}
                {collections.map((coll, i) => (
                  <DropdownMenuItem key={i} onSelect={() => setCurrentCollection(coll.name)} className="text-xs">
                    <Folder className="h-3 w-3 mr-2" /> {coll.name} ({coll.requests.length})
                  </DropdownMenuItem>
                ))}
                {currentCollection && (
                  <>
                    <div className="h-px my-1 bg-border" />
                    <DropdownMenuItem disabled className="text-xs">Requests in {currentCollection}:</DropdownMenuItem>
                    {collections.find(c => c.name === currentCollection)?.requests.slice(0, 5).map((req, j) => (
                      <DropdownMenuItem key={j} onSelect={() => {
                        try {
                          const parsed = JSON.parse(req.data);
                          setMethod(parsed.method);
                          setUrl(parsed.url);
                          setHeaders(parsed.headers);
                          setBody(parsed.body);
                          setParams(parsed.params || [{ key: "", value: "" }]);
                          setAuthType(parsed.authType || "None");
                          setAuthBearer(parsed.authBearer || "");
                          setAuthApiKeyKey(parsed.authApiKeyKey || "X-API-Key");
                          setAuthApiKeyValue(parsed.authApiKeyValue || "");
                          setAuthBasicUser(parsed.authBasicUser || "");
                          setAuthBasicPass(parsed.authBasicPass || "");
                        } catch {}
                      }} className="text-xs">{req.name}</DropdownMenuItem>
                    ))}
                    <DropdownMenuItem onSelect={runCollection} className="text-xs">
                      <Play className="h-3 w-3 mr-2" /> Run Collection
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-xl p-2">
                  <History className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="max-h-[300px] overflow-auto w-[200px]">
                <DropdownMenuItem disabled className="text-xs">Server History</DropdownMenuItem>
                <DropdownMenuItem onSelect={async () => {
                  try {
                    const r = await fetch("/api/requests");
                    const data = await r.json();
                    const list = (data.items || []).map((d: { name: string; data: string }) => ({ name: d.name, data: d.data }));
                    setSavedList(list);
                  } catch {}
                }} className="text-xs">Refresh</DropdownMenuItem>
                <div className="h-px my-1 bg-border" />
                {savedList.length === 0 && <DropdownMenuItem disabled className="text-xs">No saved requests</DropdownMenuItem>}
                {savedList.slice(0, 10).map((it, i) => (
                  <DropdownMenuItem key={i} onSelect={() => loadSaved(i)} className="text-xs">{it.name}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Spacer for grid alignment */}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <Tabs defaultValue="headers" className="w-full">
            <ScrollArea className="w-full">
              <TabsList className="inline-flex h-9 items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-max min-w-full">
                <TabsTrigger value="headers" className="whitespace-nowrap">Headers</TabsTrigger>
                <TabsTrigger value="body" disabled={method === "GET" || method === "DELETE"} className="whitespace-nowrap">Body</TabsTrigger>
                <TabsTrigger value="params" className="whitespace-nowrap">Params</TabsTrigger>
                <TabsTrigger value="auth" className="whitespace-nowrap">Auth</TabsTrigger>
                <TabsTrigger value="vars" className="whitespace-nowrap">Vars</TabsTrigger>
                <TabsTrigger value="pre" className="whitespace-nowrap">Pre-req</TabsTrigger>
                <TabsTrigger value="tests" className="whitespace-nowrap">Tests</TabsTrigger>
                <TabsTrigger value="collection" className="whitespace-nowrap">Collection</TabsTrigger>
                <TabsTrigger value="settings" className="whitespace-nowrap">Settings</TabsTrigger>
              </TabsList>
            </ScrollArea>
            <TabsContent value="headers" className="mt-2">
              <Textarea value={headers} onChange={(e) => setHeaders(e.target.value)} className="min-h-[120px] rounded-2xl" />
            </TabsContent>
            <TabsContent value="body" className="mt-2">
              <div className="flex items-center gap-2 mb-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-xl">{bodyMode} <ChevronDown className="ml-2 h-4 w-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {["json","raw","urlencoded","graphql"].map((m) => (
                      <DropdownMenuItem key={m} onSelect={() => setBodyMode(m as "json" | "raw" | "urlencoded" | "graphql")}>{m}</DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {bodyMode === "graphql" ? (
                <div className="grid gap-2">
                  <Textarea value={gqlQuery} onChange={(e) => setGqlQuery(e.target.value)} className="min-h-[140px] rounded-2xl" placeholder="GraphQL query" />
                  <Textarea value={gqlVariables} onChange={(e) => setGqlVariables(e.target.value)} className="min-h-[100px] rounded-2xl" placeholder="GraphQL variables JSON" />
                </div>
              ) : (
                <Textarea value={body} onChange={(e) => setBody(e.target.value)} className="min-h-[160px] rounded-2xl" />
              )}
            </TabsContent>
            <TabsContent value="params" className="mt-2">
              <div className="grid gap-2">
                {params.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Input value={row.key} onChange={(e) => {
                      const next = [...params]; next[idx] = { ...row, key: e.target.value }; setParams(next);
                      if (idx === params.length - 1 && (e.target.value || row.value)) setParams([...next, { key: "", value: "" }]);
                    }} placeholder="key" className="rounded-xl" />
                    <Input value={row.value} onChange={(e) => {
                      const next = [...params]; next[idx] = { ...row, value: e.target.value }; setParams(next);
                      if (idx === params.length - 1 && (row.key || e.target.value)) setParams([...next, { key: "", value: "" }]);
                    }} placeholder="value" className="rounded-xl" />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="auth" className="mt-2">
              <div className="grid gap-3">
                <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="rounded-xl w-full sm:w-auto">{authType} <ChevronDown className="ml-2 h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {["None","Bearer","API Key","Basic"].map(t => (
                        <DropdownMenuItem key={t} onSelect={() => setAuthType(t as "None" | "Bearer" | "API Key" | "Basic")}>{t}</DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {authType === "Bearer" && (
                  <Input value={authBearer} onChange={(e) => setAuthBearer(e.target.value)} placeholder="Bearer token" className="rounded-xl" />
                )}
                {authType === "API Key" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Input value={authApiKeyKey} onChange={(e) => setAuthApiKeyKey(e.target.value)} placeholder="Header name (e.g., X-API-Key)" className="rounded-xl" />
                    <Input value={authApiKeyValue} onChange={(e) => setAuthApiKeyValue(e.target.value)} placeholder="API key value" className="rounded-xl" />
                  </div>
                )}
                {authType === "Basic" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Input value={authBasicUser} onChange={(e) => setAuthBasicUser(e.target.value)} placeholder="Username" className="rounded-xl" />
                    <Input value={authBasicPass} onChange={(e) => setAuthBasicPass(e.target.value)} placeholder="Password" type="password" className="rounded-xl" />
                  </div>
                )}
                <div className="text-xs text-muted-foreground">Authorization header will be applied automatically on send.</div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input value={savedName} onChange={(e) => setSavedName(e.target.value)} placeholder="Save as... (optional)" className="rounded-xl" />
                  <Button variant="secondary" onClick={saveCurrent} className="rounded-xl w-full sm:w-auto"><SaveIcon className="h-4 w-4 mr-2" /> Save</Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="vars" className="mt-2">
              <div className="text-xs text-muted-foreground mb-2">Use <code>{'{{var}}'}</code> in URL, headers, body, params, and auth fields.</div>
              <Textarea value={varsJson} onChange={(e) => setVarsJson(e.target.value)} className="min-h-[140px] rounded-2xl" />
            </TabsContent>
            <TabsContent value="pre" className="mt-2">
              <div className="text-xs text-muted-foreground mb-2">JavaScript code to run before sending the request. Use <code>pm.variables</code> and <code>pm.environment</code>.</div>
              <Textarea value={preRequestScript} onChange={(e) => setPreRequestScript(e.target.value)} className="min-h-[160px] rounded-2xl font-mono text-sm" placeholder="// Example: pm.variables.set('token', 'abc123');" />
            </TabsContent>
            <TabsContent value="tests" className="mt-2">
              <div className="text-xs text-muted-foreground mb-2">JavaScript tests to run after receiving the response. Use <code>pm.test()</code> and <code>pm.expect()</code>.</div>
              <Textarea value={testScript} onChange={(e) => setTestScript(e.target.value)} className="min-h-[160px] rounded-2xl font-mono text-sm" placeholder="// Example: pm.test('Status is 200', () => pm.expect(pm.response.status).to.be.equal(200));" />
            </TabsContent>
            <TabsContent value="collection" className="mt-2">
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium">Current Collection</label>
                  <select value={currentCollection} onChange={(e) => setCurrentCollection(e.target.value)} className="w-full p-2 rounded-xl border">
                    <option value="">None</option>
                    {collections.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Collection Auth</label>
                  <div className="grid gap-2">
                    <select value={collectionAuth.type} onChange={(e) => setCollectionAuth({ ...collectionAuth, type: e.target.value })} className="p-2 rounded-xl border">
                      <option value="None">None</option>
                      <option value="Bearer">Bearer Token</option>
                      <option value="API Key">API Key</option>
                      <option value="Basic">Basic Auth</option>
                    </select>
                    {collectionAuth.type === "Bearer" && (
                      <Input value={(collectionAuth.data.token as string) || ""} onChange={(e) => setCollectionAuth({ ...collectionAuth, data: { token: e.target.value } })} placeholder="Bearer token" className="rounded-xl" />
                    )}
                    {collectionAuth.type === "API Key" && (
                      <div className="flex gap-2">
                        <Input value={(collectionAuth.data.key as string) || "X-API-Key"} onChange={(e) => setCollectionAuth({ ...collectionAuth, data: { ...collectionAuth.data, key: e.target.value } })} placeholder="Header name" className="rounded-xl" />
                        <Input value={(collectionAuth.data.value as string) || ""} onChange={(e) => setCollectionAuth({ ...collectionAuth, data: { ...collectionAuth.data, value: e.target.value } })} placeholder="API key value" className="rounded-xl" />
                      </div>
                    )}
                    {collectionAuth.type === "Basic" && (
                      <div className="flex gap-2">
                        <Input value={(collectionAuth.data.user as string) || ""} onChange={(e) => setCollectionAuth({ ...collectionAuth, data: { ...collectionAuth.data, user: e.target.value } })} placeholder="Username" className="rounded-xl" />
                        <Input value={(collectionAuth.data.pass as string) || ""} onChange={(e) => setCollectionAuth({ ...collectionAuth, data: { ...collectionAuth.data, pass: e.target.value } })} type="password" placeholder="Password" className="rounded-xl" />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Collection Headers</label>
                  <Textarea value={collectionHeaders} onChange={(e) => setCollectionHeaders(e.target.value)} className="min-h-[100px] rounded-2xl font-mono text-sm" placeholder='{"Content-Type": "application/json"}' />
                </div>
                <div>
                  <label className="text-sm font-medium">Collection Tests</label>
                  <Textarea value={collectionTests} onChange={(e) => setCollectionTests(e.target.value)} className="min-h-[120px] rounded-2xl font-mono text-sm" placeholder="// Tests run after each request in collection" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="settings" className="mt-2">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Timeout (ms)</label>
                    <Input type="number" value={timeout} onChange={(e) => setTimeout(Number(e.target.value))} className="rounded-xl" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Retry Count</label>
                    <Input type="number" value={retryCount} onChange={(e) => setRetryCount(Number(e.target.value))} className="rounded-xl" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="followRedirects" checked={followRedirects} onChange={(e) => setFollowRedirects(e.target.checked)} />
                  <label htmlFor="followRedirects" className="text-sm">Follow redirects</label>
                </div>
                <div>
                  <label className="text-sm font-medium">Proxy URL (optional)</label>
                  <Input value={proxyUrl} onChange={(e) => setProxyUrl(e.target.value)} placeholder="http://proxy.example.com:8080" className="rounded-xl" />
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium">Runner Data (JSON array)</label>
                  <Textarea value={runnerData} onChange={(e) => setRunnerData(e.target.value)} className="min-h-[120px] rounded-2xl font-mono text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium">Runner Iterations</label>
                  <Input type="number" value={runnerIterations} onChange={(e) => setRunnerIterations(Number(e.target.value))} className="rounded-xl" />
                </div>
                <Button onClick={runWithData} className="rounded-xl"><Play className="h-4 w-4 mr-2" /> Run with Data</Button>
              </div>
            </TabsContent>
          </Tabs>
          {resp && (
            <div className="mt-2">
              <div className="text-xs text-muted-foreground flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`inline-flex items-center rounded-md px-2 py-0.5 ${resp.status && resp.status >= 200 && resp.status < 300 ? "bg-green-500/10 text-green-600 dark:text-green-400" : resp.status && resp.status >= 400 ? "bg-red-500/10 text-red-600 dark:text-red-400" : "bg-foreground/5"}`}>{resp.status} {resp.statusText}</span>
                  <span>Time: {resp.timeMs}ms</span>
                  <span>Size: {resp.size}b</span>
                  <span className="truncate max-w-[200px] sm:max-w-none">{contentType}</span>
                </div>
                <div className="ml-auto">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="sm" variant="outline" className="rounded-xl" onClick={() => resp.body && navigator.clipboard.writeText(resp.body)}><ClipboardCopy className="h-4 w-4 mr-2" /> Copy</Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy response</TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <Separator className="my-3" />
              <Tabs defaultValue="resp-body">
                <TabsList>
                  <TabsTrigger value="resp-body">Body</TabsTrigger>
                  <TabsTrigger value="resp-headers">Headers</TabsTrigger>
                  <TabsTrigger value="resp-cookies">Cookies</TabsTrigger>
                  <TabsTrigger value="resp-timeline">Timeline</TabsTrigger>
                </TabsList>
                <TabsContent value="resp-body" className="mt-2">
                  <ScrollArea className="h-[260px] rounded-xl border p-3 bg-card/50">
                    <pre className="text-sm whitespace-pre-wrap font-mono">{prettyBody}</pre>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="resp-headers" className="mt-2">
                  <ScrollArea className="h-[260px] rounded-xl border p-3 bg-card/50">
                    <pre className="text-sm whitespace-pre-wrap font-mono">{JSON.stringify(resp.headers || {}, null, 2)}</pre>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="resp-cookies" className="mt-2">
                  <ScrollArea className="h-[260px] rounded-xl border p-3 bg-card/50">
                    <pre className="text-sm whitespace-pre-wrap font-mono">{(() => {
                      const sc = (resp.headers && (resp.headers["set-cookie"] || resp.headers["Set-Cookie"])) || "";
                      if (typeof sc === "string") return sc || "No cookies";
                      return JSON.stringify(sc, null, 2) || "No cookies";
                    })()}</pre>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="resp-timeline" className="mt-2">
                  <div className="rounded-xl border p-3 bg-card/50 text-sm">
                    <div>Request sent: 0ms</div>
                    <div>Response received: {resp.timeMs}ms</div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-4 grid gap-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium">Explain with AI</div>
                  <Button size="sm" onClick={async () => {
                    if (!resp?.body) return;
                    setAiLoading(true);
                    setAiAnswer("");
                    try {
                      const detectedFormat: "json" | "xml" | "raw" = (() => {
                        const ct = contentType.toLowerCase();
                        if (ct.includes("application/json")) return "json";
                        if (ct.includes("xml") || ct.includes("html")) return "xml";
                        return "raw";
                      })();
                      const res = await fetch("/api/analyze", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ content: resp.body, format: detectedFormat, question: aiQuestion })
                      });
                      const data = await res.json();
                      setAiAnswer(data.text ?? `Error: ${data.error ?? "Unknown error"}`);
                    } finally {
                      setAiLoading(false);
                    }
                  }} disabled={aiLoading || !resp?.body}>{aiLoading ? "Analyzing..." : "Analyze"}</Button>
                </div>
                <Textarea value={aiQuestion} onChange={(e) => setAiQuestion(e.target.value)} placeholder="Ask a question about this response..." className="min-h-[80px] rounded-2xl" />
                {aiAnswer && (
                  <div className="rounded-xl border p-3 text-sm whitespace-pre-wrap">{aiAnswer}</div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}


