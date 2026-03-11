import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Hash, Mail, UserPlus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, Input } from "@/app/components/ui";
import { cn } from "@/app/utils/cn";
import { getAvatarUrl } from "@/app/utils/avatar";

export interface ChannelInviteCandidate {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  username?: string;
}

export interface ChannelAddMemberSubmitPayload {
  userIds: string[];
  unresolved: string[];
}

interface ChannelAddMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channelTitle: string;
  inviteCode: string;
  availableUsers: ChannelInviteCandidate[];
  existingMemberIds: string[];
  onSubmit: (payload: ChannelAddMemberSubmitPayload) => Promise<void> | void;
  submitting?: boolean;
}

interface InviteEntry {
  key: string;
  label: string;
  secondaryLabel?: string;
  userId?: string;
  avatar?: string | null;
  unresolved: boolean;
}

const normalizeValue = (value: string) => value.trim().toLowerCase();

const buildResolvedEntry = (user: ChannelInviteCandidate): InviteEntry => ({
  key: `user-${user.id}`,
  label: user.name,
  secondaryLabel: user.email,
  userId: user.id,
  avatar: user.avatar,
  unresolved: false,
});

const ChannelAddMemberDialog = ({
  open,
  onOpenChange,
  channelTitle,
  inviteCode,
  availableUsers,
  existingMemberIds,
  onSubmit,
  submitting = false,
}: ChannelAddMemberDialogProps) => {
  const [query, setQuery] = useState("");
  const [inviteEntries, setInviteEntries] = useState<InviteEntry[]>([]);
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setInviteEntries([]);
      setCopyState("idle");
      setError(null);
    }
  }, [open]);

  const isUserSelected = (userId: string) =>
    inviteEntries.some((entry) => entry.userId === userId);

  const findExactUser = (value: string) => {
    const normalizedValue = normalizeValue(value);

    return availableUsers.find((user) => {
      const possibleValues = [user.email, user.name, user.username]
        .filter(Boolean)
        .map((item) => normalizeValue(item as string));

      return possibleValues.includes(normalizedValue);
    });
  };

  const addResolvedUser = (user: ChannelInviteCandidate) => {
    if (existingMemberIds.includes(user.id) || isUserSelected(user.id)) {
      setQuery("");
      return;
    }

    setInviteEntries((prev) => [...prev, buildResolvedEntry(user)]);
    setQuery("");
    setError(null);
  };

  const addEntryFromText = (rawValue: string) => {
    const value = rawValue.trim();
    if (!value) {
      return;
    }

    const matchedUser = findExactUser(value);
    if (matchedUser) {
      addResolvedUser(matchedUser);
      return;
    }

    const normalizedValue = normalizeValue(value);
    const alreadyAdded = inviteEntries.some(
      (entry) => normalizeValue(entry.label) === normalizedValue,
    );

    if (alreadyAdded) {
      setQuery("");
      return;
    }

    setInviteEntries((prev) => [
      ...prev,
      {
        key: `manual-${normalizedValue}`,
        label: value,
        unresolved: true,
      },
    ]);
    setQuery("");
    setError(null);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (["Enter", "Tab", ","].includes(event.key) && query.trim()) {
      event.preventDefault();
      addEntryFromText(query);
    }
  };

  const handleRemoveEntry = (entryKey: string) => {
    setInviteEntries((prev) => prev.filter((entry) => entry.key !== entryKey));
  };

  const handleCopyInviteCode = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1800);
    } catch {
      setError("Could not copy the server code. Copy it manually instead.");
    }
  };

  const handleSubmit = async () => {
    const resolvedIds = inviteEntries
      .filter((entry) => entry.userId)
      .map((entry) => entry.userId as string);
    const unresolved = inviteEntries
      .filter((entry) => entry.unresolved)
      .map((entry) => entry.label);

    if (inviteEntries.length === 0) {
      setError("Add at least one username or email before continuing.");
      return;
    }

    if (resolvedIds.length === 0) {
      setError(
        "No existing workspace members matched those usernames or emails. Share the server code instead.",
      );
      return;
    }

    await onSubmit({ userIds: resolvedIds, unresolved });
    onOpenChange(false);
  };

  const filteredUsers = availableUsers.filter((user) => {
    if (existingMemberIds.includes(user.id) || isUserSelected(user.id)) {
      return false;
    }

    if (!query.trim()) {
      return false;
    }

    const normalizedQuery = normalizeValue(query);

    return [user.name, user.email, user.username]
      .filter(Boolean)
      .some((value) =>
        normalizeValue(value as string).includes(normalizedQuery),
      );
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-primary-dark/50 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 24, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-1.5rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white shadow-2xl"
              >
                <div className="border-b border-grey-light bg-primary/90 px-6 py-5 text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Dialog.Title className="h4-bold-24">
                        Add Members
                      </Dialog.Title>
                      <p className="mt-1 text-sm text-white/80">
                        Invite people into #{channelTitle} with direct adds or a
                        shared server code.
                      </p>
                    </div>

                    <Dialog.Close asChild>
                      <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </Dialog.Close>
                  </div>
                </div>

                <div className="space-y-6 px-6 py-6">
                  <div className="gap-4 flex flex-col">
                    <div className="rounded-2xl border border-grey-light bg-base-white p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
                          <UserPlus className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="body-bold-16 text-grey">Quick Add</p>
                          <p className="label-regular-14 text-grey-medium">
                            Type a username or email and press enter.
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 rounded-2xl border border-grey-light bg-white p-3 shadow-sm">
                        <div className="flex flex-wrap gap-2">
                          {inviteEntries.map((entry) => (
                            <span
                              key={entry.key}
                              className={cn(
                                "inline-flex max-w-full items-center gap-2 rounded-full border px-3 py-2 text-sm",
                                entry.unresolved
                                  ? "border-grey-light bg-grey-light text-grey"
                                  : "border-primary bg-primary-light text-primary-dark",
                              )}
                            >
                              {entry.avatar ? (
                                <img
                                  src={getAvatarUrl(entry.avatar)}
                                  alt={entry.label}
                                  className="h-5 w-5 rounded-full object-cover"
                                />
                              ) : entry.unresolved ? (
                                <Mail className="h-4 w-4" />
                              ) : (
                                <Hash className="h-4 w-4" />
                              )}
                              <span className="max-w-40 truncate">
                                {entry.label}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveEntry(entry.key)}
                                className="text-current/70 transition hover:text-current"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </span>
                          ))}

                          <div className="min-w-[220px] flex-1">
                            <Input
                              placeholder="Type username or email"
                              value={query}
                              onChange={(event) => setQuery(event.target.value)}
                              onKeyDown={handleInputKeyDown}
                              className="min-h-[44px] border-0 bg-transparent px-0 py-1 shadow-none focus:ring-0"
                            />
                          </div>
                        </div>
                      </div>

                      <p className="mt-3 text-xs text-grey-medium">
                        Exact matches are added instantly. If someone is not in
                        your workspace yet, share the server code below.
                      </p>

                      {filteredUsers.length > 0 && (
                        <div className="mt-4 rounded-2xl border border-grey-light bg-white p-2 shadow-sm">
                          <p className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-grey-medium">
                            Suggested members
                          </p>
                          <div className="space-y-1">
                            {filteredUsers.slice(0, 5).map((user) => (
                              <button
                                key={user.id}
                                type="button"
                                onClick={() => addResolvedUser(user)}
                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-primary-light/50"
                              >
                                <img
                                  src={getAvatarUrl(user.avatar)}
                                  alt={user.name}
                                  className="h-10 w-10 rounded-full object-cover"
                                />
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-medium text-grey">
                                    {user.name}
                                  </p>
                                  <p className="truncate text-xs text-grey-medium">
                                    {user.email}
                                  </p>
                                </div>
                                <span className="rounded-full bg-primary-light px-2 py-1 text-xs font-semibold text-primary-dark">
                                  Add
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="rounded-2xl border border-grey-light bg-base-white p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-information/10 text-information">
                          <Hash className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="body-bold-16 text-grey">Server Code</p>
                          <p className="label-regular-14 text-grey-medium">
                            Share this with teammates who should join later.
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 rounded-2xl bg-primary-dark p-4 text-white shadow-lg">
                        <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                          Invite code
                        </p>
                        <div className="mt-2 flex items-center justify-between gap-3">
                          <code className="text-lg font-semibold tracking-[0.24em] text-white">
                            {inviteCode}
                          </code>
                          <button
                            type="button"
                            onClick={handleCopyInviteCode}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                          >
                            {copyState === "copied" ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 rounded-2xl border border-grey-light bg-white p-4">
                        <p className="text-sm font-medium text-grey">
                          How this works
                        </p>
                        <ul className="mt-3 space-y-2 text-sm text-grey-medium">
                          <li>
                            Matched members are added to the channel
                            immediately.
                          </li>
                          <li>
                            Unknown usernames or emails stay in the list so you
                            know who still needs the code.
                          </li>
                          <li>
                            The code keeps the Discord-style flow without
                            leaving your brand palette.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="rounded-2xl border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col-reverse gap-3 border-t border-grey-light pt-4 sm:flex-row sm:justify-end">
                    <Dialog.Close asChild>
                      <Button
                        type="button"
                        label="Cancel"
                        variant="outlined"
                        className="sm:min-w-32"
                      />
                    </Dialog.Close>
                    <Button
                      type="button"
                      label={submitting ? "Adding Members..." : "Add Members"}
                      variant="primary"
                      loading={submitting}
                      onClick={handleSubmit}
                      className="sm:min-w-40"
                    />
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default ChannelAddMemberDialog;
