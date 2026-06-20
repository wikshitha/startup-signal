"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ValidatePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    problem: "",
    solution: "",
    targetUsers: "",
  });

  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post("/api/validate", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReport(res.data.report);
      toast.success("Validation completed successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Validation failed");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-400";
    if (score >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Validate Your Idea</h1>
            <p className="text-slate-400">Get AI-powered insights on your startup concept</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleValidate} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Startup Title</label>
                <input
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="e.g., AI-powered task management tool"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Problem Statement</label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                  placeholder="What problem does your startup solve?"
                  rows={4}
                  value={form.problem}
                  onChange={(e) => setForm({ ...form, problem: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Your Solution</label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                  placeholder="How does your product solve this problem?"
                  rows={4}
                  value={form.solution}
                  onChange={(e) => setForm({ ...form, solution: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Target Users</label>
                <input
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Who are your primary users?"
                  value={form.targetUsers}
                  onChange={(e) => setForm({ ...form, targetUsers: e.target.value })}
                  required
                />
              </div>

              <button 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2 mt-8"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing Your Idea...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Validate Idea
                  </>
                )}
              </button>
            </form>

            {/* Navigation Links */}
            <div className="flex gap-4 mt-6">
              <Link
                href="/dashboard"
                className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 text-center"
              >
                Back to Dashboard
              </Link>
              <Link
                href="/reports"
                className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 text-center"
              >
                View Reports
              </Link>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-blue-500/10 backdrop-blur-md border border-blue-400/20 rounded-2xl p-6 h-fit">
            <h3 className="text-lg font-bold text-white mb-4">What We Analyze</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex gap-2">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Market Demand</span>
              </li>
              <li className="flex gap-2">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Competition Level</span>
              </li>
              <li className="flex gap-2">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Revenue Potential</span>
              </li>
              <li className="flex gap-2">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Risk Assessment</span>
              </li>
              <li className="flex gap-2">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>MVP Strategy</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Report Section */}
        {report && (
          <div className="mt-12">
            <h2 className="text-4xl font-bold text-white mb-8">Your Validation Report</h2>

            {/* Score Card */}
            <div className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-12 mb-12">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left">
                  <p className="text-slate-300 text-lg font-semibold mb-3 uppercase tracking-wide">Validation Score</p>
                  <p className={`text-8xl font-bold ${report.score < 65 ? 'text-red-500' : 'text-green-500'}`}>{report.score}</p>
                  <p className="text-slate-400 text-lg mt-3">out of 100</p>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  {/* Market Demand */}
                  <div className="bg-black/20 border border-white/10 rounded-xl p-6">
                    <p className="text-slate-400 text-sm font-semibold uppercase tracking-wide mb-2">Market Demand</p>
                    <p className="text-2xl font-bold text-white">{report.marketDemand}</p>
                  </div>
                  {/* Competition */}
                  <div className="bg-black/20 border border-white/10 rounded-xl p-6">
                    <p className="text-slate-400 text-sm font-semibold uppercase tracking-wide mb-2">Competition</p>
                    <p className="text-2xl font-bold text-white">{report.competitionLevel}</p>
                  </div>
                  {/* Revenue Potential */}
                  <div className="bg-black/20 border border-white/10 rounded-xl p-6">
                    <p className="text-slate-400 text-sm font-semibold uppercase tracking-wide mb-2">Revenue Potential</p>
                    <p className="text-2xl font-bold text-white">{report.revenuePotential}</p>
                  </div>
                  {/* Risk Level */}
                  <div className="bg-black/20 border border-white/10 rounded-xl p-6">
                    <p className="text-slate-400 text-sm font-semibold uppercase tracking-wide mb-2">Risk Level</p>
                    <p className="text-2xl font-bold text-white">{report.riskLevel}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Risks and Features */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Risks */}
              <div className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Potential Risks
                </h3>
                <ul className="space-y-3">
                  {report.risks?.map((risk: string, index: number) => (
                    <li key={index} className="text-slate-200 flex gap-3 text-base leading-relaxed">
                      <span className="text-white font-bold text-lg mt-0.5">•</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* MVP Features */}
              <div className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.756a3.066 3.066 0 01-3.062 3.062H7.267a3.066 3.066 0 01-3.062-3.062V6.517a3.066 3.066 0 012.812-3.062zM9 11a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                  </svg>
                  MVP Features
                </h3>
                <ul className="space-y-3">
                  {report.mvpFeatures?.map((feature: string, index: number) => (
                    <li key={index} className="text-slate-200 flex gap-3 text-base leading-relaxed">
                      <span className="text-white font-bold text-lg">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Strategic Recommendation
              </h3>
              <p className="text-slate-200 leading-relaxed text-lg">{report.recommendation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}