import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) throw new Error("OPENAI_API_KEY is missing");

    const { question, drugContext = [] } = await req.json();

    const prompt = `
You are a cautious pharmacy study assistant for university students.
Use the provided drug context first. Explain in Arabic with English drug terminology.
Never diagnose, prescribe, or claim that a medicine is absolutely safe.
Always mention that pregnancy, children, older adults, kidney/liver disease and interactions
require checking the current official label and a clinician/pharmacist.

Drug context:
${JSON.stringify(drugContext).slice(0, 20000)}

Student question:
${question}
`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-5-mini",
        input: prompt
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message || "OpenAI request failed");

    return new Response(JSON.stringify({ answer: data.output_text || "No answer returned." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error.message || error) }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
