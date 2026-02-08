import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { fabric, color, style, occasion, bodyType } = await req.json();

    // 1️⃣ Build AI prompt from user inputs
    const prompt = `
    Fashion outfit for a ${bodyType} body type.
    Fabric: ${fabric}.
    Color: ${color}.
    Style: ${style}.
    Occasion: ${occasion}.
    High-quality fashion photography, full outfit, studio lighting.
    `;

    console.log("Generated prompt:", prompt);

    // 2️⃣ Call DeepAI Text-to-Image API
    const response = await fetch("https://api.deepai.org/api/text2img", {
      method: "POST",
      headers: {
        "Api-Key": process.env.DEEPAI_API_KEY,
      },
      body: new URLSearchParams({
        text: prompt,
      }),
    });

    const data = await response.json();

    // 3️⃣ Safety fallback (VERY IMPORTANT for free AI)
    if (!data || !data.output_url) {
      console.warn("DeepAI failed, using placeholder image");
      return NextResponse.json({
        imageUrl: "/outfit-placeholder.png",
        prompt,
      });
    }

    // 4️⃣ Return AI-generated image URL
    return NextResponse.json({
      imageUrl: data.output_url,
      prompt,
    });

  } catch (error) {
    console.error("API ERROR:", error);

    // Final fallback to avoid frontend crash
    return NextResponse.json(
      {
        imageUrl: "/outfit-placeholder.png",
        error: "AI image generation failed",
      },
      { status: 500 }
    );
  }
}
