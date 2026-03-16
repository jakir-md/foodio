"use client";

import { useEffect, useState } from "react";
import FoodItem from "./FoodItem";
import { IMenuItem } from "../menuItem/menuItemsColumn";
import AddToCartDialog from "../cart/AddToCartDialog";
import { useCartStore } from "@/store/useCartStore";
import { LoginPromptModal } from "@/components/shared/LoginPromptDialog";
import { getUserInfo, UserInfo } from "@/services/auth/getUserInfo";

const CATEGORIES = ["All", "Starters", "Main Courses", "Desserts"];

export default function FoodMenu({ foodmenu }: { foodmenu: IMenuItem[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentItem, setCurrentItem] = useState<IMenuItem | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);

  const filteredMenu = foodmenu.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category.name === activeCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  useEffect(() => {
    async function fetchInfo() {
      const info = await getUserInfo();
      setUserInfo(info);
    }
    fetchInfo();
  }, []);
  const addItem = useCartStore((state) => state.addItem);

  const handleModalAddToCart = () => {
    if (!currentItem) return null;
    addItem({
      id: currentItem!.id,
      name: currentItem!.name,
      price: currentItem!.price,
      image: currentItem!.image,
      quantity: quantity,
    });
    setCurrentItem(null);
    setQuantity(1);
  };

  const handleCurrentItem = (item: IMenuItem) => {
    if (!userInfo?.email) {
      setLoginOpen(true);
      return;
    }
    console.log("item form ", item);
    setCurrentItem(item);
  };

  return (
    <div>
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
          {filteredMenu &&
            filteredMenu.map((item) => (
              <FoodItem
                key={item.id}
                item={item}
                setCurrentItem={handleCurrentItem}
              />
            ))}
        </div>

        {filteredMenu.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No items found matching your search.
          </div>
        )}
      </main>

      <AddToCartDialog
        isOpen={!!currentItem}
        onOpenChange={() => {
          setCurrentItem(null);
          setQuantity(1);
        }}
        quantity={quantity}
        productName={currentItem?.name}
        setQuantity={setQuantity}
        onAddToCart={handleModalAddToCart}
      />

      <LoginPromptModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
      />
    </div>
  );
}
