import CuratedCategories from "@/components/modules/Home/CuratedCategories";
import HeroSection from "@/components/shared/HeroSection";
import { getAllMenu } from "@/services/menu/menu.service";

const DUMMY_DATA = [
  {
    id: "1",
    name: "Golden Crunch Bites",
    description: "Jumbo scallops with cauliflower purée and truffle oil.",
    price: 15.0,
    category: "starters",
    image: "https://i.ibb.co/SwLSq3rg/red.png",
  },
  {
    id: "2",
    name: "Mediterranean Olive Medley",
    description: "Jumbo scallops with cauliflower purée and truffle oil.",
    price: 25.0,
    category: "starters",
    image: "https://i.ibb.co/SwLSq3rg/red.png",
  },
];

export default async function HomePage() {
  const foodItems = await getAllMenu();
  return (
    <div>
      <HeroSection />
      <CuratedCategories items={foodItems.data} />
    </div>
  );
}
