import MenuItemPage from "@/components/modules/menuItem/MenuItemPage";
import { getAllCategories } from "@/services/category/category.service";

export default async function MenuItems() {
  const DUMMY_MENU_ITEMS = [
    {
      id: "1",
      name: "Pan-Seared Scallops",
      category: "Starters",
      price: 24.0,
      isAvailable: true,
    },
    {
      id: "2",
      name: "Mediterranean Olive Medley",
      category: "Starters",
      price: 18.0,
      isAvailable: true,
    },
    {
      id: "3",
      name: "Citrus Swirl Delights",
      category: "Main Courses",
      price: 32.0,
      isAvailable: true,
    },
    {
      id: "4",
      name: "Creamy Garlic Shrimp Pasta",
      category: "Main Courses",
      price: 45.0,
      isAvailable: true,
    },
    {
      id: "5",
      name: "Herb-Roasted Chicken Bowl",
      category: "Desserts",
      price: 16.0,
      isAvailable: true,
    },
  ];
  const DUMMY_CATEGORIES = [
    {
      id: "1",
      name: "Starters",
      isAvailable: true,
    },
    {
      id: "2",
      name: "Main Courses",
      isAvailable: true,
    },
    {
      id: "3",
      name: "Desserts",
      isAvailable: true,
    },
    {
      id: "4",
      name: "Beverages",
      isAvailable: true,
    },
    {
      id: "5",
      name: "Chef's Specials",
      isAvailable: false,
    },
  ];
  const categories = await getAllCategories();
  console.log({ categories });
  return (
    <div>
      <MenuItemPage menus={DUMMY_MENU_ITEMS} categories={categories.data} />
    </div>
  );
}
