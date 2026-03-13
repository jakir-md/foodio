import CuratedCategories from "@/components/modules/Home/CuratedCategories";
import HeroSection from "@/components/shared/HeroSection";

const DUMMY_DATA = [
  {
    id: "1",
    name: "Golden Crunch Bites",
    description: "Jumbo scallops with cauliflower purée and truffle oil.",
    price: 15.0,
    category: "starters",
    imageUrl: "https://i.ibb.co/SwLSq3rg/red.png",
  },
  {
    id: "2",
    name: "Mediterranean Olive Medley",
    description: "Jumbo scallops with cauliflower purée and truffle oil.",
    price: 25.0,
    category: "starters",
    imageUrl: "https://i.ibb.co/SwLSq3rg/red.png",
  },
];
export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <CuratedCategories items={DUMMY_DATA} />
    </div>
  );
}
