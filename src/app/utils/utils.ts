import {
  MessageSquare,
  Database,
  Users,
  BookOpen,
  HelpCircle,
  BarChart3,
  FileText,
} from "lucide-react";
import { APP_ROUTES } from "@/app/constants/routes";

export interface DropdownItem {
  name: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface NavigationItem {
  name: string;
  href?: string;
  dropdown?: DropdownItem[];
}

export const navigation: NavigationItem[] = [
  {
    name: "Products",
    dropdown: [
      {
        name: "CRM",
        href: "/products/crm",
        description: "Customer relationship management",
        icon: Users,
      },
      {
        name: "Chatbot",
        href: "/products/chatbot",
        description: "AI-powered customer support",
        icon: MessageSquare,
      },
      {
        name: "Analytics",
        href: "/products/analytics",
        description: "Business intelligence platform",
        icon: BarChart3,
      },
      {
        name: "Database",
        href: "/products/database",
        description: "Secure data management",
        icon: Database,
      },
    ],
  },
  {
    name: "Resources",
    dropdown: [
      {
        name: "Documentation",
        href: "/resources/docs",
        description: "API docs and guides",
        icon: BookOpen,
      },
      {
        name: "Help Center",
        href: "/resources/help",
        description: "Get support and answers",
        icon: HelpCircle,
      },
      {
        name: "Blog",
        href: "/resources/blog",
        description: "Latest news and insights",
        icon: FileText,
      },
    ],
  },
  { name: "Contact", href: APP_ROUTES.PUBLIC.CONTACT },
  { name: "Pricing", href: APP_ROUTES.PUBLIC.PRICING },
];
