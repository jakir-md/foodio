import Image from "next/image";

export type FoodItemProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
};

export default function FoodItem({ item }: { item: FoodItemProps }) {
  return (
    <div className="relative pt-12 w-full max-w-75 mx-auto">
      <div className="relative bg-[#FFF9F0] rounded-4xl p-6 pt-16 h-full min-h-62.5 flex flex-col justify-between shadow-sm">
        <div className="absolute -top-12 left-6 w-32 h-32 rounded-full shadow-xl overflow-hidden bg-white">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#13322B] leading-tight">
            {item.name}
          </h3>
          <p className="text-xs text-gray-500 mt-2 line-clamp-2">
            {item.description}
          </p>
          <p className="text-2xl font-bold text-[#13322B] mt-4">
            ${item.price.toFixed(2)}
          </p>
        </div>
      </div>

      <button className="absolute bottom-0 right-0 bg-[#13322B] text-white px-5 py-3 rounded-tl-2xl rounded-br-4xl hover:bg-[#1a453b] transition-colors flex items-center gap-2 text-sm font-medium shadow-lg shadow-[#13322B]/20">
        Add to Cart
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
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </button>
    </div>
  );
}
