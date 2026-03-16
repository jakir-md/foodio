"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FoodItem from "./FoodItem";
import { IMenuItem } from "../menuItem/menuItemsColumn";
import AddToCartDialog from "../cart/AddToCartDialog";
import { useCartStore } from "@/store/useCartStore";
import { LoginPromptModal } from "@/components/shared/LoginPromptDialog";
import { getUserInfo, UserInfo } from "@/services/auth/getUserInfo";
import { MenuItemSortPopover } from "./MenuItemSortPopover";
import { useDebounce } from "@/hooks/useDebounce";

export interface ICategory {
  id: string;
  name: string;
}

export default function FoodMenu({
  foodmenu,
  categories,
}: {
  foodmenu: IMenuItem[];
  categories: ICategory[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const debouncedSearch = useDebounce(searchQuery, 500);

  const currentCategoryId = searchParams.get("categoryId");
  const activeCategory = currentCategoryId
    ? categories.find((c) => c.id === currentCategoryId)?.name || "All"
    : "All";

  const [quantity, setQuantity] = useState(1);
  const [currentItem, setCurrentItem] = useState<IMenuItem | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    async function fetchInfo() {
      const info = await getUserInfo();
      setUserInfo(info);
    }
    fetchInfo();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const currentUrlSearch = searchParams.get("search") || "";
    if (debouncedSearch !== currentUrlSearch) {
      if (debouncedSearch) {
        params.set("search", debouncedSearch);
      } else {
        params.delete("search");
      }

      params.set("page", "1");

      startTransition(() => {
        router.push(`?${params.toString()}`);
      });
    }
  }, [debouncedSearch, router, searchParams]);

  const handleCategoryClick = (catName: string, catId?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (catName === "All") {
      params.delete("categoryId");
    } else if (catId) {
      params.set("categoryId", catId);
    }

    params.set("page", "1");

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const addItem = useCartStore((state) => state.addItem);

  const handleModalAddToCart = () => {
    if (!currentItem) return null;
    addItem({
      id: currentItem.id,
      name: currentItem.name,
      price: currentItem.price,
      image: currentItem.image,
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
    setCurrentItem(item);
  };

  const displayCategories = [{ id: "all", name: "All" }, ...categories];

  return (
    <div>
      <main className="max-w-360 mx-auto px-6 md:px-12 pt-25 pb-24 min-h-screen">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#13322B] font-serif mb-4">
            Our Menu
          </h1>
          <p className="text-gray-600">
            Discover our selection of premium dishes, crafted with passion.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
            {displayCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name, cat.id)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-colors border ${
                  activeCategory === cat.name
                    ? "bg-[#13322B] text-white border-[#13322B]"
                    : "bg-transparent text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {cat.name}
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
                disabled={isPending}
                className={`w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-11 pr-4 text-sm outline-none focus:border-[#13322B] focus:ring-1 focus:ring-[#13322B] transition-all ${isPending ? "opacity-70" : ""}`}
              />
            </div>

            <MenuItemSortPopover />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-12 gap-y-10">
          {foodmenu &&
            foodmenu.map((item) => (
              <FoodItem
                key={item.id}
                item={item}
                setCurrentItem={handleCurrentItem}
              />
            ))}
        </div>

        {foodmenu.length === 0 && (
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
