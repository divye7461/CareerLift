import { db } from "@/lib/db_setup";
import CircularAtsScore from "@/custom-components/CircularProgressBar";
import AtsScoreGraph from "@/custom-components/ATS-Score-Graph";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import {
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Sparkles,
} from "lucide-react";

interface PageProps {
  params: {
    id: string;
  };
}

const ResumeAnalysisSection = async ({ params }: PageProps) => {
  //Data Fetching

  const { id } = params;
  const data = await db.resumeAnalysis.findUnique({
    where: {
      id: id,
    },
  });

  const suggestions = data?.suggestions;
  const flaws = data?.flaws;
  const key_features = data?.key_improvements;
  const ats_score = data?.ats_score;
  // FrontEnd Section

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-indigo-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-4 mb-4">
            <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
            <h1 className="text-5xl font-bold leading-tight bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
              Resume Analysis Summary
            </h1>
            <Sparkles className="w-8 h-8 text-pink-400 animate-pulse delay-300" />
          </div>

          <p className="text-slate-300 text-xl">
            Comprehensive analysis of your resume performance
          </p>
        </div>

        {/* ATS Score Section */}
        <div className="group relative mb-8">
          <div className="absolute inset-0 bg-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 shadow-2xl hover:transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-purple-400" />
                </div>
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
                  ATS Score
                </h2>
              </div>
              <div className="flex justify-center">
                <CircularAtsScore value={ats_score || 0} />
              </div>
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="group relative mb-8">
          <div className="absolute inset-0 bg-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 shadow-2xl hover:transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
                Key Features
              </h2>
            </div>
            <ul className="space-y-3">
              {key_features?.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-200">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-lg leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Fruitful Suggestions Section */}
        <div className="group relative mb-8">
          <div className="absolute inset-0 bg-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 shadow-2xl hover:transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-teal-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
                Fruitful Suggestions
              </h2>
            </div>
            <ul className="space-y-3">
              {suggestions?.map((suggestion, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-200">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-lg leading-relaxed">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Areas to Improve Section */}
        <div className="group relative mb-8">
          <div className="absolute inset-0 bg-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 shadow-2xl hover:transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-orange-400" />
              </div>
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
                Areas to Improve
              </h2>
            </div>
            <ul className="space-y-3">
              {flaws?.map((flaw, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-200">
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-lg leading-relaxed">{flaw}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ATS Score Overview Section */}
        {ats_score !== undefined && (
          <div className="group relative mb-8">
            <div className="absolute inset-0 bg-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 shadow-2xl hover:transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-purple-400" />
                </div>
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
                  ATS Score Overview
                </h2>
              </div>
              <div className="bg-slate-900/30 rounded-xl p-6 border border-slate-700/50">
                <AtsScoreGraph atsScore={ats_score} />
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-slate-400 text-lg">
            Analysis completed with ✨ precision and care
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalysisSection;
