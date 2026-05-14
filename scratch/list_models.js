const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  try {
    // There isn't a direct listModels in the simple genAI object in some versions of the SDK, 
    // but we can try to use a model that is likely to exist.
    console.log("Testing gemini-1.5-pro...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent("Hi");
    console.log("gemini-1.5-pro works!");
  } catch (error) {
    console.error("gemini-1.5-pro error:", error.message);
  }

  try {
    console.log("Testing gemini-pro...");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Hi");
    console.log("gemini-pro works!");
  } catch (error) {
    console.error("gemini-pro error:", error.message);
  }
}

listModels();
