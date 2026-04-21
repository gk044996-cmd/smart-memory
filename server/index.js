import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getNextQuestion } from "./fallbacks.js";

dotenv.config();

const app = express();

// ✅ Allow frontend (update after Netlify deploy)
app.use(cors({
    origin: "*", // later change to your Netlify URL
}));

app.use(express.json());

// 🔥 Check API key (DON’T crash server)
const hasAPI = !!process.env.GEMINI_API_KEY;

if (!hasAPI) {
    console.warn("⚠️ GEMINI_API_KEY missing → Using fallback questions only");
} else {
    console.log("✅ GEMINI KEY LOADED");
}

// 🔥 Init Gemini only if key exists
let model = null;

if (hasAPI) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash"
    });
}

// ✅ ROOT TEST ROUTE
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

// ✅ GENERATE QUESTION
app.post("/generate-question", async (req, res) => {
    try {
        // 👉 If NO API → use fallback directly
        if (!model) {
            console.log("⚡ Using fallback (no API)");
            return res.json(getNextQuestion());
        }

        const topics = [
            "Present Simple", "Past Continuous", "Present Perfect",
            "Future Simple", "Conditionals", "Passive Voice",
            "Articles", "Prepositions", "Relative Clauses",
            "Modal Verbs", "Gerund vs Infinitive",
            "Subject-Verb Agreement", "Phrasal Verbs"
        ];

        const difficulties = ["Beginner", "Intermediate", "Advanced"];

        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        const randomDiff = difficulties[Math.floor(Math.random() * difficulties.length)];
        const randomSeed = Math.floor(Math.random() * 999999999) + Date.now();

        const result = await model.generateContent({
            contents: [{
                role: "user",
                parts: [{
                    text: `Generate ONE unique English grammar MCQ about ${randomTopic} (${randomDiff}).

Return ONLY JSON:
{
  "question": "",
  "options": ["", "", "", ""],
  "answer": "",
  "explanation": ""
}

Seed: ${randomSeed}`
                }]
            }]
        });

        let text = result.response.text();
        text = text.replace(/```json|```/g, "").trim();

        const parsed = JSON.parse(text);
        res.json(parsed);

    } catch (err) {
        console.error("🔥 Error → fallback used:", err.message);
        res.json(getNextQuestion());
    }
});

// ✅ PORT (Render compatible)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});