"use server";

import Navbar from "@/custom-components/Navbar";
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
import { handleJobs } from "@/actions/backend";
import RecommendJobs from "@/custom-components/RecommendJobs";
import ResumeAnalyzer from "@/custom-components/ResumeAnalyzer";
import BuildResume from "@/custom-components/BuildResume";
import Mock_Quiz from "@/custom-components/Mock-Quiz";
const Home = () => {
  return (
    <div className="bg-black min-h-screen w-full">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="flex justify-center items-center px-4 py-16 sm:py-24">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Welcome to CareerLift
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-10">
            Elevate Your Career with Smart Resumes, Skill-Based Quizzes &
            AI-Powered Insights.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="flex justify-center items-center px-4 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center">
          Enjoy Our Services
        </h2>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pb-16 place-items-center">
        <Mock_Quiz />

        <ResumeAnalyzer />

        <BuildResume />
      </div>
    </div>
  );
};

export default Home;
