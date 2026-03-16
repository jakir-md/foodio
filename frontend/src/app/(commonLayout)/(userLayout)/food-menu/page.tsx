export const dynamic = 'force-dynamic';
import FoodMenu from "@/components/modules/Home/FoodMenu";
import { getAllMenu } from "@/services/menu/menu.service";

export default async function FoodMenuPage() {
  const foodmenu = await getAllMenu();
  return <FoodMenu foodmenu={foodmenu.data || []}/>;
}
