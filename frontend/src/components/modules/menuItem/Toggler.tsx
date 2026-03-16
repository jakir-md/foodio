"use client";

import { useState } from "react";

interface IMenuTogglerProps {
  handleOnclick: () => void;
  handleToggle: (tab: "categories" | "menuItems") => void;
  activeTab: string;
  title: string;
}

export default function Toggler({
  handleOnclick,
  handleToggle,
  activeTab,
  title,
}: IMenuTogglerProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex bg-[#F3F0E9] rounded-full p-1">
        <button
          onClick={() => handleToggle("menuItems")}
          className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
            activeTab === "menuItems"
              ? "bg-white text-[#13322B] shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Menu Items
        </button>
        <button
          onClick={() => handleToggle("categories")}
          className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
            activeTab === "categories"
              ? "bg-white text-[#13322B] shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Categories
        </button>
      </div>

      <button
        onClick={handleOnclick}
        className="flex items-center gap-2 bg-[#13322B] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#1a453b] transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        {title}
      </button>
    </div>
  );
}
