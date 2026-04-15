import { motion } from "framer-motion";
import { MessageSquare, User, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { cn } from "@/app/utils/cn";

const actions = [
  {
    label: "Go to Inbox",
    description: "View and reply to your assigned conversations",
    icon: MessageSquare,
    href: "conversation",
    color: {
      bg: "bg-primary/10",
      text: "text-primary",
      hover: "hover:border-primary/30",
    },
  },
  {
    label: "My Profile",
    description: "Update your personal details and password",
    icon: User,
    href: "settings/profile",
    color: {
      bg: "bg-secondary-light",
      text: "text-secondary-dark",
      hover: "hover:border-secondary/30",
    },
  },
] as const;

const QuickActions = () => {
  const { slug } = useParams();

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="flex h-full flex-col rounded-2xl border border-grey-light/60 bg-white p-6"
    >
      <h2 className="h4-semi-bold-24 text-grey mb-4">Quick Actions</h2>

      <div className="flex flex-1 flex-col gap-3">
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              to={`/app/${slug}/dashboard/${action.href}`}
            >
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.15 + i * 0.08 }}
                className={cn(
                  "group flex items-center gap-4 rounded-xl border border-grey-light/60 p-4",
                  "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm",
                  action.color.hover,
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                    action.color.bg,
                  )}
                >
                  <Icon
                    className={cn("h-5 w-5", action.color.text)}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="body-semi-bold-16 text-grey">{action.label}</p>
                  <p className="caption-medium-12 text-grey-medium">
                    {action.description}
                  </p>
                </div>

                <ArrowRight className="h-4 w-4 text-grey-medium opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.section>
  );
};

export default QuickActions;
