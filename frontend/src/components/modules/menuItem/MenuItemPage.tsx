"use client";
import { useState } from "react";
import MenuItemsTable from "./MenuItemsTable";
import { IMenuItem } from "./menuItemsColumn";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import CategoryTable from "./CategoriesTable";
import { ICategory } from "./categoryColumn";

export interface IMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface IMenuItemsProps {
  menus: {
    data: IMenuItem[];
    meta: IMeta;
  };
  categories: ICategory[];
}

export default function MenuItemPage({ menus, categories }: IMenuItemsProps) {
  const [activeTab, setActiveTab] = useState<"menuItems" | "categories">(
    "menuItems",
  );
  return (
    <>
      <ManagementPageHeader title="Menu Items" />
      {activeTab === "menuItems" && menus.data.length > 0 && (
        <MenuItemsTable
          meta={menus.meta}
          menus={menus.data}
          handleToggle={setActiveTab}
          activeTab={activeTab}
          categories={categories}
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
