import { UserRole } from "@/lib/auth-utils";
import { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon; // ✅ Changed from LucideIcon to string
  badge?: string | number;
  description?: string;
  roles: UserRole[];
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}
