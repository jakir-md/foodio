"use client";
import { useState } from "react";
import MenuItemsTable from "./MenuItemsTable";
import { IMenuItem } from "./menuItemsColumn";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import CategoryTable from "./CategoriesTable";
import { ICategory } from "./categoryColumn";

interface IMenuItemsProps {
  menus: IMenuItem[];
  categories: ICategory[];
}

export default function MenuItemPage({ menus, categories }: IMenuItemsProps) {
  const [activeTab, setActiveTab] = useState<"menuItems" | "categories">(
    "menuItems",
  );
  console.log("menu items found", activeTab);
  return (
    <>
      <ManagementPageHeader title="Menu Items" />
      {activeTab === "menuItems" && (
        <MenuItemsTable
          menus={menus}
          handleToggle={setActiveTab}
          activeTab={activeTab}
        />
      )}
      {activeTab === "categories" && (
        <CategoryTable
          menus={categories}
          handleToggle={setActiveTab}
          activeTab={activeTab}
        />
      )}
    </>
  );
}
