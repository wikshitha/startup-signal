import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">StartupSignal</h1>
        <p className="text-xl text-gray-600 mb-8">
          Validate your startup ideas with AI-powered analysis
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-white text-black px-8 py-3 rounded-lg font-semibold border-2 border-black hover:bg-gray-100 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
