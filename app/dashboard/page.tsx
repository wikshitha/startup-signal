"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">StartupSignal Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Total Ideas</h2>
          <p className="text-3xl font-bold">View Reports</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">AI Validation</h2>
          <p className="text-3xl font-bold">Ready</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Project Status</h2>
          <p className="text-3xl font-bold">MVP</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Link href="/validate" className="bg-black text-white px-6 py-3 rounded">
          Validate New Idea
        </Link>

        <Link href="/reports" className="bg-white border px-6 py-3 rounded">
          View Reports
        </Link>
      </div>
    </div>
  );
}