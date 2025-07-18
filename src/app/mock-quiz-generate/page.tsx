"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { generateQuestions } from "@/actions/backend";

const Mock_Quiz_Generate = () => {
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<number | null>(null);

  // Mock questions for demo
  const mockQuestions = [
    {
      question: "What is the output of console.log(typeof null) in JavaScript?",
      options: ["null", "undefined", "object", "boolean"],
      answer: "object",
    },
    {
      question: "Which CSS property is used to create rounded corners?",
      options: [
        "border-radius",
        "corner-radius",
        "border-round",
        "corner-round",
      ],
      answer: "border-radius",
    },
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Home Tool Markup Language",
        "Hyperlink and Text Markup Language",
      ],
      answer: "Hyper Text Markup Language",
    },
  ];

  const addSkill = () => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setSkill("");
    }
  };

  const removeSkill = (s: string) => {
    setSkills(skills.filter((skill) => skill !== s));
  };

  const generateQuiz = async () => {
    setIsLoading(true);
    try {
      // Simulate API call with mock data
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const questions = await generateQuestions(skills);
      setQuestions(questions);
      setScore(null);
      setUserAnswers({});
    } catch (error) {
      console.error("Error generating quiz", error);
    } finally {
      setIsLoading(false);
    }
  };

  const evaluateQuiz = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) {
        correct += 1;
      }
    });
    setScore(correct);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-10 w-96 h-96 bg-gradient-to-br from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-10 left-1/2 w-80 h-80 bg-gradient-to-br from-emerald-500/15 to-teal-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Glass Morphism Container */}
      <div className="relative z-10 max-w-4xl mx-auto p-8">
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-2xl p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Quiz Generator
            </h1>
            <p className="text-xl text-white/80">
              Create personalized quizzes to test your skills
            </p>
          </div>

          {/* Skill Input Section */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Input
                  placeholder="Enter a skill (e.g. JavaScript, React, CSS)"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  className="bg-white/10 border-white/30 text-white placeholder-white/60 rounded-xl text-lg p-4 backdrop-blur-sm focus:bg-white/20 focus:border-cyan-400 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur-sm -z-10"></div>
              </div>
              <Button
                onClick={addSkill}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Add Skill
              </Button>
            </div>

            {/* Skills Display */}
            {skills.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white/90">
                  Selected Skills:
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {skills.map((s) => (
                    <Badge
                      key={s}
                      className="cursor-pointer bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      onClick={() => removeSkill(s)}
                    >
                      {s} ×
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Generate Quiz Button */}
            <div className="text-center">
              <Button
                onClick={generateQuiz}
                disabled={skills.length === 0 || isLoading}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-gray-500 disabled:to-gray-600 text-white px-12 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Generating Quiz...
                  </div>
                ) : (
                  "Generate Quiz"
                )}
              </Button>
            </div>
          </div>

          {/* Quiz Questions */}
          {questions.length > 0 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Quiz Questions
                </h2>
              </div>

              <div className="space-y-6">
                {questions.map((q, idx) => (
                  <div
                    key={idx}
                    className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/15"
                  >
                    <div className="space-y-4">
                      <p className="text-xl font-semibold text-white mb-4">
                        <span className="inline-block w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-center text-sm font-bold mr-3 leading-8">
                          {idx + 1}
                        </span>
                        {q.question}
                      </p>

                      <div className="space-y-3">
                        {q.options.map((opt: string, i: number) => {
                          const isSelected = userAnswers[idx] === opt;
                          const isCorrect = score !== null && opt === q.answer;
                          const isWrong =
                            score !== null && isSelected && opt !== q.answer;

                          return (
                            <div key={i} className="relative">
                              <label
                                className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                                  isCorrect
                                    ? "bg-green-500/30 border-green-400 border-2"
                                    : isWrong
                                    ? "bg-red-500/30 border-red-400 border-2"
                                    : isSelected
                                    ? "bg-cyan-500/30 border-cyan-400 border-2"
                                    : "bg-white/5 border-white/20 border hover:bg-white/10 hover:border-white/40"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={`q${idx}`}
                                  checked={isSelected}
                                  onChange={() =>
                                    setUserAnswers((prev) => ({
                                      ...prev,
                                      [idx]: opt,
                                    }))
                                  }
                                  className="sr-only"
                                />
                                <div
                                  className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-300 ${
                                    isSelected
                                      ? "border-cyan-400 bg-cyan-500"
                                      : "border-white/40"
                                  }`}
                                >
                                  {isSelected && (
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                  )}
                                </div>
                                <span className="text-white font-medium text-lg">
                                  {opt}
                                </span>
                                {isCorrect && (
                                  <span className="ml-auto text-green-400 text-xl">
                                    ✅
                                  </span>
                                )}
                                {isWrong && (
                                  <span className="ml-auto text-red-400 text-xl">
                                    ❌
                                  </span>
                                )}
                              </label>
                            </div>
                          );
                        })}
                      </div>

                      {score !== null && userAnswers[idx] !== q.answer && (
                        <div className="mt-4 p-4 bg-red-500/20 border border-red-400/50 rounded-xl">
                          <p className="text-red-300 font-medium">
                            Correct answer:{" "}
                            <span className="text-white font-bold">
                              {q.answer}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  onClick={evaluateQuiz}
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Submit Quiz
                </Button>
              </div>

              {/* Score Display */}
              {score !== null && (
                <div className="text-center">
                  <div className="backdrop-blur-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-400/50 p-8 shadow-xl">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Quiz Complete!
                    </h3>
                    <p className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                      {score} / {questions.length}
                    </p>
                    <p className="text-lg text-white/80 mt-2">
                      {score === questions.length
                        ? "Perfect score! 🎉"
                        : score >= questions.length * 0.7
                        ? "Great job! 👏"
                        : "Keep practicing! 💪"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mock_Quiz_Generate;
