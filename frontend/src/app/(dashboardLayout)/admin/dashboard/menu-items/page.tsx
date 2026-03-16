export const dynamic = "force-dynamic";
import MenuItemPage from "@/components/modules/menuItem/MenuItemPage";
import { getAllCategories } from "@/services/category/category.service";
import { getAllMenu } from "@/services/menu/menu.service";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MenuItems({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = (params?.page as string) || "1";
  const limit = (params?.limit as string) || "10";
  const menuItems = await getAllMenu(page, limit);
  const categories = await getAllCategories();
  return (
    <div>
      <MenuItemPage menus={menuItems} categories={categories.data} />
    </div>
  );
}
