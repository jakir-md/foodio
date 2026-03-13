"use client";

import { useState } from "react";
import FoodItem, { FoodItemProps } from "./FoodItem";

const CATEGORIES = ["All", "Starters", "Main Courses", "Desserts"];

const DUMMY_MENU: FoodItemProps[] = [
  {
    id: "1",
    name: "Golden Crunch Bites",
    description: "Jumbo scallops with cauliflower purée and truffle oil.",
    price: 15.0,
    category: "Starters",
    imageUrl: "https://i.ibb.co/SwLSq3rg/red.png",
  },
  {
    id: "2",
    name: "Mediterranean Olive Medley",
    description: "Jumbo scallops with cauliflower purée and truffle oil.",
    price: 15.0,
    category: "Starters",
    imageUrl: "https://i.ibb.co/SwLSq3rg/red.png",
  },
  {
    id: "3",
    name: "Citrus Swirl Delights",
    description: "Jumbo scallops with cauliflower purée and truffle oil.",
    price: 15.0,
    category: "Desserts",
    imageUrl: "https://i.ibb.co/SwLSq3rg/red.png",
  },
  {
    id: "4",
    name: "Creamy Garlic Shrimp Pasta",
    description: "Jumbo scallops with cauliflower purée and truffle oil.",
    price: 15.0,
    category: "Main Courses",
    imageUrl: "https://i.ibb.co/SwLSq3rg/red.png",
  },
  {
    id: "5",
    name: "Herb-Roasted Chicken Bowl",
    description: "Jumbo scallops with cauliflower purée and truffle oil.",
    price: 15.0,
    category: "Main Courses",
    imageUrl: "https://i.ibb.co/SwLSq3rg/red.png",
  },
  {
    id: "6",
    name: "Crispy Fire Bites",
    description: "Jumbo scallops with cauliflower purée and truffle oil.",
    price: 15.0,
    category: "Starters",
    imageUrl: "https://i.ibb.co/SwLSq3rg/red.png",
  },
  {
    id: "7",
    name: "Pan-Seared Scallops",
    description: "Jumbo scallops with cauliflower purée and truffle oil.",
    price: 15.0,
    category: "Main Courses",
    imageUrl: "https://i.ibb.co/SwLSq3rg/red.png",
  },
  {
    id: "8",
    name: "Pan-Seared Scallops",
    description: "Jumbo scallops with cauliflower purée and truffle oil.",
    price: 15.0,
    category: "Main Courses",
    imageUrl: "https://i.ibb.co/SwLSq3rg/red.png",
  },
];

export default function FoodMenu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMenu = DUMMY_MENU.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="max-w-360 mx-auto px-6 md:px-12 pt-32 pb-24 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#13322B] font-serif mb-4">
          Our Menu
        </h1>
        <p className="text-gray-600">
          Discover our selection of premium dishes, crafted with passion.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-20">
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-colors border ${
                activeCategory === cat
                  ? "bg-[#13322B] text-white border-[#13322B]"
                  : "bg-transparent text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-72">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-11 pr-4 text-sm outline-none focus:border-[#13322B] focus:ring-1 focus:ring-[#13322B] transition-all"
            />
          </div>

          <button className="flex items-center gap-2 bg-[#13322B] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#1a453b] transition-colors shrink-0">
            Sort
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-24">
        {filteredMenu.map((item) => (
          <FoodItem key={item.id} item={item} />
        ))}
      </div>

      {filteredMenu.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No items found matching your search.
        </div>
      )}
    </main>
  );
}
