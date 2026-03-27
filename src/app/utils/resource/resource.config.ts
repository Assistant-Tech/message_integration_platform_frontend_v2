// ----------------------
// Register Fields Config
// ----------------------
import { APP_ROUTES } from "@/app/constants/routes";
export const registerFields: {
  name: string;
  label: string;
  placeholder: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  variant?: string;
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
  MobileIcon,
  OnboardingIcon,
  PrivacyIcon,
  SubscriptionIcon,
  TermsIcon,
  UpdatesIcon,
} from "@/app/components/icons";

export const smartCards = [
  {
    title: "Onboarding",
    description:
      "Get started with Chatblix right away. Let us guide you through our onboarding process.",
    icon: OnboardingIcon,
    redirectTo: APP_ROUTES.PUBLIC.ONBOARDING,
  },
  {
    title: "Subscription Plans",
    description:
      "Explore our flexible subscription options to find the perfect plan for your needs. Try out our 14-days free trial to know more.",
    icon: SubscriptionIcon,
    redirectTo: APP_ROUTES.ADMIN.SETTINGS_SUBSCRIPTION,
  },
  {
    title: "Updates",
    description:
      "Always stay informed with the latest platform enhancements and feature releases of all our products.",
    icon: UpdatesIcon,
    redirectTo: APP_ROUTES.PUBLIC.UPDATES,
  },
  {
    title: "Mobile Application",
    description:
      "Download our app for seamless access on the go. Stay connected with your team and customers, at all time.",
    icon: MobileIcon,
  },
  {
    title: "Terms & Condition",
    description:
      "Learn about our terms of service and our commitment to data security and user privacy.",
    icon: TermsIcon,
    redirectTo: APP_ROUTES.PUBLIC.TERMSCONDITION,
  },
  {
    title: "Privacy Policy",
    description:
      "Our privacy policy ensures that your personal information is protected and used responsibly.",
    icon: PrivacyIcon,
    redirectTo: APP_ROUTES.PUBLIC.POLICY,
  },
];
// ----------------------
// Terms Fields Config
// ----------------------
export interface TableOfContentsItem {
  id: string;
  title: string;
  level?: number;
}

export interface ContentSectionData {
  id: string;
  title: string;
  level: number;
  content: React.ReactNode;
}

export interface TableOfContentsProps {
  items: TableOfContentsItem[];
  activeSection?: string;
  onSectionClick?: (id: string) => void;
}

export interface ContentSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  level?: number;
}

export interface TermsContentProps {
  content: ContentSectionData[];
}
import React from "react";

export const termsContentData: ContentSectionData[] = [
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    content: React.createElement("div", { className: "space-y-4" }, [
      React.createElement(
        "p",
        {
          key: "1",
          className: "text-grey-meidum leading-relaxed",
        },
        "Fusce volutpat lectus et nisl consectetur finibus. In vitae scelerisque augue, in varius eros. Nunc sapien diam, euismod et pretium id, volutpat et tortor. In vulputate lorem quis dui vestibulum, vitae imperdiet diam bibendum. Maecenas scelerisque orci a dolor vestibulum sagittis.",
      ),
      React.createElement(
        "p",
        {
          key: "2",
          className: "text-grey-meidum leading-relaxed",
        },
        "Curabitur felis eros, vestibulum sed nisl eu, sodales aliquet lacus. Mauris lacinia quam quis feugiat laoreet. Etiam lobortis aliquet euismod. Nunc dictum, sapien at egestas rutrum, dui dui fringilla erat, a commodo augue augue vel magna.",
      ),
    ]),
  },
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    level: 1,
    content: React.createElement("div", { className: "space-y-4" }, [
      React.createElement(
        "p",
        {
          key: "1",
          className: "text-grey-meidum leading-relaxed",
        },
        "Fusce volutpat lectus et nisl consectetur finibus. In vitae scelerisque augue, in varius eros. Nunc sapien diam, euismod et pretium id, volutpat et tortor. In vulputate lorem quis dui vestibulum, vitae imperdiet diam bibendum.",
      ),
      React.createElement(
        "p",
        {
          key: "2",
          className: "text-grey-meidum leading-relaxed",
        },
        "Curabitur felis eros, vestibulum sed nisl eu, sodales aliquet lacus. Mauris lacinia quam quis feugiat laoreet. Etiam lobortis aliquet euismod.",
      ),
    ]),
  },
  {
    id: "user-obligations",
    title: "User Obligations and Responsibilities",
    level: 1,
    content: React.createElement("div", { className: "space-y-4" }, [
      React.createElement(
        "p",
        {
          key: "1",
          className: "text-grey-meidum leading-relaxed",
        },
        "Pellentesque suscipit fringilla libero eu ullamcorper. Cras risus eros, faucibus sit amet augue id, tempus pellentesque eros. In imperdiet tristique tincidunt.",
      ),
      React.createElement(
        "div",
        { key: "2", className: "space-y-2 text-grey" },
        [
          React.createElement(
            "p",
            {
              key: "2-1",
              className: "text-grey-meidum",
            },
            [
              React.createElement(
                "strong",
                { key: "strong1" },
                "Account Security: ",
              ),
              "You are responsible for maintaining the security of your account.",
            ],
          ),
          React.createElement(
            "p",
            {
              key: "2-2",
              className: "text-grey-meidum",
            },
            [
              React.createElement("strong", { key: "strong2" }, "Compliance: "),
              "You must comply with all applicable laws and regulations.",
            ],
          ),
          React.createElement(
            "p",
            {
              key: "2-3",
              className: "text-grey-meidum",
            },
            [
              React.createElement(
                "strong",
                { key: "strong3" },
                "Prohibited Activities: ",
              ),
              "You may not engage in any unlawful or harmful activities.",
            ],
          ),
        ],
      ),
    ]),
  },
  {
    id: "privacy",
    title: "Privacy and Data Protection",
    level: 1,
    content: React.createElement("div", { className: "space-y-4" }, [
      React.createElement(
        "p",
        {
          key: "1",
          className: "text-grey-meidum leading-relaxed",
        },
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      ),
      React.createElement(
        "p",
        {
          key: "2",
          className: "text-grey-meidum leading-relaxed",
        },
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      ),
    ]),
  },
  {
    id: "limitation-liability",
    title: "Limitation of Liability",
    level: 1,
    content: React.createElement("div", { className: "space-y-4" }, [
      React.createElement(
        "p",
        {
          key: "1",
          className: "text-grey-meidum leading-relaxed",
        },
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      ),
      React.createElement(
        "p",
        {
          key: "2",
          className: "text-grey-meidum leading-relaxed",
        },
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ),
    ]),
  },
];

// ----------------------
// Scroll Utils Config
// ----------------------
export const scrollToSection = (
  sectionId: string,
  offset: number = 100,
): void => {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const y = element.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
};

export const getActiveSection = (
  contentIds: string[],
  scrollOffset: number = 150,
): string => {
  const scrollPosition = window.scrollY + scrollOffset;

  for (let i = contentIds.length - 1; i >= 0; i--) {
    const contentId = contentIds[i];
    if (!contentId) continue;

    const element = document.getElementById(contentId);
    if (element && element.offsetTop <= scrollPosition) {
      return contentId;
    }
  }

  return contentIds[0] || "";
};
