import type { NextApiRequest, NextApiResponse } from "next";
import pdfParse from "pdf-parse";
import formidable from "formidable";
import fs from "fs";
import { promisify } from "util";
import { analyseResume } from "@/actions/backend";
export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = promisify(fs.readFile);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = formidable({
    keepExtensions: true,
    uploadDir: "./tmp",
    multiples: false,
  });

  form.parse(req, async (err, fields, files) => {
    console.log("FILES:", files);
    if (err) {
      return res.status(500).json({ error: "Form parse error." });
    }

    const fileArray = files.resume as formidable.File[]; // Ensure it's treated as array
const file = Array.isArray(fileArray) ? fileArray[0] : fileArray;

if (!file?.filepath) {
  console.error("🟥 Filepath is undefined.");
  return res.status(400).json({ error: "Invalid file uploaded." });
}
    if (!file) {
      return res.status(400).json({ error: "Resume file is missing." });
    }

    try {
      const buffer = await readFile(file.filepath);
      const parsed = await pdfParse(buffer);
      const resume_text=parsed.text;
      const analysed=await analyseResume(resume_text);
      return res.status(200).json({
        success: true,
        analysis: analysed,
      });
    } catch (error) {
      console.error("Upload error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
}
