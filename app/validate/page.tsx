"use client";

import axios from "axios";
import { useState } from "react";

export default function ValidatePage() {
  const [form, setForm] = useState({
    title: "",
    problem: "",
    solution: "",
    targetUsers: "",
  });

  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await axios.post("/api/validate", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setReport(res.data.report);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Validate Startup Idea</h1>

      <form onSubmit={handleValidate} className="bg-white p-6 rounded-xl shadow max-w-2xl">
        <input
          className="w-full border p-3 mb-3 rounded"
          placeholder="Startup Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="w-full border p-3 mb-3 rounded"
          placeholder="Problem"
          onChange={(e) => setForm({ ...form, problem: e.target.value })}
        />

        <textarea
          className="w-full border p-3 mb-3 rounded"
          placeholder="Solution"
          onChange={(e) => setForm({ ...form, solution: e.target.value })}
        />

        <input
          className="w-full border p-3 mb-4 rounded"
          placeholder="Target Users"
          onChange={(e) => setForm({ ...form, targetUsers: e.target.value })}
        />

        <button className="bg-black text-white px-6 py-3 rounded">
          {loading ? "Validating..." : "Validate Idea"}
        </button>
      </form>

      {report && (
        <div className="bg-white p-6 rounded-xl shadow max-w-2xl mt-6">
          <h2 className="text-2xl font-bold mb-4">Validation Report</h2>

          <p><b>Score:</b> {report.score}/100</p>
          <p><b>Market Demand:</b> {report.marketDemand}</p>
          <p><b>Competition:</b> {report.competitionLevel}</p>
          <p><b>Revenue Potential:</b> {report.revenuePotential}</p>
          <p><b>Risk Level:</b> {report.riskLevel}</p>

          <h3 className="font-bold mt-4">Risks</h3>
          <ul className="list-disc ml-6">
            {report.risks?.map((risk: string, index: number) => (
              <li key={index}>{risk}</li>
            ))}
          </ul>

          <h3 className="font-bold mt-4">MVP Features</h3>
          <ul className="list-disc ml-6">
            {report.mvpFeatures?.map((feature: string, index: number) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          <h3 className="font-bold mt-4">Recommendation</h3>
          <p>{report.recommendation}</p>
        </div>
      )}
    </div>
  );
}