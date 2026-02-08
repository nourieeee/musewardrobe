// services/ai.ts — OpenAI client (SAFE & CLEAN)

export async function askRealFashionAI(
  message: string
): Promise<string> {
  try {
    const res = await fetch("/api/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    return data.reply ?? "👗 No fashion advice received.";
  } catch (error) {
    console.error("OpenAI service error:", error);
    return "😢 Fashion AI is unavailable right now. Please try again.";
  }
}
