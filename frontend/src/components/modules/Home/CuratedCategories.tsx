"use client";

import { useEffect, useState } from "react";
import FoodItem, { FoodItemProps } from "./FoodItem";
import AddToCartDialog from "../cart/AddToCartDialog";
import { useCartStore } from "@/store/useCartStore";
import { IMenuItem } from "../menuItem/menuItemsColumn";
import { getUserInfo, UserInfo } from "@/services/auth/getUserInfo";
import { LoginPromptModal } from "@/components/shared/LoginPromptDialog";

const CATEGORIES = [
  { id: "starters", label: "Starters", icon: "🍽️" },
  { id: "mains", label: "Main Courses", icon: "👨‍🍳" },
  { id: "desserts", label: "Desserts", icon: "🍰" },
];

export default function CuratedCategories({ items }: { items: IMenuItem[] }) {
  if (!items) return null;
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].label);
  const [quantity, setQuantity] = useState(1);
  const [currentItem, setCurrentItem] = useState<IMenuItem | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const filteredItems = items.filter(
    (item) => item.category.name === activeCategory,
  );

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  useEffect(() => {
    async function fetchInfo() {
      const info = await getUserInfo();
      setUserInfo(info);
    }
    fetchInfo();
  }, []);

  const handleCurrentItem = (item: IMenuItem) => {
    if (!userInfo?.email) {
      setLoginOpen(true);
      return;
    }
    setCurrentItem(item);
  };

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

  return (
    <section className="max-w-360 mx-auto px-6 md:px-12 pb-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#13322B] font-serif mb-4">
          Curated Categories
        </h2>
        <p className="text-gray-600">
          Explore our diverse menu of culinary delights.
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-16 flex-wrap">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.label;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.label)}
              className={`flex flex-col items-center justify-center w-32 h-32 rounded-3xl transition-all ${
                isActive
                  ? "bg-[#FFF9F0] shadow-md scale-105"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-500"
              }`}
            >
              <div className="w-12 h-12 bg-[#13322B] rounded-full flex items-center justify-center text-xl mb-3 shadow-lg">
                {cat.icon}
              </div>
              <span
                className={`font-semibold ${isActive ? "text-[#13322B]" : ""}`}
              >
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 gap-y-10">
        {filteredItems.map((item) => (
          <FoodItem
            key={item.id}
            item={item}
            setCurrentItem={handleCurrentItem}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center text-gray-500 w-full py-10">
          No items found in this category right now. Check back later!
        </div>
      )}

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
    </section>
  );
}
