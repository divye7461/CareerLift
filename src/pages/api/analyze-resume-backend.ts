import type { NextApiRequest, NextApiResponse } from "next";
import pdfParse from "pdf-parse";
import axios from "axios";
import { analyseResume } from "@/actions/backend";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { fileUrl } = req.body;

  if (!fileUrl) {
    return res.status(400).json({ error: "Missing file URL" });
  }

  try {
    const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
    const parsed = await pdfParse(response.data);
    const analysed = await analyseResume(parsed.text);
    res.status(200).json({ analysis: analysed });
  } catch (err: any) {
    console.error("Resume analysis failed:", err);
    res.status(500).json({
      error: "Resume analysis failed",
      details: err?.message || err.toString(),
    });
  }
}
