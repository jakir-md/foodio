export const dynamic = 'force-dynamic';
import CuratedCategories from "@/components/modules/Home/CuratedCategories";
import HeroSection from "@/components/shared/HeroSection";
import { getAllMenu } from "@/services/menu/menu.service";

export default async function HomePage() {
  const foodItems = await getAllMenu();
  return (
    <div>
      <HeroSection />
      <CuratedCategories items={foodItems.data} />
    </div>
  );
}
