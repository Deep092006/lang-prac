import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// 💬 Initialize Gemini chat model
export const chatModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash", // 🧠 Model version
  maxOutputTokens: 2048,     // 🔢 Max tokens in response
});
