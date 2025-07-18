"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect, useRouter } from "next/navigation";
import { uploadDb } from "@/actions/backend";
const ResumeAnalyzer = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.clear();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Data Coming From Backend...", data);
      const analysis = data.analysis;
      if (!analysis) {
        throw new Error("No analysis in response");
      }
      const dbSchemaId = await uploadDb(analysis);
      console.log("Successfully uploaded in DB....", dbSchemaId);
      router.push(`/analysis-resume/${dbSchemaId}`);
      setLoading(false);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };
  return (
    <div>
      <Card className="w-full max-w-sm h-[340px] bg-black text-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">
            Resume Analysis Using AI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Provides AI-powered resume insights highlighting key improvement
            areas.
          </p>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit}>
            <Input
              type="file"
              id="resume-upload"
              name="resume"
              accept=".pdf,.doc,.docx"
              required
            />
            <Button type="submit" className="bg-blue-700 w-full">
              {loading ? "Analyzing " : "Upload Your Resume"}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};
export default ResumeAnalyzer;
