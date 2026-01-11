import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-xl mt-4">Oops! Page not found.</p>
      <Link
        to="/"
        className="mt-6 bg-primary text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
      >
        Go Back Home
      </Link>
    </div>
  );
}
