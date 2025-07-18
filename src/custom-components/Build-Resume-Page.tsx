"use client";
import { useState } from "react";
// Using standard HTML input and textarea elements
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Code,
  Trophy,
  Sparkles,
  Database,
  Globe,
  Settings,
  Heart,
  BookOpen,
  Building,
} from "lucide-react";

type Section = {
  name: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  type: "input" | "textarea";
  placeholder: string;
  value: string;
  category: string;
};

const Build_Resume_Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    // College Education
    instituteName: "",
    course: "",
    collegeAggregate: "",
    // 12th Boards
    twelfthInstitute: "",
    twelfthAggregate: "",
    // 10th Boards
    tenthInstitute: "",
    tenthAggregate: "",
    // Experience
    experience: "",
    // Skills
    frontend: "",
    backend: "",
    databases: "",
    ormTools: "",
    softSkills: "",
    coursework: "",
    // Achievements
    achievements: "",
  });

  const generateResume = async () => {
    const response = await fetch("/api/generate-resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      console.error("Failed to generate resume.");
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "resume.pdf";
    link.click();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSections: Section[] = [
    // Personal Information
    {
      name: "name",
      label: "Full Name",
      icon: User,
      type: "input",
      placeholder: "Enter your full name",
      value: formData.name,
      category: "Personal Information",
    },
    {
      name: "email",
      label: "Email Address",
      icon: Mail,
      type: "input",
      placeholder: "your.email@example.com",
      value: formData.email,
      category: "Personal Information",
    },
    {
      name: "phone",
      label: "Contact Number",
      icon: Phone,
      type: "input",
      placeholder: "+1 (555) 123-4567",
      value: formData.phone,
      category: "Personal Information",
    },

    // Education Section
    {
      name: "instituteName",
      label: "College/University Name",
      icon: Building,
      type: "input",
      placeholder: "e.g., XYZ University, ABC College of Engineering",
      value: formData.instituteName,
      category: "Education",
    },
    {
      name: "course",
      label: "Course/Degree",
      icon: GraduationCap,
      type: "input",
      placeholder: "e.g., Bachelor of Technology in Computer Science",
      value: formData.course,
      category: "Education",
    },
    {
      name: "collegeAggregate",
      label: "College Aggregate",
      icon: Trophy,
      type: "input",
      placeholder: "e.g., 8.5000 CGPA or 85.50%",
      value: formData.collegeAggregate,
      category: "Education",
    },
    {
      name: "twelfthInstitute",
      label: "12th Boards Institute",
      icon: Building,
      type: "input",
      placeholder: "e.g., ABC Senior Secondary School",
      value: formData.twelfthInstitute,
      category: "Education",
    },
    {
      name: "twelfthAggregate",
      label: "12th Boards Aggregate",
      icon: Trophy,
      type: "input",
      placeholder: "e.g., 90.50% or 9.0500 CGPA",
      value: formData.twelfthAggregate,
      category: "Education",
    },
    {
      name: "tenthInstitute",
      label: "10th Boards Institute",
      icon: Building,
      type: "input",
      placeholder: "e.g., XYZ High School",
      value: formData.tenthInstitute,
      category: "Education",
    },
    {
      name: "tenthAggregate",
      label: "10th Boards Aggregate",
      icon: Trophy,
      type: "input",
      placeholder: "e.g., 92.00% or 9.2000 CGPA",
      value: formData.tenthAggregate,
      category: "Education",
    },

    // Experience
    {
      name: "experience",
      label: "Professional Experience",
      icon: Briefcase,
      type: "textarea",
      placeholder:
        "Software Engineer | ABC Company | 2024-Present\n• Developed scalable web applications\n• Collaborated with cross-functional teams",
      value: formData.experience,
      category: "Experience",
    },

    // Skills Section
    {
      name: "frontend",
      label: "Frontend Technologies",
      icon: Globe,
      type: "textarea",
      placeholder:
        "e.g., React, Angular, Vue.js, HTML5, CSS3, JavaScript, TypeScript, Bootstrap, Tailwind CSS",
      value: formData.frontend,
      category: "Skills",
    },
    {
      name: "backend",
      label: "Backend Technologies",
      icon: Settings,
      type: "textarea",
      placeholder:
        "e.g., Node.js, Express.js, Django, Flask, Spring Boot, ASP.NET, PHP, Ruby on Rails",
      value: formData.backend,
      category: "Skills",
    },
    {
      name: "databases",
      label: "Databases",
      icon: Database,
      type: "textarea",
      placeholder:
        "e.g., MongoDB, PostgreSQL, MySQL, Redis, SQLite, Oracle, Microsoft SQL Server",
      value: formData.databases,
      category: "Skills",
    },
    {
      name: "ormTools",
      label: "ORM Tools",
      icon: Code,
      type: "textarea",
      placeholder:
        "e.g., Mongoose, Sequelize, Prisma, Hibernate, Entity Framework, SQLAlchemy",
      value: formData.ormTools,
      category: "Skills",
    },
    {
      name: "softSkills",
      label: "Soft Skills",
      icon: Heart,
      type: "textarea",
      placeholder:
        "e.g., Team Leadership, Communication, Problem Solving, Time Management, Adaptability, Critical Thinking",
      value: formData.softSkills,
      category: "Skills",
    },
    {
      name: "coursework",
      label: "Relevant Coursework",
      icon: BookOpen,
      type: "textarea",
      placeholder:
        "e.g., Data Structures & Algorithms, Operating Systems, Database Management, Software Engineering, Computer Networks",
      value: formData.coursework,
      category: "Skills",
    },

    // Achievements
    {
      name: "achievements",
      label: "Key Achievements",
      icon: Trophy,
      type: "textarea",
      placeholder:
        "• Won Best Innovation Award 2024\n• Published 3 research papers\n• Led team of 5 developers",
      value: formData.achievements,
      category: "Achievements",
    },
  ];

  // Group sections by category
  const groupedSections = formSections.reduce(
    (acc: { [key: string]: Section[] }, section: Section) => {
      if (!acc[section.category]) {
        acc[section.category] = [];
      }
      acc[section.category].push(section);
      return acc;
    },
    {} as { [key: string]: Section[] }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-500/20 via-pink-500/20 to-rose-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 py-12 px-4 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              Build Your Dream Resume
            </h1>
            <Sparkles className="w-8 h-8 text-indigo-400 animate-pulse delay-300" />
          </div>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Create a stunning, professional resume that stands out from the
            crowd
          </p>
        </div>

        {/* Form Container */}
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 shadow-2xl">
          <div className="space-y-12">
            {Object.entries(groupedSections).map(([category, sections]) => (
              <div key={category} className="space-y-6">
                {/* Category Header */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                    {category}
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 mx-auto mt-2 rounded-full"></div>
                </div>

                {/* Form Fields */}
                <div className="grid gap-6">
                  {sections.map((section, index) => {
                    const Icon = section.icon;
                    return (
                      <div
                        key={section.name}
                        className="group relative"
                        style={{
                          animationDelay: `${index * 50}ms`,
                        }}
                      >
                        {/* Animated Border */}
                        <div className="absolute inset-0 bg-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:scale-[1.02]">
                          {/* Label with Icon */}
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-indigo-600/20 rounded-lg">
                              <Icon className="w-5 h-5 text-cyan-400" />
                            </div>
                            <label className="text-xl font-semibold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                              {section.label}
                            </label>
                          </div>

                          {/* Input/Textarea */}
                          {section.type === "input" ? (
                            <input
                              type="text"
                              name={section.name}
                              value={section.value}
                              onChange={handleChange}
                              placeholder={section.placeholder}
                              className="w-full bg-slate-900/50 border border-slate-600/50 text-white placeholder:text-slate-400 focus:border-slate-400/50 focus:ring-2 focus:ring-slate-400/20 transition-all duration-300 text-lg py-3 px-4 rounded-xl outline-none"
                            />
                          ) : (
                            <textarea
                              name={section.name}
                              value={section.value}
                              onChange={handleChange}
                              placeholder={section.placeholder}
                              rows={3}
                              className="w-full bg-slate-900/50 border border-slate-600/50 text-white placeholder:text-slate-400 focus:border-slate-400/50 focus:ring-2 focus:ring-slate-400/20 transition-all duration-300 text-lg rounded-xl resize-none p-4 outline-none"
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-12 text-center">
            <button
              className="group relative px-12 py-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-2xl font-bold text-white text-lg shadow-2xl hover:shadow-white/10 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
              onClick={generateResume}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Generate My Resume
                <Sparkles className="w-5 h-5" />
              </span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-slate-400">Crafted with ✨ for your success</p>
        </div>
      </div>
    </div>
  );
};

export default Build_Resume_Page;
