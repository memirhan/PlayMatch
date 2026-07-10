import { GoogleGenAI } from '@google/genai';

export async function generateGameRecommendation(profileData, apiKey) {
  const ai = new GoogleGenAI({ apiKey });

  // Use system instructions to force the AI's core behavior
  const systemInstruction = `You are a strict database-filtering AI. Your ONLY job is to output a single video game that perfectly matches the EXACT constraints provided. If the user says Mobile, you CANNOT output a PS5 exclusive. You must adhere to the JSON schema.`;

  const prompt = `
FIND A GAME MATCHING THESE EXACT PARAMETERS:

[PLATFORM CONSTRAINT: EXTREMELY STRICT]
Target Platform: ${profileData.hardware}
RULE: The game MUST be natively playable on "${profileData.hardware}". (e.g. if Target is Mobile, it MUST be on iOS/Android).

[GENRE CONSTRAINT]
Allowed Genres: ${profileData.genres.join(', ')}
RULE: The game MUST belong to at least one of these genres.

[STYLE & PACING]
Vibe: ${profileData.pacing}
Art Style: ${profileData.artStyle}

[EXCLUSIONS]
Do NOT recommend any of these: ${profileData.gamesPlayed.join(', ')}

[OUTPUT FORMAT]
Return ONLY a valid JSON object with the following keys:
{
  "title": "Exact game title",
  "genre": "The genre it matches",
  "platform": "List the platforms it is available on (MUST include ${profileData.hardware})",
  "reasoning": "Explain in 2 sentences why it fits their vibe, art style, and platform.",
  "tags": ["tag1", "tag2", "tag3"]
}
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.1,
      }
    });

    const text = response.text;
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("Could not connect to the AI service. Please check your API key.");
  }
}
