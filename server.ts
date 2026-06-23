import express from "express";
import path from "path";
import dns from "dns";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Fix IPv6 binding issues in some environments
dns.setDefaultResultOrder("ipv4first");

const app = express();
const PORT = 3000;

// Setup body parsing with reasonable size limits for image scans
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));

// Lazy initializer for Gemini API client
let aiClient: GoogleGenAI | null = null;
function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY is not configured in environment variables.");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// Ensure error responses are returned as JSON
function handleApiError(res: any, error: any, message: string) {
  console.error(message, error);
  res.status(500).json({
    error: true,
    message: `${message}: ${error.message || error}`,
  });
}

// API Route: AI Crop Recommendation
app.post("/api/crop-recommendation", async (req, res) => {
  try {
    const { soilType, location, season, waterAvailability, budget, language } = req.body;
    const ai = getAiClient();
    
    const systemPrompt = `You are an expert agronomist advising a farmer. Recommend suitable crops matching these criteria:
- Soil Type: ${soilType || "Any"}
- Location: ${location || "Any"}
- Sowing Season: ${season || "Any"}
- Irrigation / Water Availability: ${waterAvailability || "Average"}
- Cost of cultivation Budget per acre: ₹${budget || "Any"}

Return the response in ${language || "English"}.
You MUST format your output strictly as a JSON object. Do not include markdown codeblock wraps like "\`\`\`json" or similar. Just return the raw JSON string matching this exact structure:
{
  "crops": [
    {
      "name": "Crop Name in English",
      "localName": "Name in Telugu or Hindi script if relevant",
      "expectedYield": "e.g., 20-25 quintals per acre",
      "costOfCultivation": "Estimated cost in Rupees (e.g., ₹25,000)",
      "duration": "Duration in days/months",
      "waterDemand": "High / Medium / Low",
      "marketDemand": "High",
      "estimatedProfit": "Estimated profit in Rupees (e.g., ₹45,000 per acre)",
      "sowingTips": "Short 1-sentence planting or sowing guidelines",
      "fertilizers": "Recommended NPK doses or organic alternative suggestions"
    }
  ],
  "generalAdvice": "A short advice summary in the requested language concerning crop rotation, weed control, or soil health management."
}
No extra text outside of the JSON block.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: systemPrompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("Empty response received from AI model");
    }
    
    // Parse to ensure validity before returning
    const parsedData = JSON.parse(textOutput.trim());
    res.json(parsedData);
  } catch (err: any) {
    handleApiError(res, err, "Failed to generate crop recommendation");
  }
});

// API Route: AI Crop Disease Detection
app.post("/api/disease-detection", async (req, res) => {
  try {
    const { image, cropName, language } = req.body;
    const ai = getAiClient();

    let contents: any[] = [];
    let promptText = `Analyze this crop photo. Identify if any crop/plant disease is present, especially context-tagged for ${cropName || "any crops"}.
Return the analysis in the requested language: ${language || "English"}.
Format the response strictly as a JSON object. Do not wrap with \`\`\`json. Return a raw JSON structure matching this exact pattern:
{
  "detected": true,
  "diseaseName": "Name of disease in English",
  "localDiseaseName": "Local Telugu/Hindi disease representation if relevant",
  "confidence": 0.90,
  "causes": ["Fungal spores activated by excess humidity", "Nutrient deficiency"],
  "symptoms": ["Brown spots on leaves", "Leaf curling"],
  "prevention": ["Crop rotation", "Use disease-free certified seeds"],
  "recommendedTreatment": ["Spray Copper Oxychloride 3g/L", "Remove and burn infected leaves"]
}
If no disease is detected or the image is not a plant/crop leaf, set "detected": false and "diseaseName": "Healthy Plant" or "Unable to recognize plant".`;

    if (image && image.startsWith("data:image")) {
      const base64Parts = image.split(",");
      const mimeType = base64Parts[0].match(/:(.*?);/)?.[1] || "image/jpeg";
      const base64Data = base64Parts[1];
      
      contents = [
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType
          }
        },
        promptText
      ];
    } else {
      // Prompt-only mock diagnosis placeholder text based on selected crop
      contents = [
        `Provide a typical plant disease diagnosis for crop: "${cropName || "Tomato"}".
Make it sound like a diagnostic scan took place for this mockup test.
Language: ${language || "English"}.
Output format: RAW JSON (no markdown block wrapper).
{
  "detected": true,
  "diseaseName": "Early Blight of ${cropName || "Tomato"}",
  "localDiseaseName": "झुलसा रोग / ఆకు మచ్చ తెగులు",
  "confidence": 0.95,
  "causes": ["Alternaria solani fungus thrives in warm temp and rainy spells"],
  "symptoms": ["Concentric dark target spots on older leaves", "Yellow rings surrounding leaf spots"],
  "prevention": ["Maintain spacing to improve airflow", "Pruning bottom stems"],
  "recommendedTreatment": ["Mancozeb or Chlorothalonil application", "Organic Neem oil application daily"]
}`
      ];
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        responseMimeType: "application/json"
      }
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("Empty response from AI Vision model");
    }

    const parsedData = JSON.parse(textOutput.trim());
    res.json(parsedData);
  } catch (err: any) {
    handleApiError(res, err, "Failed to analyze crop photo");
  }
});

// API Route: Kisan Assistant Chatbot
app.post("/api/chatbot", async (req, res) => {
  try {
    const { message, history, language } = req.body;
    const ai = getAiClient();

    // Compile history for context
    const compiledHistory = history && Array.isArray(history) 
      ? history.map((h: any) => `${h.sender === "user" ? "Farmer" : "Assistant"}: ${h.text}`).join("\n") 
      : "";

    const promptText = `You are a respectful, wise and highly direct Agricultural Expert (known as Kisan Mitra / రైతు స్నేహితుడు).
Farmers are often low literacy; explain instructions in large, actionable steps in bullet points.
Support the conversational context.

Farmer Language preferred: ${language || "English"}.
Farmer's new question: ${message}

Historical conversation context for reference:
${compiledHistory}

Respond in the selected language (${language || "English"}). Help them with exact, non-generic agricultural wisdom. Keep text extremely encouraging.
Generate a structured response text suitable for mobile screen viewing.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptText,
    });

    res.json({
      text: response.text || "I am processing. Please try again in a bit!"
    });
  } catch (err: any) {
    handleApiError(res, err, "Failed to consult Kisan Assistant");
  }
});

// API Route: Weather recommendations
app.post("/api/weather-recommendation", async (req, res) => {
  try {
    const { location, language } = req.body;
    const ai = getAiClient();

    const promptText = `Generate a realistic agricultural meteorological brief for: Location: ${location || "Andhra Pradesh / Uttar Pradesh, India"}.
The language of the response recommendations must be: ${language || "English"}.
Format results strictly as a JSON object. Do not use markdown wraps.
{
  "temp": 32,
  "humidity": 70,
  "condition": "Humid and Rain Showers",
  "rainChance": "75%",
  "forecast": [
    { "day": "Tomorrow", "temp": 31, "condition": "Cloudy / Light Rain" },
    { "day": "Day After", "temp": 30, "condition": "Moderate Thunderstorms" },
    { "day": "3rd Day", "temp": 33, "condition": "Sunny Intervals" }
  ],
  "recommendations": [
    "Postpone spray treatments due to expected evening rains.",
    "Ensure drainage channels in chilli and groundnut fields are clear to avoid root rot.",
    "Ideal moisture level for application of urea or organic compost top-dressing."
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptText,
      config: { responseMimeType: "application/json" }
    });

    const parsedData = JSON.parse((response.text || "{}").trim());
    res.json(parsedData);
  } catch (err: any) {
    handleApiError(res, err, "Failed to fetch weather agriculture sops");
  }
});

// Start server block
async function boot() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting Express server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting Express server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AgriConnect AI Full-stack server actively listening on: http://localhost:${PORT}`);
  });
}

boot();
