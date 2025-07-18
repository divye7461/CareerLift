import type { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("⏳ Uploading started...");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const data = await new Promise<Buffer>((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });

  const stream = cloudinary.uploader.upload_stream(
    {
      resource_type: "raw", 
      folder: "resumes",
      type: "upload",
    },
    (error, result) => {
      if (error || !result) {
        console.error("❌ Cloudinary upload error:", error);
        return res.status(500).json({ message: "Upload failed" });
      }

      console.log("✅ Upload success:", result.secure_url);
      return res.status(200).json({ url: result.secure_url });
    }
  );

  Readable.from(data).pipe(stream);
}
