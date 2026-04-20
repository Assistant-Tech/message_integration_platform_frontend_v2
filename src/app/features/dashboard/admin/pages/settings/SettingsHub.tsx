import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import {
  User,
  Building2,
  Bell,
  Shield,
  CreditCard,
  MessageSquare,
  Plug,
  Users,
  ChevronRight,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { APP_ROUTES } from "@/app/constants/routes";
import { useAuthStore } from "@/app/store/auth.store";
import { getAvatarUrl } from "@/app/utils/avatar";

interface SettingsTile {
  label: string;
  description: string;
  icon: LucideIcon;
  href: string;
  tone: "primary" | "success" | "information" | "secondary" | "warning";
  roles?: string[];
  badge?: string;
}

interface SettingsGroup {
  title: string;
  description: string;
  items: SettingsTile[];
}

const TONE_STYLES: Record<SettingsTile["tone"], { bg: string; text: string }> =
  {
    primary: { bg: "bg-primary/10", text: "text-primary" },
    success: { bg: "bg-success/10", text: "text-success" },
    information: { bg: "bg-information/10", text: "text-information" },
    secondary: { bg: "bg-secondary/10", text: "text-secondary" },
    warning: { bg: "bg-warning/10", text: "text-warning" },
  };

const SETTINGS_GROUPS: SettingsGroup[] = [
  {
    title: "Account",
    description: "Manage your personal account and security preferences.",
    items: [
      {
        label: "My Profile",
        description: "Update your name, email, avatar, and personal details.",
        icon: User,
        href: APP_ROUTES.ADMIN.SETTINGS_PROFILE,
        tone: "primary",
      },
      {
        label: "Security",
        description:
          "Change password, enable two-factor auth, and manage sessions.",
        icon: Shield,
        href: APP_ROUTES.ADMIN.SETTINGS_SECURITY,
        tone: "success",
      },
      {
        label: "Notifications",
        description:
          "Control email, in-app, and browser alerts for activity that matters.",
        icon: Bell,
        href: APP_ROUTES.ADMIN.SETTINGS_NOTIFICATIONS,
        tone: "warning",
      },
    ],
  },
  {
    title: "Workspace",
    description: "Company-wide configuration and billing.",
    items: [
      {
        label: "Company Details",
        description: "Update your company name, logo, address, and tax info.",
        icon: Building2,
        href: APP_ROUTES.ADMIN.SETTINGS_COMPANY,
        tone: "information",
        roles: ["TENANT_ADMIN"],
      },
      {
        label: "Team & Roles",
        description: "Invite members and control who can do what.",
        icon: Users,
        href: APP_ROUTES.ADMIN.SETTINGS_ROLE_MANAGEMENT,
        tone: "primary",
        roles: ["TENANT_ADMIN"],
      },
      {
        label: "Subscription & Billing",
        description: "Review your plan, invoices, and payment methods.",
        icon: CreditCard,
        href: APP_ROUTES.ADMIN.SETTINGS_SUBSCRIPTION,
        tone: "secondary",
        roles: ["TENANT_ADMIN"],
      },
    ],
  },
  {
    title: "Platform",
    description: "Channels, messaging behavior, and integrations.",
    items: [
      {
        label: "Chat Settings",
        description: "Tune auto-replies, business hours, and chat widget.",
        icon: MessageSquare,
        href: APP_ROUTES.ADMIN.SETTINGS_CHAT_SETTINGS,
        tone: "primary",
      },
      {
        label: "Integrations",
        description:
          "Connect Stripe, Shopify, and other tools to power your workflow.",
        icon: Plug,
        href: APP_ROUTES.ADMIN.SETTINGS_INTEGRATION_SETTINGS,
        tone: "information",
        roles: ["TENANT_ADMIN"],
      },
    ],
  },
];

const SettingsHub = () => {
  const { slug } = useParams();
  const { user } = useAuthStore();

  const role = user?.roleType ?? "TENANT_ADMIN";
  const displayName = user?.name || user?.email?.split("@")[0] || "there";
  const basePath = slug
    ? role === "MEMBER"
      ? `/app/${slug}/dashboard`
      : `/app/${slug}/admin`
    : "";

  const resolve = (href: string) =>
    basePath ? `${basePath}/${href}` : `/${href}`;

  const visibleGroups = SETTINGS_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter(
      (item) => !item.roles || item.roles.includes(role),
    ),
  })).filter((group) => group.items.length > 0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col px-4 md:px-6 py-6 min-h-screen max-w-6xl mx-auto w-full"
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="h4-bold-24 text-grey">Settings</h1>
        <p className="label-semi-bold-14 text-primary mt-0.5">Overview</p>
      </div>

      {/* Welcome card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-white to-information/5 p-5 sm:p-6 flex items-center gap-4 sm:gap-5"
      >
        {user ? (
          <img
            src={getAvatarUrl(user.avatar)}
            alt={displayName}
            className="h-14 w-14 sm:h-16 sm:w-16 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
          />
        ) : (
          <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-grey-light/60 flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles
              className="h-4 w-4 text-primary flex-shrink-0"
              strokeWidth={2}
            />
            <p className="label-semi-bold-14 text-primary">
              Welcome back, {displayName}
            </p>
          </div>
          <h2 className="body-bold-16 text-base-black">
            Configure your workspace
          </h2>
          <p className="body-regular-14 text-grey-medium mt-0.5 truncate">
            Manage your profile, company, and platform preferences from one
            place.
          </p>
        </div>
        <Link
          to={resolve(APP_ROUTES.ADMIN.SETTINGS_PROFILE)}
          className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-white px-4 py-2 text-primary label-semi-bold-14 hover:bg-primary hover:text-white transition-all"
        >
          Edit profile
          <ChevronRight className="h-4 w-4" />
        </Link>
      </motion.div>

      {/* Groups */}
      <div className="space-y-10">
        {visibleGroups.map((group, groupIdx) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + groupIdx * 0.08 }}
          >
            <div className="mb-4">
              <h3 className="body-bold-16 text-base-black">{group.title}</h3>
              <p className="body-regular-14 text-grey-medium mt-0.5">
                {group.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.items.map((item, idx) => {
                const Icon = item.icon;
                const tone = TONE_STYLES[item.tone];
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + groupIdx * 0.08 + idx * 0.05 }}
                  >
                    <Link
                      to={resolve(item.href)}
                      className="group block h-full rounded-2xl border border-grey-light/60 bg-white p-5 hover:border-primary/30 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone.bg} ${tone.text} group-hover:scale-105 transition-transform`}
                        >
                          <Icon className="h-5 w-5" strokeWidth={1.8} />
                        </div>
                        <ChevronRight className="h-5 w-5 text-grey-medium/60 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="body-bold-14 text-base-black">
                        {item.label}
                      </p>
                      <p className="body-regular-14 text-grey-medium mt-1.5 leading-[1.5]">
                        {item.description}
                      </p>
                      {item.badge && (
                        <span className="mt-3 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 caption-medium-12 text-primary">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Help footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12 rounded-2xl border border-grey-light/60 bg-grey-light/20 p-5 flex items-start gap-4"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-information/10 text-information flex-shrink-0">
          <MessageSquare className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <div className="flex-1">
          <p className="body-bold-14 text-base-black">Need help?</p>
          <p className="body-regular-14 text-grey-medium mt-0.5">
            Reach our support team at{" "}
            <a
              href="mailto:support@chatblix.com"
              className="text-primary hover:underline"
            >
              support@chatblix.com
            </a>{" "}
            or visit the help center for guides.
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default SettingsHub;
