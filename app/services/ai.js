// services/ai.js - REAL AI MAGIC!

// Get the API key from .env.local
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// Function 1: Get REAL outfit from Google AI
export async function getRealOutfitFromAI(description) {
  console.log("🔮 Calling Google AI for outfit...");
  
  // If no API key, show example
  if (!API_KEY || API_KEY === "TEST_KEY_FOR_NOW") {
    return `🎯 **DEMO OUTFIT** (Add real API key for magic!)
    
👕 TOP: White linen shirt
👖 BOTTOM: Light blue jeans
👟 SHOES: White sneakers
💎 ACCESSORIES: Polarized sunglasses
🎨 STYLE: Casual summer chic
    
✨ **Get real AI:** Go to Google AI Studio → Get API key → Add to .env.local`;
  }

  try {
    // Call Google Gemini AI
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a world-class fashion stylist. Create a complete outfit based on: "${description}"

              Format your response EXACTLY like this:
              
              🎯 **OUTFIT FOR:** [brief occasion/style]
              
              👕 **TOP:** [specific clothing item]
              👖 **BOTTOM:** [specific clothing item]
              👟 **FOOTWEAR:** [specific shoes]
              💎 **ACCESSORIES:** [2-3 accessories]
              🎨 **STYLE TIP:** [one practical tip]
              
              Make it fashionable, wearable, and modern!`
            }]
          }]
        })
      }
    );

    // Get AI's response
    const data = await response.json();
    
    // Return the AI's answer
    if (data.candidates && data.candidates[0]) {
      return data.candidates[0].content.parts[0].text;
    } else {
      return "🤔 AI is thinking... try again!";
    }
    
  } catch (error) {
    console.error("AI Error:", error);
    return `⚠️ AI is taking a break! Try this:
    
👕 Top: Black graphic tee
👖 Bottom: Ripped black jeans
👟 Shoes: Combat boots
💎 Accessories: Silver chain necklace
🎨 Style: Edgy streetwear
    
(Error: ${error.message})`;
  }
}

// Function 2: REAL Fashion Chatbot
export async function askRealFashionAI(question) {
  console.log("💬 Chatting with fashion AI...");
  
  if (!API_KEY || API_KEY === "TEST_KEY_FOR_NOW") {
    return "💁‍♀️ **Demo Mode:** Add your Google AI key to chat with real fashion expert!";
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a friendly, knowledgeable fashion assistant. A user asks: "${question}"
              
              Give a helpful, enthusiastic answer in 2-3 sentences.
              Include one specific clothing recommendation.
              End with a fashion emoji! ✨`
            }]
          }]
        })
      }
    );

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]) {
      return data.candidates[0].content.parts[0].text;
    } else {
      return "Hmm, let me think about that fashion question... 👗";
    }
    
  } catch (error) {
    return "Oops! Fashion expert is busy. Try again in a moment! 💫";
  }
}