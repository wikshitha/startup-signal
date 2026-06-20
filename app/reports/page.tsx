"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ReportsPage() {
  const router = useRouter();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("/api/reports/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setReports(res.data);
      } catch (error: any) {
        toast.error("Failed to fetch reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const getScoreColor = (score: number) => {
    return score < 65 ? "text-red-500" : "text-green-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Validation Reports</h1>
            <p className="text-slate-400">Track and review all your startup ideas</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>

        {/* Reports Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <svg className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-slate-300">Loading your reports...</p>
            </div>
          </div>
        ) : reports.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-12 text-center">
            <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-2xl font-bold text-white mb-2">No Reports Yet</h3>
            <p className="text-slate-400 mb-6">Start by validating your first startup idea</p>
            <Link href="/validate" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200 inline-block">
              Validate New Idea
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 mb-8">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-8 hover:border-white/40 transition duration-300"
              >
                {/* Header Section */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {report.startupIdea.title}
                  </h2>
                  <p className="text-slate-400 text-base mb-4">
                    {report.startupIdea.problem}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <p className={`text-5xl font-bold ${getScoreColor(report.score)}`}>
                      {report.score}
                    </p>
                    <p className="text-slate-400">out of 100</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 my-8"></div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-black/20 rounded-lg p-4 border border-white/10">
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">Market Demand</p>
                    <p className="text-white font-semibold text-lg">{report.marketDemand}</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-4 border border-white/10">
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">Competition</p>
                    <p className="text-white font-semibold text-lg">{report.competitionLevel}</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-4 border border-white/10">
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">Revenue Potential</p>
                    <p className="text-white font-semibold text-lg">{report.revenuePotential}</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-4 border border-white/10">
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">Risk Level</p>
                    <p className="text-white font-semibold text-lg">{report.riskLevel}</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 my-8"></div>

                {/* Recommendation */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Strategic Recommendation</h3>
                  <p className="text-slate-300 leading-relaxed text-base">
                    {report.recommendation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Navigation Links */}
        {reports.length > 0 && (
          <div className="flex gap-4">
            <Link
              href="/dashboard"
              className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 text-center"
            >
              Back to Dashboard
            </Link>
            <Link
              href="/validate"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 text-center"
            >
              Validate Another Idea
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}