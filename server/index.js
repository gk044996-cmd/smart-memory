import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getNextQuestion } from "./fallbacks.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 Check API key
if (!process.env.GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY missing in .env");
    process.exit(1);
}

console.log("KEY LOADED:", process.env.GEMINI_API_KEY ? "YES" : "NO");

// 🔥 Init Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ USE SAFE MODEL (this works reliably)
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash"
});

// ✅ TEST ROUTE
app.get("/", (req, res) => {
    res.send("Server working ✅");
});

app.post("/generate-question", async (req, res) => {
    try {
        const topics = ["Present Simple", "Past Continuous", "Present Perfect", "Future Simple", "Conditionals (1st, 2nd, or 3rd)", "Passive Voice", "Articles (A, An, The)", "Prepositions of Time/Place", "Relative Clauses", "Modal Verbs", "Gerund vs Infinitive", "Subject-Verb Agreement", "Phrasal Verbs", "Causative Verbs"];
        const difficulties = ["Beginner", "Intermediate", "Advanced"];
        
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        const randomDiff = difficulties[Math.floor(Math.random() * difficulties.length)];
        // Extremely robust random seed to enforce uniqueness
        const randomSeed = Math.floor(Math.random() * 999999999) + Date.now();

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: `You are an elite, rigorously accurate Cambridge English Professor. Generate exactly ONE highly unique, creative, and completely originally-written English grammar MCQ about ${randomTopic} at the ${randomDiff} difficulty level. 

CRITICAL INSTRUCTIONS:
1. The question and context MUST be extremely unique and varied. Do NOT use generic sentences (like "John goes to school"). Base it on interesting, rare, or humorous real-world scenarios. (Random Seed: ${randomSeed})
2. Ensure 100% absolute grammatical correctness.
3. Precisely ONE option must be definitively correct. The distractors must be clearly wrong but realistically tempting.
4. The explanation must simply and definitively explain the exact grammatical rule that proves the answer 100% correct.

Return ONLY pure JSON (no explanation, no markdown). Do not use the exact same questions you generated before:
{
  "question": "string",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "answer": "exact correct option string",
  "explanation": "A simple but thorough 2-sentence explanation of why the correct answer is 100% right."
}` }]}],
            generationConfig: {
                temperature: 1.0, // Maximum creativity to ensure uniqueness
                topP: 0.95
            }
        });

        let text = result.response.text();
        console.log("RAW AI RESPONSE:", text);

        text = text.replace(/```json|```/g, "").trim();

        let parsed;
        try {
            parsed = JSON.parse(text);
        } catch (parseErr) {
            console.error("❌ JSON PARSE ERROR:", text);
            throw new Error("Invalid JSON returned from Google Gemini AI.");
        }

        res.json(parsed);

    } catch (err) {
        console.error("🔥 SERVER ERROR/FALLBACK TRIGGERED:", err.message);
        
        // As requested by user: fallback to a pool of 450+ heavily generated permutations
        const offlineQ = getNextQuestion();
        res.json(offlineQ);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
);