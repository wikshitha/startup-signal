import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY!,
});

export async function validateStartupIdea(data: {
  title: string;
  problem: string;
  solution: string;
  targetUsers: string;
}) {
  const prompt = `
Analyze this startup idea and return ONLY valid JSON.

Startup Title: ${data.title}
Problem: ${data.problem}
Solution: ${data.solution}
Target Users: ${data.targetUsers}

Return JSON:
{
  "score": 0,
  "marketDemand": "",
  "competitionLevel": "",
  "revenuePotential": "",
  "riskLevel": "",
  "risks": [],
  "mvpFeatures": [],
  "recommendation": ""
}
`;

  const response = await openai.chat.completions.create({
    model: "openai/gpt-oss-20b:free",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const text = response.choices[0].message.content || "";

  const cleanedText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanedText);
}