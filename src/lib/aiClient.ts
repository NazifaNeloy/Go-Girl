import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

// Initialize the Google Generative AI client
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const gigiAI = genAI ? genAI.getGenerativeModel({ model: "gemini-pro" }) : null;

/**
 * Gigi's personality and instructions.
 */
export const GIGI_CONTEXT = `
You are Gigi, a supportive and energetic AI guide for "Go Girl" - a task and budget management app.
Your tone is encouraging, tech-girly, and helpful. 
You help users manage their goals and finances without being judgmental.
`;

export default gigiAI;
