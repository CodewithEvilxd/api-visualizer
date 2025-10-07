import { NextRequest, NextResponse } from "next/server";

type ProxyRequest = {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  timeout?: number;
  followRedirects?: boolean;
  proxy?: string;
};

export async function POST(req: NextRequest) {
  try {
    const { url, method = "GET", headers = {}, body, timeout = 30000, followRedirects = true, proxy }: ProxyRequest = await req.json();

    try {
      const parsed = new URL(url);
      if (!/^https?:$/.test(parsed.protocol)) {
        return NextResponse.json({ error: "Only http/https allowed" }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const start = Date.now();
    const resp = await fetch(url, {
      method,
      headers,
      body: ["GET", "HEAD"].includes(method.toUpperCase()) ? undefined : body,
      redirect: followRedirects ? "follow" : "manual",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const timeMs = Date.now() - start;
    const text = await resp.text();
    const size = new TextEncoder().encode(text).length;
    const respHeaders: Record<string, string> = {};
    resp.headers.forEach((v, k) => (respHeaders[k] = v));
    return NextResponse.json({
      status: resp.status,
      statusText: resp.statusText,
      headers: respHeaders,
      body: text,
      timeMs,
      size,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


