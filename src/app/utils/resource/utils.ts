// ----------------------
// Register Fields Config
// ----------------------
import { APP_ROUTES } from "@/app/constants/routes";
import { RegisterFormInputs } from "@/app/schemas/registerSchema";
export const registerFields: {
  name: keyof RegisterFormInputs;
  label: string;
  placeholder: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  variant?: any;
  component?: "Input" | "PhoneInput";
}[] = [
  { name: "firstName", label: "First Name", placeholder: "Enter first name" },
  { name: "lastName", label: "Last Name", placeholder: "Enter last name" },
  { name: "companyName", label: "Company", placeholder: "Enter company name" },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    variant: "email",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    component: "PhoneInput",
  },
  {
    name: "message",
    label: "Message",
    placeholder: "Enter your message",
  },
];

// ----------------------
// CARDS Fields Config
// ----------------------

import {
  FileLock2,
  Handshake,
  LayoutDashboard,
  MonitorCog,
  TabletSmartphone,
  Tag,
} from "lucide-react";

export const smartCards = [
  {
    title: "Onboarding",
    description:
      "Get started with Assistant Tech right away. Let us guide you through our onboarding process.",
    icon: LayoutDashboard,
    redirectTo: APP_ROUTES.PUBLIC.ONBOARDING,
  },
  {
    title: "Subscription Plans",
    description:
      "Explore our flexible subscription options to find the perfect plan for your needs. Try out our 14-days free trial to know more.",
    icon: Tag,
  },
  {
    title: "Updates",
    description:
      "Always stay informed with the latest platform enhancements and feature releases of all our products.",
    icon: MonitorCog,
  },
  {
    title: "Mobile Application",
    description:
      "Download our app for seamless access on the go. Stay connected with your team and customers, at all time.",
    icon: TabletSmartphone,
  },
  {
    title: "Terms & Condition",
    description:
      "Learn about our terms of service and our commitment to data security and user privacy.",
    icon: Handshake,
  },
  {
    title: "Privacy Policy",
    description:
      "Our privacy policy ensures that your personal information is protected and used responsibly.",
    icon: FileLock2,
  },
];
