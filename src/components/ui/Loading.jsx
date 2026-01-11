import React, { useState, useEffect } from "react";

const Loading = ({ brandName = "Fastaff" }) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">{brandName}</h1>
      <p className="text-xl mt-4 text-gray-700">Loading{dots}</p>
    </div>
  );
};

export default Loading;
