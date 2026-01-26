// services/ai.ts — REAL AI MAGIC (Fixed & TypeScript-safe)

// ⚠️ NOTE:
// This is still CLIENT-SIDE usage because of NEXT_PUBLIC_
// For production, this should move to an API route.
// For now, this WILL WORK without errors.

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string | undefined;

/**
 * Function 1: Get REAL outfit from Google Gemini AI
 */
export async function getRealOutfitFromAI(
  description: string
): Promise<string> {
  console.log("🔮 Calling Google AI for outfit...");

  // Demo mode if API key is missing
  if (!API_KEY || API_KEY === "TEST_KEY_FOR_NOW") {
    return `🎯 **DEMO OUTFIT** (Add real API key for magic!)

👕 **TOP:** White linen shirt  
👖 **BOTTOM:** Light blue jeans  
👟 **SHOES:** White sneakers  
💎 **ACCESSORIES:** Polarized sunglasses  
🎨 **STYLE:** Casual summer chic  

✨ **Get real AI:**  
Go to Google AI Studio → Get API key → Add to .env.local`;
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a world-class fashion stylist.

Create a complete outfit based on this description:
"${description}"

Format your response EXACTLY like this:

🎯 **OUTFIT FOR:** [brief occasion/style]

👕 **TOP:** [specific clothing item]
👖 **BOTTOM:** [specific clothing item]
👟 **FOOTWEAR:** [specific shoes]
💎 **ACCESSORIES:** [2–3 accessories]
🎨 **STYLE TIP:** [one practical tip]

Make it fashionable, wearable, and modern.`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (
      data?.candidates?.[0]?.content?.parts?.[0]?.text
    ) {
      return data.candidates[0].content.parts[0].text as string;
    }

    return "🤔 AI is thinking… try again!";
  } catch (error: unknown) {
    console.error("AI Error:", error);

    return `⚠️ **AI is taking a break!** Try this instead:

👕 **TOP:** Black graphic tee  
👖 **BOTTOM:** Ripped black jeans  
👟 **SHOES:** Combat boots  
💎 **ACCESSORIES:** Silver chain necklace  
🎨 **STYLE:** Edgy streetwear  

(Error occurred while generating AI response)`;
  }
}

/**
 * Function 2: REAL Fashion Chatbot
 */
export async function askRealFashionAI(
  question: string
): Promise<string> {
  console.log("💬 Chatting with fashion AI...");

  if (!API_KEY || API_KEY === "TEST_KEY_FOR_NOW") {
    return "💁‍♀️ **Demo Mode:** Add your Google AI key to chat with a real fashion expert!";
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a friendly, knowledgeable fashion assistant.

User question:
"${question}"

Reply in 2–3 enthusiastic sentences.
Include one specific clothing recommendation.
End with a fashion emoji ✨`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (
      data?.candidates?.[0]?.content?.parts?.[0]?.text
    ) {
      return data.candidates[0].content.parts[0].text as string;
    }

    return "👗 Let me think about that fashion question for a moment…";
  } catch {
    return "💫 Oops! Fashion expert is busy. Try again in a moment!";
  }
}