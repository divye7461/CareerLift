"use server";
import { GoogleGenerativeAI } from "@google/generative-ai"; 
import {uuid, z} from "zod"
import { db } from "@/lib/db_setup";
import { v4 as uuidv4 } from "uuid";
const ResumeAnalysisSchema = z.object({
  suggestions: z.array(z.string()),
  flaws: z.array(z.string()),
  atsScore: z.number().min(0).max(100),
  keyFeatures: z.array(z.string()),
});
const genAI=new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
export async function handleJobs(text:string) {
  try {
    const model=genAI.getGenerativeModel({model:"gemini-2.0-flash"});
    //Prompt:-->
    const prompt=`You are a smart AI career assistant. Given a resume or skills summary, generate 5 relevant job roles along with a short description and required skills.

Resume:
${text}
Output Format:
[
  {
    "title": "Job Title And Organization Name",
    "description": "Short job role summary",
    "required_skills": ["skill1", "skill2", "skill3"],
    "locations":["location 1","location 2","location 3"]
  }
]
`;

const prompt_res=await model.generateContent(prompt);
let response=await prompt_res.response.text();

console.log("Response...",response);
response = response.trim();

// Remove markdown code block wrapper
if (response.startsWith("```")) {
  response = response.replace(/```(?:json)?\s*([\s\S]*?)\s*```/, "$1");
}
try {
    const parsed=JSON.parse(response);
    return parsed;
} catch (error) {
    console.log("Parsing to JSON Failed..",response);
    return [];
}

  } catch (error) {
    console.log("Error in Generating Content AI",error);
    return [];
  }
}

export async function analyseResume(resume_text:string) {
  try {
    const model=genAI.getGenerativeModel({model:"gemini-2.0-flash"});
     const prompt = `
You are an AI resume analyzer. Analyze the given resume and return a JSON with:
- "suggestions": string[] (concrete recommendations)
- "flaws": string[] (negative issues or mistakes)
- "atsScore": number (out of 100)
- "keyFeatures": string[] (main features already present)

Resume Text:
${resume_text}

Respond strictly in this JSON format:
{
  "suggestions": ["...", "..."],
  "flaws": ["...", "..."],
  "atsScore": 0,
  "keyFeatures": ["...", "..."]
}
`;
const prompt_res=await model.generateContent(prompt);
const res_text=prompt_res.response.text();

    const jsonStart = res_text.indexOf("{");
    const jsonEnd = res_text.lastIndexOf("}");
    const jsonString = res_text.slice(jsonStart, jsonEnd + 1);

    const parsed = JSON.parse(jsonString);
    const validated = ResumeAnalysisSchema.parse(parsed);
    // console.log("Validated JSON :- ",validated);
    return validated;
  } catch (error) {
    console.log("Resume Analysis Error...",error);
    return {
      suggestions: [],
  flaws: [],
  atsScore: 0,
  keyFeatures: [],
    };
  }
}
type ResumeAnalysis = {
  suggestions: string[];
  flaws: string[];
  atsScore: number;
  keyFeatures: string[];
};
export async function uploadDb(analysis:ResumeAnalysis) {
  const id=uuidv4();
  const suggestions=analysis.suggestions as string[];
  const flaws=analysis.flaws as string[];
  const ats_score=analysis.atsScore as number;
  const keyFeatures=analysis.keyFeatures as string[]
  const new_resume_analysis=await db.resumeAnalysis.create({
    data:{
      id:id,
      ats_score: ats_score,
      suggestions: suggestions,
      flaws: flaws,
      key_improvements: keyFeatures,
    }
  })
  return new_resume_analysis.id;
}
export type Question = {
  question: string;
  options: string[];
  answer?: string;
};
export async function generateQuestions(skills: string[]): Promise<Question[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
Generate 10 MCQs for the following skills: ${skills.join(", ")}.
Each question should follow this format:

1. <question text>
a. <option1>
b. <option2>
c. <option3>
d. <option4>
Answer: <correct option letter>
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text();

    console.log("Raw Gemini Response for Quiz:", text);

    // Clean and normalize text
    text = text.replace(/```(?:json)?/g, "").replace(/```/g, "").trim();

    // Split questions using numbered format
    const questionBlocks = text.split(/\n\d+\.\s/).filter(Boolean);

    const questions: Question[] = [];

    for (let i = 0; i < questionBlocks.length; i++) {
      const block = questionBlocks[i].trim();
      const lines = block.split("\n").map(line => line.trim()).filter(Boolean);

      const questionText = lines[0];
      const options: string[] = [];

      // Extract options (first 4 lines that start with a, b, c, d)
      for (let line of lines.slice(1)) {
        const match = line.match(/^[abcdABCD][).]?\s*(.*)/);
        if (match) {
          options.push(match[1]);
        }
        if (options.length === 4) break;
      }

      const answerLine = lines.find(line => line.toLowerCase().startsWith("answer"));
      const answerLetter = answerLine?.split(":")[1]?.trim().toLowerCase();
      const answerIndex = ["a", "b", "c", "d"].indexOf(answerLetter ?? "");
      const answer = answerIndex !== -1 ? options[answerIndex] : undefined;

      if (questionText && options.length === 4 && answer) {
        questions.push({
          question: questionText,
          options,
          answer,
        });
      } else {
        console.warn(`⚠️ Skipping malformed question #${i + 1}`, block);
      }
    }

    console.log("Parsed Questions:", questions);
    return questions;
  } catch (error) {
    console.error("Gemini Error in Generating Quiz:", error);
    return [];
  }
}


