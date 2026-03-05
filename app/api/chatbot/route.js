import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
messages: [
  {
    role: "system",
    content: `
You are a modern fashion stylist chatbot.

Rules:
• Keep answers SHORT (max 5 lines)
• Use bullet points
• Avoid long paragraphs
• Give quick outfit suggestions
• Sound friendly and modern
`,
  },
  {
    role: "user",
    content: message,
  },
],
    });

    return NextResponse.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("OpenAI error:", error);
    return NextResponse.json(
      { reply: "AI service unavailable" },
      { status: 500 }
    );
  }
}
