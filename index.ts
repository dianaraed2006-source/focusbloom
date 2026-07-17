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

    const { subjects, days, hoursPerDay, preferences = "" } = await req.json();
    const prompt = `
You are an academic planning coach for a university pharmacy student.
Create a realistic weekly plan that prevents backlog.

Student subjects:
${JSON.stringify(subjects)}

Available study days: ${JSON.stringify(days)}
Available focused study hours per day: ${hoursPerDay}
Preferences/constraints: ${preferences || "None"}

Rules:
- Respond in Arabic, while preserving English course terminology.
- Divide each day into focused blocks with breaks.
- Give harder or less-studied subjects more time.
- Include same-day review, next-day quick recall, and one weekly cumulative review.
- Do not overload a day. Leave a small buffer.
- Include a fallback plan for a missed day.
- Make the output practical and specific, not motivational filler.
- Output headings, then a day-by-day schedule, then anti-backlog rules.
`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model: "gpt-5-mini", input: prompt }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message || "OpenAI request failed");

    return new Response(JSON.stringify({ plan: data.output_text || "" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error.message || error) }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
