import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Home, ArrowLeft } from "lucide-react"; // Optional: Using Lucide icons

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        {/* Visual Element */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <h1 className="text-9xl font-black text-black-100">404</h1>
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          We can't find the course you're looking for.
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          The link might be broken, or the lesson has been moved to a new
          curriculum. Let's get you back on track.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          <Link
            to="/home"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
          >
            <Home size={18} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};
