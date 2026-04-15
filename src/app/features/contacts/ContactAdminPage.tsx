import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  UserPlus,
  Download,
  Users,
  UserCheck,
  UserX,
  Ban,
} from "lucide-react";
import { cn } from "@/app/utils/cn";
import { Button } from "@/app/components/ui";
import PageShell from "@/app/components/layout/PageShell";
import PageHeader from "@/app/components/layout/PageHeader";
import ContactRow from "./ContactRow";
import { MOCK_CONTACTS } from "./constants";
import { useContactsQuery } from "@/app/hooks/query/useContactQuery";
import { formatRelativeTime } from "@/app/features/home/lib/utils";
import type { ContactFilterStatus, ContactRecord } from "./types";

const FILTER_TABS: {
  value: ContactFilterStatus;
  label: string;
  icon: typeof Users;
}[] = [
  { value: "all", label: "All", icon: Users },
  { value: "active", label: "Active", icon: UserCheck },
  { value: "inactive", label: "Inactive", icon: UserX },
  { value: "blocked", label: "Blocked", icon: Ban },
];

const ContactAdminPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ContactFilterStatus>("all");

  const { data: apiResponse } = useContactsQuery(
    search.trim() ? { search: search.trim() } : undefined,
  );

  // Transform API contacts → ContactRecord[], fallback to mocks
  const allContacts: ContactRecord[] = useMemo(() => {
    const items = apiResponse?.data;
    if (!items || !Array.isArray(items) || items.length === 0) return MOCK_CONTACTS;

    return items.map((c: {
      id: string;
      name: string | null;
      email: string | null;
      phone: string | null;
      customFields: Record<string, unknown> | null;
      updatedAt: string;
      channelIdentities: Array<{ channel: string }>;
      _count?: { conversations: number };
    }): ContactRecord => {
      const convCount = c._count?.conversations ?? 0;
      return {
        id: c.id,
        name: c.name ?? "Unknown",
        email: c.email ?? "",
        phone: c.phone ?? "",
        company: (c.customFields?.company as string) ?? "",
        channel: (c.channelIdentities?.[0]?.channel ?? "WHATSAPP") as ContactRecord["channel"],
        status: convCount > 0 ? "active" : "inactive",
        lastMessageAt: formatRelativeTime(c.updatedAt),
        conversationCount: convCount,
        tags: [],
      };
    });
  }, [apiResponse]);

  const filtered = useMemo(() => {
    let result = allContacts;

    if (statusFilter !== "all") {
      result = result.filter((c) => c.status === statusFilter);
    }

    return result;
  }, [allContacts, statusFilter]);

  const counts = useMemo(
    () => ({
      all: allContacts.length,
      active: allContacts.filter((c) => c.status === "active").length,
      inactive: allContacts.filter((c) => c.status === "inactive").length,
      blocked: allContacts.filter((c) => c.status === "blocked").length,
    }),
    [allContacts],
  );

  return (
    <PageShell>
      <div className="space-y-5">
        <PageHeader
          title="Find your customer"
          description={`${counts.all} contacts · ${counts.active} active`}
          actions={
            <>
              <Button
                label="Export"
                variant="outlined"
                size="xs"
                IconLeft={<Download className="h-3.5 w-3.5" />}
              />
              <Button
                label="Add Contact"
                variant="primary"
                size="xs"
                IconLeft={<UserPlus className="h-3.5 w-3.5" />}
              />
            </>
          }
        />

        {/* Toolbar */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Search */}
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-grey-medium" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, company..."
                className={cn(
                  "w-full rounded-xl border border-grey-light/60 bg-grey-light/20",
                  "py-2.5 pl-9 pr-4 text-sm text-grey outline-none",
                  "placeholder:text-grey-medium/60",
                  "transition-colors focus:border-primary/40 focus:bg-white",
                )}
              />
            </div>

            {/* Status filter */}
            <div className="flex gap-1 rounded-xl bg-grey-light/30 p-1">
              {FILTER_TABS.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setStatusFilter(tab.value)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                      statusFilter === tab.value
                        ? "bg-white text-grey shadow-sm"
                        : "text-grey-medium hover:text-grey",
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                    {tab.label}
                    <span
                      className={cn(
                        "rounded-full px-1.5 text-[10px]",
                        statusFilter === tab.value
                          ? "bg-primary/10 text-primary"
                          : "bg-grey-light/60 text-grey-medium",
                      )}
                    >
                      {counts[tab.value]}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="overflow-hidden rounded-2xl border border-grey-light/60 bg-white"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-grey-light/40 bg-grey-light/15">
                    <th className="px-5 py-3 text-left label-bold-14 text-grey-medium">
                      Contact
                    </th>
                    <th className="hidden px-5 py-3 text-left label-bold-14 text-grey-medium lg:table-cell">
                      Email &amp; Phone
                    </th>
                    <th className="hidden px-5 py-3 text-left label-bold-14 text-grey-medium md:table-cell">
                      Channel
                    </th>
                    <th className="hidden px-5 py-3 text-left label-bold-14 text-grey-medium xl:table-cell">
                      Tags
                    </th>
                    <th className="hidden px-5 py-3 text-left label-bold-14 text-grey-medium sm:table-cell">
                      Last Activity
                    </th>
                    <th className="px-5 py-3 text-left label-bold-14 text-grey-medium">
                      Status
                    </th>
                    <th className="px-5 py-3 text-left label-bold-14 text-grey-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length > 0 ? (
                    filtered.map((contact, i) => (
                      <ContactRow
                        key={contact.id}
                        contact={contact}
                        index={i}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-16 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <Users className="h-10 w-10 text-grey-medium/30" />
                          <p className="body-medium-16 text-grey-medium">
                            No contacts found
                          </p>
                          <p className="caption-medium-12 text-grey-medium/60">
                            {search
                              ? "Try a different search term"
                              : "Add your first contact to get started"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            {filtered.length > 0 && (
              <div className="flex items-center justify-between border-t border-grey-light/40 px-5 py-3">
                <span className="caption-medium-12 text-grey-medium">
                  Showing {filtered.length} of {counts.all} contacts
                </span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    disabled
                    className="rounded-lg border border-grey-light/60 px-3 py-1.5 text-xs text-grey-medium disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-grey-light/60 px-3 py-1.5 text-xs text-grey transition-colors hover:border-primary/30"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
        </motion.div>
      </div>
    </PageShell>
  );
};

export default ContactAdminPage;
