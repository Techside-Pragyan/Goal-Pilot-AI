const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const breakdownGoal = async (goalTitle, goalDescription) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are an expert life coach and productivity consultant. 
    A user wants to achieve this 5-year goal: "${goalTitle}".
    Description: "${goalDescription}"

    Please break this down into a structured roadmap using the following JSON format:
    {
      "yearlyRoadmap": [
        { "year": 1, "title": "Year 1 Theme", "milestones": ["milestone 1", "milestone 2"] },
        ... for 5 years
      ],
      "firstMonthBreakdown": [
        { "week": 1, "target": "Target for week 1", "tasks": ["task 1", "task 2"] },
        ... for 4 weeks
      ],
      "aiReasoning": "Your advice on why this path was chosen"
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // Clean JSON if necessary (sometimes AI adds markdown)
    const jsonStr = text.replace(/```json|```/g, "").trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("AI Goal Breakdown Error:", error);
    throw new Error("Failed to generate goal roadmap");
  }
};

const chatWithCoach = async (userMessage, context) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are an AI Life Coach. 
    User Context:
    - Current Goals: ${JSON.stringify(context.goals)}
    - Recent Progress: ${JSON.stringify(context.progress)}
    
    User says: "${userMessage}"
    
    Provide a supportive, insightful, and actionable response. Keep it concise but impactful.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Coach Chat Error:", error);
    throw new Error("Failed to get coaching advice");
  }
};

module.exports = {
  breakdownGoal,
  chatWithCoach
};
