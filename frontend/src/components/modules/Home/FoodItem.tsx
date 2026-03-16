import { IMenuItem } from "../menuItem/menuItemsColumn";

export interface FoodItemProps {
  item: IMenuItem;
  setCurrentItem: (item: IMenuItem) => void;
}

export default function FoodItem({ item, setCurrentItem }: FoodItemProps) {
  if (!item) return null;
  return (
    <div className="relative pt-16 pl-8 pb-4 w-full mx-auto">
      <div className="relative bg-[#FEF7EA] rounded-4xl w-60 px-4 py-4 pt-20 h-full min-h-70 flex flex-col justify-between shadow-sm">
        <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mb-6 pt-10">
          {" "}
          <h3 className="text-xl font-bold text-[#13322B] leading-tight mb-2">
            {item.name}
          </h3>
          <p className="text-[0.9rem] text-gray-500 leading-relaxed mb-6">
            {item.description}
          </p>
          <p className="text-3xl font-extrabold text-[#13322B] tracking-tight">
            ${item.price.toFixed(2)}
          </p>
        </div>
      </div>

      <button
        onClick={() => setCurrentItem(item)}
        className="absolute hover:cursor-pointer -bottom-3 -right-4 bg-[#13322B] text-white px-6 py-3 rounded-4xl rounded-tr-none hover:bg-[#1a453b] transition-colors flex items-center gap-3 text-base font-medium z-20 shadow-2xl"
      >
        Add to Cart
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </button>
    </div>
  );
}
