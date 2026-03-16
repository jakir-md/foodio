export const dynamic = "force-dynamic";
import FoodMenu from "@/components/modules/Home/FoodMenu";
import { getAllCategories } from "@/services/category/category.service";
import { getAllMenu, getAllMenuForUser } from "@/services/menu/menu.service";
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function FoodMenuPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = (params.search as string) || undefined;
  const categoryId = (params.categoryId as string) || undefined;
  const sort = (params.sort as string) || undefined;
  const page = (params.page as string) || "1";
  const limit = (params.limit as string) || "50";
  const queryInfo = {search, categoryId, sort, page, limit};
  const foodmenu = await getAllMenuForUser(queryInfo);
  const allCategories = await getAllCategories();
  return (
    <FoodMenu foodmenu={foodmenu.data || []} categories={allCategories.data} />
  );
}
