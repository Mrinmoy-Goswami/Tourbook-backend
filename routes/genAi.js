const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');

dotenv.config();

// Initialize GoogleGenerativeAI with the API key
// Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";
router.post('/',async(req,res)=>{
     const prompt = req.body.prompt;
     if(!prompt){
        res.status(400).json("Please provide a prompt to get results")
     }
    try {
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const promptText = `Make me an ititnerary for the place ${prompt}. Tell me about the best places to visit, best experiences to have and also the best locations and hotels. Write an itinerary for 3-4 days within a few lines`;

const result = await model.generateContent(promptText);
res.status(200).json(result)
    } catch (error) {
        res.status(400).json({message:"Some error occured"},error)
    }
})

// console.log(result.response.text());

module.exports = router;
