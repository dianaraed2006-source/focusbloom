import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function buildPrompt(mode: string, language: string, course: string, year: string, professorStyle: string, text: string) {
  const modeInstructions: Record<string, string> = {
    comprehensive: `
Create a comprehensive, structured study summary that covers every high-yield concept without omitting
definitions, mechanisms, classifications, comparisons, examples, calculations, exceptions, tables, and
exam-relevant details. Preserve important terminology. Separate "must memorize" from "must understand".`,
    exam: `
Act like an experienced pharmacy professor preparing students for an exam. Extract likely MCQ traps,
true/false distinctions, compare-and-contrast points, lists, mechanisms, contraindications, calculations,
and details that are easy to confuse. Include a final "Last-minute revision" section.`,
    memorize: `
Convert the material into memorization-friendly notes: concise tables, mnemonics, drug/class patterns,
flashcards, active-recall questions, and spaced-repetition checkpoints.`,
    explain: `
Teach the material step-by-step from foundational concepts to advanced understanding. Explain why each
concept matters, connect ideas, and use pharmacy-relevant examples. Do not merely shorten the text.`,
    fullpack: `
Produce a complete university study pack containing:
1) comprehensive summary,
2) detailed explanation,
3) high-yield exam points,
4) must-memorize tables,
5) common confusions and traps,
6) 30 active-recall questions with answers,
7) 20 MCQs with answers and rationales,
8) flashcards,
9) one-page final revision sheet.
`
  };

  return `
You are a senior university pharmacy professor and academic study coach.
The user is a pharmacy student in ${year || "third, fourth, or fifth year"}.
Course: ${course || "Pharmacy course"}.
Professor/exam style notes: ${professorStyle || "Not provided"}.
Output language: ${language === "bilingual" ? "English terminology with clear Arabic explanation" : language}.

Important rules:
- Use ONLY the supplied course material as the main source.
- Do not invent facts that are absent from the material.
- Mark unclear or incomplete passages as "needs verification".
- Preserve exact numbers, equations, drug names, dosage forms, units, and exceptions.
- Distinguish course facts from additional explanation.
- Organize with headings and tables where useful.
- For medical content, this is educational, not patient-specific treatment advice.

Task:
${modeInstructions[mode] || modeInstructions.fullpack}

COURSE MATERIAL:
${text}
`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) throw new Error("OPENAI_API_KEY is missing");

    const { text, mode = "fullpack", language = "bilingual", course = "", year = "", professorStyle = "" } = await req.json();
    if (!text || text.trim().length < 50) throw new Error("The extracted course text is too short");

    // Keep the request bounded for an interactive Edge Function.
    const safeText = text.slice(0, 180000);
    const prompt = buildPrompt(mode, language, course, year, professorStyle, safeText);

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

    return new Response(JSON.stringify({
      summary: data.output_text || "No summary returned.",
      truncated: text.length > safeText.length,
      processed_characters: safeText.length
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error.message || error) }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
