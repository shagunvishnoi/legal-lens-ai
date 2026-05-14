const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function listAllModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  // Note: the SDK doesn't expose listModels directly on the genAI object in the same way.
  // We usually have to use the REST API or the Google AI platform SDK.
  // But we can try a fetch to the endpoint.
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Available models:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
}

listAllModels();
