const express = require('express'); 
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');

dotenv.config();

router.post('/', async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) {
    return res.status(400).json({ error: "Please provide a prompt to get results" });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const promptText = `Make me an itinerary for the place ${prompt}. Tell me about the best places to visit, best experiences to have and also the best locations and hotels. Write an itinerary for 3-4 days within a few lines`;

    const result = await model.generateContent(promptText);
    const text = result.response.text(); // ✅ Extract clean result

    return res.status(200).json({ result: text }); // ✅ Only send text
  } catch (error) {
    console.error("Gemini Error:", error);
    return res.status(500).json({
      message: "Error generating itinerary",
      error: error.message,
    });
  }
});

module.exports = router;
