import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Hash,
  Users,
  FileText,
  Image as ImageIcon,
  Link2,
  UserPlus,
  ChevronDown,
  ChevronRight,
  Crown,
  Shield,
  User,
} from "lucide-react";
import { Button } from "@/app/components/ui";
import { cn } from "@/app/utils/cn";
import ChannelAddMemberDialog, {
  type ChannelAddMemberSubmitPayload,
  type ChannelInviteCandidate,
} from "./ChannelAddMember";

interface ChannelMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "moderator" | "member";
  status: "online" | "offline" | "away";
}

interface ChannelDetailsProps {
  channelId: string;
  channelTitle: string;
  channelDescription?: string;
  members: ChannelMember[];
  availableUsers: ChannelInviteCandidate[];
  inviteCode: string;
  onClose: () => void;
  onAddMembers: (
    payload: ChannelAddMemberSubmitPayload,
  ) => Promise<void> | void;
  addMembersPending?: boolean;
  pinnedMessages?: unknown[];
  sharedFiles?: unknown[];
  sharedLinks?: unknown[];
}

const ChannelDetails = ({
  channelId,
  channelTitle,
  channelDescription,
  members,
  availableUsers,
  inviteCode,
  onClose,
  onAddMembers,
  addMembersPending = false,
  pinnedMessages = [],
  sharedFiles = [],
  sharedLinks = [],
}: ChannelDetailsProps) => {
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["members", "files", "links"]),
  );

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const getRoleIcon = (role: ChannelMember["role"]) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case "moderator":
        return <Shield className="h-4 w-4 text-blue-500" />;
      default:
        return <User className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: ChannelMember["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      default:
        return "bg-gray-400";
    }
  };

  const groupedMembers = {
    online: members.filter((m) => m.status === "online"),
    away: members.filter((m) => m.status === "away"),
    offline: members.filter((m) => m.status === "offline"),
  };

  return (
    <motion.div
      initial={{ x: 320 }}
      animate={{ x: 0 }}
      exit={{ x: 320 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col h-full"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            Channel Details
          </h3>
          <Button
            onClick={onClose}
            variant="none"
            IconRight={<X className="h-6 w-6" color="black" />}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Hash className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 dark:text-white">
                {channelTitle}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {members.length} members
              </p>
            </div>
          </div>

          {channelDescription && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {channelDescription}
            </p>
          )}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Pinned Messages */}
        {pinnedMessages.length > 0 && (
          <div className="border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => toggleSection("pinned")}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                {expandedSections.has("pinned") ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                <FileText className="h-4 w-4" />
                <span className="text-sm">Pinned Messages</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {pinnedMessages.length}
              </span>
            </button>
            <AnimatePresence>
              {expandedSections.has("pinned") && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 pb-3"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No pinned messages yet
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Members Section */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => toggleSection("members")}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
              {expandedSections.has("members") ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <Users className="h-4 w-4" />
              <span className="text-sm">Members</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {members.length}
            </span>
          </button>

          <AnimatePresence>
            {expandedSections.has("members") && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="pb-3"
              >
                {/* Add Member Button */}
                <button
                  onClick={() => setIsAddMemberDialogOpen(true)}
                  className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <UserPlus className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    Add Members
                  </span>
                </button>

                {/* Online Members */}
                {groupedMembers.online.length > 0 && (
                  <div className="mt-2">
                    <div className="px-4 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                      Online — {groupedMembers.online.length}
                    </div>
                    {groupedMembers.online.map((member) => (
                      <div
                        key={member.id}
                        className="px-4 py-2 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer group"
                      >
                        <div className="relative">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
                            {member.avatar ? (
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              member.name.charAt(0).toUpperCase()
                            )}
                          </div>
                          <span
                            className={cn(
                              "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800",
                              getStatusColor(member.status),
                            )}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-800 dark:text-white truncate">
                              {member.name}
                            </span>
                            {getRoleIcon(member.role)}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Offline Members */}
                {groupedMembers.offline.length > 0 && (
                  <div className="mt-2">
                    <div className="px-4 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                      Offline — {groupedMembers.offline.length}
                    </div>
                    {groupedMembers.offline.slice(0, 5).map((member) => (
                      <div
                        key={member.id}
                        className="px-4 py-2 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer opacity-60"
                      >
                        <div className="relative">
                          <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-medium text-sm">
                            {member.avatar ? (
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              member.name.charAt(0).toUpperCase()
                            )}
                          </div>
                          <span
                            className={cn(
                              "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800",
                              getStatusColor(member.status),
                            )}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-800 dark:text-white truncate">
                              {member.name}
                            </span>
                            {getRoleIcon(member.role)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Shared Files */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => toggleSection("files")}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
              {expandedSections.has("files") ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <ImageIcon className="h-4 w-4" />
              <span className="text-sm">Shared Files</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {sharedFiles.length}
            </span>
          </button>
          <AnimatePresence>
            {expandedSections.has("files") && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-4 pb-3"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No files shared yet
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Shared Links */}
        <div>
          <button
            onClick={() => toggleSection("links")}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
              {expandedSections.has("links") ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <Link2 className="h-4 w-4" />
              <span className="text-sm">Shared Links</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {sharedLinks.length}
            </span>
          </button>
          <AnimatePresence>
            {expandedSections.has("links") && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-4 pb-3"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No links shared yet
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ChannelAddMemberDialog
        open={isAddMemberDialogOpen}
        onOpenChange={setIsAddMemberDialogOpen}
        channelTitle={channelTitle || channelId}
        inviteCode={inviteCode}
        availableUsers={availableUsers}
        existingMemberIds={members.map((member) => member.id)}
        onSubmit={onAddMembers}
        submitting={addMembersPending}
      />
    </motion.div>
  );
};

export default ChannelDetails;
