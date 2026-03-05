export async function POST(req) {
  try {
    const body = await req.json();

    const prompt = `
    Fashion outfit, ${body.color} ${body.fabric} clothing,
    ${body.style} style, for ${body.occasion},
    body type ${body.bodyType},
    high quality fashion photography
    `;

    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          options: { wait_for_model: true } // important
        }),
      }
    );

    console.log("Status:", response.status);

    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.includes("image")) {
      const text = await response.text();
      console.log("HF ERROR:", text);
      return new Response("Failed to generate image", { status: 500 });
    }

    const image = await response.arrayBuffer();

    return new Response(image, {
      headers: { "Content-Type": "image/png" },
    });

  } catch (error) {
    console.log(error);
    return new Response("Server error", { status: 500 });
  }
}