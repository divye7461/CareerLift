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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useReducer, useState } from "react";
import { handleJobs } from "@/actions/backend";
import { useRouter } from "next/navigation";
const RecommendJobs = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error: ${res.status} - ${text}`);
      }

      const data = await res.json();
      console.log("Extracted resume text:", data.text);
      const jobs = await handleJobs(data.text);
    } catch (err) {
      console.error("Upload failed:", err);
    }
    setLoading(false);

    // localStorage.setItem("recommendedJobs", JSON.stringify(jobs));

    // router.push("/job-recommendations");
  };
  return (
    <div>
      <Card className="w-full max-w-sm h-[340px] bg-black text-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">
            Find Jobs Based On Resume Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Helps you find various opportunities based on your skillset.</p>
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
export default RecommendJobs;
