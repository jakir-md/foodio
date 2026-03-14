import MenuItemPage from "@/components/modules/menuItem/MenuItemPage";
import { getAllCategories } from "@/services/category/category.service";
import { getAllMenu } from "@/services/menu/menu.service";

export default async function MenuItems() {
  const menuItems = await getAllMenu();
  const categories = await getAllCategories();
  console.log({ categories });
  return (
    <div>
      <MenuItemPage menus={menuItems.data} categories={categories.data} />
    </div>
  );
}
