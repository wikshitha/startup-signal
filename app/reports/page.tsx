"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get("/api/reports/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReports(res.data);
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">My Validation Reports</h1>

      <div className="grid gap-5">
        {reports.map((report) => (
          <div key={report.id} className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold">
              {report.startupIdea.title}
            </h2>

            <p className="text-gray-500 mb-3">
              {report.startupIdea.problem}
            </p>

            <p><b>Score:</b> {report.score}/100</p>
            <p><b>Market Demand:</b> {report.marketDemand}</p>
            <p><b>Competition:</b> {report.competitionLevel}</p>
            <p><b>Revenue:</b> {report.revenuePotential}</p>
            <p><b>Risk:</b> {report.riskLevel}</p>

            <p className="mt-3">
              <b>Recommendation:</b> {report.recommendation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}