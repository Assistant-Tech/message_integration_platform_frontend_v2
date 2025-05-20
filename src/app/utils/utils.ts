import {
  MessageSquare,
  Database,
  Users,
  BookOpen,
  HelpCircle,
  BarChart3,
  FileText,
  FileQuestion,
} from "lucide-react";

// Types for navigation items
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

// Sample navigation data
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
        name: "CRM-1",
        href: "/products/crm",
        description: "Customer relationship management",
        icon: Users,
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
      {
        name: "CRM-2",
        href: "/products/crm",
        description: "Customer relationship management",
        icon: Users,
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
      {
        name: "FAQ",
        href: "/resources/faq",
        description: "For more questionaires",
        icon: FileQuestion,
      },
    ],
  },
  { name: "Contact", href: "/contact" },
  { name: "Pricing", href: "/pricing" },
];
