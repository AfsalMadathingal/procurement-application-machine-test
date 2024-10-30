import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 w-screen h-screen">
      <h1 className="text-6xl font-bold text-white">
        Welcome to Inventory App
      </h1>
      <p className="text-2xl text-white">
        A simple inventory management system built with React, Tailwind CSS and
        Node.js
      </p>
    </div>
  );
};

export default Home;
