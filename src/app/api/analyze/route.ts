import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, type Content } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const { content, format, question } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Mock response for testing when API key is not set
      return NextResponse.json({
        text: "Mock Analysis: This appears to be a user data API response from Random User Generator. It provides random user profiles with details like name, location, email, login credentials, date of birth, registration info, phone numbers, ID, and profile pictures. Useful for testing applications that handle user data, populating demo databases, or UI prototyping."
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const systemPrompt = `You are an expert API analyst. Given an API response (JSON/XML/Raw) and an optional user question:
    - Briefly describe what this API likely does and useful use-cases.
    - Highlight key fields and any nested structures.
    - If a question is provided, answer it concisely.
    Keep it concise and developer-focused.`;

    const input: Content[] = [
      { role: "user", parts: [{ text: systemPrompt }] },
      { role: "user", parts: [{ text: `Format: ${format}` }] },
      { role: "user", parts: [{ text: `Content:\n${typeof content === "string" ? content.slice(0, 8000) : String(content)}` }] },
      ...(question ? [{ role: "user", parts: [{ text: `Question: ${question}` }] }] : []),
    ];

    const result = await model.generateContent({ contents: input });
    const text = result.response.text();
    return NextResponse.json({ text });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


