import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  ChannelSidebar,
  ChannelContent,
  ChannelDetails,
  CreateChannelModal,
} from "@/app/features/dashboard/admin/pages/channels";
import {
  type ChannelAddMemberSubmitPayload,
  type ChannelInviteCandidate,
} from "./components/ChannelAddMember";
import {
  getAllInternalChannels,
  createInternalChannel,
} from "@/app/services/internal-channels.services";
import { useTenantUsers } from "@/app/hooks/query/useTenantQuery";
import { useAddConversationMembers } from "@/app/socket/conversation/useInternalConversation";
import { buildInviteCode, mapRole, mapStatus } from "@/app/utils/helper";
// Mock data for demonstration
const MOCK_MESSAGES = [
  {
    id: "1",
    userId: "user-1",
    userName: "John Doe",
    userAvatar: "",
    content: "Hey everyone! Welcome to the channel.",
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: "2",
    userId: "user-2",
    userName: "Jane Smith",
    userAvatar: "",
    content: "Thanks! Excited to be here 🎉",
    timestamp: new Date(Date.now() - 3000000),
  },
  {
    id: "3",
    userId: "user-1",
    userName: "John Doe",
    userAvatar: "",
    content: "Let's discuss the upcoming project timeline.",
    timestamp: new Date(Date.now() - 2400000),
  },
  {
    id: "4",
    userId: "current-user-id",
    userName: "You",
    userAvatar: "",
    content: "Sounds good! I'll prepare the presentation.",
    timestamp: new Date(Date.now() - 1800000),
  },
  {
    id: "5",
    userId: "user-3",
    userName: "Mike Johnson",
    userAvatar: "",
    content: "I can help with the technical documentation.",
    timestamp: new Date(Date.now() - 900000),
  },
];

const MOCK_MEMBERS = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin" as const,
    status: "online" as const,
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "moderator" as const,
    status: "online" as const,
  },
  {
    id: "user-3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "member" as const,
    status: "online" as const,
  },
  {
    id: "user-4",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    role: "member" as const,
    status: "away" as const,
  },
  {
    id: "user-5",
    name: "Tom Brown",
    email: "tom.brown@example.com",
    role: "member" as const,
    status: "offline" as const,
  },
];

const MOCK_AVAILABLE_USERS = [
  { id: "user-6", name: "Alice Cooper", email: "alice@example.com" },
  { id: "user-7", name: "Bob Dylan", email: "bob@example.com" },
  { id: "user-8", name: "Charlie Parker", email: "charlie@example.com" },
];

interface Channel {
  _id: string;
  title: string;
  type: "internal" | "whatsapp" | "facebook" | "instagram";
  channel: "internal" | "external";
  isDefault: boolean;
  priority: string;
  participants: string[];
  unreadCount?: number;
  isPrivate?: boolean;
}

const ChannelPage = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(
    null,
  );
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const { data: tenantUsersResponse } = useTenantUsers();
  const addMembersMutation = useAddConversationMembers(selectedChannelId ?? "");

  // Fetch channels on mount
  const fetchChannels = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllInternalChannels();

      if (response && Array.isArray(response)) {
        setChannels(response);

        // Select first channel by default
        if (response.length > 0 && !selectedChannelId) {
          setSelectedChannelId(response[0]._id);
        }
      } else {
        // Fallback to mock data if API fails
        const mockChannels: Channel[] = [
          {
            _id: "1",
            title: "general",
            type: "internal",
            channel: "internal",
            isDefault: true,
            priority: "normal",
            participants: ["user-1", "user-2", "user-3"],
            unreadCount: 3,
            isPrivate: false,
          },
          {
            _id: "2",
            title: "announcements",
            type: "internal",
            channel: "internal",
            isDefault: false,
            priority: "high",
            participants: ["user-1", "user-2"],
            unreadCount: 0,
            isPrivate: false,
          },
          {
            _id: "3",
            title: "whatsapp-support",
            type: "whatsapp",
            channel: "external",
            isDefault: false,
            priority: "normal",
            participants: ["user-1"],
            unreadCount: 12,
            isPrivate: false,
          },
          {
            _id: "4",
            title: "facebook-marketing",
            type: "facebook",
            channel: "external",
            isDefault: false,
            priority: "normal",
            participants: ["user-2"],
            unreadCount: 0,
            isPrivate: false,
          },
          {
            _id: "5",
            title: "private-discussions",
            type: "internal",
            channel: "internal",
            isDefault: false,
            priority: "high",
            participants: ["user-1", "user-2"],
            unreadCount: 1,
            isPrivate: true,
          },
        ];
        setChannels(mockChannels);
        if (mockChannels.length > 0 && !selectedChannelId && mockChannels[0]) {
          setSelectedChannelId(mockChannels[0]._id);
        }
      }
    } catch (error) {
      console.error("Error fetching channels:", error);
      toast.error("Failed to load channels");
    } finally {
      setLoading(false);
    }
  }, [selectedChannelId]);

  useEffect(() => {
    void fetchChannels();
  }, [fetchChannels]);

  const handleCreateChannel = async (data: {
    title: string;
    type: "internal" | "whatsapp" | "facebook" | "instagram";
    isPrivate: boolean;
    priority: string;
    participants: string[];
  }) => {
    try {
      const payload = {
        title: data.title,
        type: data.type,
        channel:
          data.type === "internal"
            ? "internal"
            : ("external" as "internal" | "external"),
        isDefault: false,
        priority: data.priority,
        participants: data.participants,
      };

      const response = await createInternalChannel(payload);

      if (response) {
        toast.success("Channel created successfully!");
        fetchChannels(); // Refresh the channels list
      }
    } catch (error) {
      console.error("Error creating channel:", error);
      toast.error("Failed to create channel");
    }
  };

  const handleSendMessage = (content: string, attachments?: File[]) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      userId: "current-user-id",
      userName: "You",
      userAvatar: "",
      content,
      timestamp: new Date(),
      attachments: attachments?.map((file) => ({
        type: file.type,
        url: URL.createObjectURL(file),
        name: file.name,
      })),
    };

    setMessages([...messages, newMessage]);
    // toast.success("Message sent!");
  };

  const selectedChannel = channels.find((ch) => ch._id === selectedChannelId);
  const tenantUsers = tenantUsersResponse?.data ?? [];

  const availableInviteUsers: ChannelInviteCandidate[] =
    tenantUsers.length > 0
      ? tenantUsers.map((item) => ({
          id: item.user.id,
          name: item.user.name,
          email: item.user.email,
          avatar: null,
          username: item.user.name,
        }))
      : [...MOCK_MEMBERS, ...MOCK_AVAILABLE_USERS].map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: null,
          username: user.name,
        }));

  const channelMembers = selectedChannel
    ? selectedChannel.participants
        .map((participantId) => {
          const tenantUser = tenantUsers.find(
            (item) => item.user.id === participantId,
          );

          if (!tenantUser) {
            return MOCK_MEMBERS.find((member) => member.id === participantId);
          }

          return {
            id: tenantUser.user.id,
            name: tenantUser.user.name,
            email: tenantUser.user.email,
            role: mapRole(tenantUser.role?.type),
            status: mapStatus(tenantUser.user.status),
          };
        })
        .filter((member): member is (typeof MOCK_MEMBERS)[0] => Boolean(member))
    : [];

  const resolvedMembers =
    channelMembers.length > 0 ? channelMembers : MOCK_MEMBERS;

  const handleAddMembers = async ({
    userIds,
    unresolved,
  }: ChannelAddMemberSubmitPayload) => {
    if (!selectedChannelId) {
      toast.error("Select a channel before adding members.");
      return;
    }

    try {
      await addMembersMutation.mutateAsync({ participants: userIds });
      await fetchChannels();
      toast.success(
        `${userIds.length} member${userIds.length === 1 ? "" : "s"} added to ${selectedChannel?.title ?? "channel"}.`,
      );

      if (unresolved.length > 0) {
        toast.info(
          `Share code ${buildInviteCode(
            selectedChannelId,
            selectedChannel?.title ?? "channel",
          )} with ${unresolved.length} unmatched invite${unresolved.length === 1 ? "" : "s"}.`,
        );
      }
    } catch (error) {
      console.error("Error adding members:", error);
      toast.error("Failed to add members to the channel");
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-information border-t-transparent rounded-full animate-spin"></div>
          <p className="text-grey-medium dark:text-grey">Loading channels...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-1 overflow-hidden">
        {/* Channel Sidebar */}
        <ChannelSidebar
          channels={channels}
          selectedChannelId={selectedChannelId}
          onSelectChannel={setSelectedChannelId}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {selectedChannel ? (
            <ChannelContent
              channelTitle={selectedChannel.title}
              channelType={selectedChannel.type}
              messages={messages}
              onSendMessage={handleSendMessage}
              onToggleDetails={() => setIsDetailsPanelOpen(!isDetailsPanelOpen)}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-400 mb-2">
                  No Channel Selected
                </h2>
                <p className="text-gray-500">
                  Select a channel from the sidebar to start chatting
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Details Drawer */}
        <AnimatePresence>
          {isDetailsPanelOpen && selectedChannel && (
            <ChannelDetails
              channelId={selectedChannel._id}
              channelTitle={selectedChannel.title}
              channelDescription="A channel for team discussions and updates"
              members={resolvedMembers}
              availableUsers={availableInviteUsers}
              inviteCode={buildInviteCode(
                selectedChannel._id,
                selectedChannel.title,
              )}
              onClose={() => setIsDetailsPanelOpen(false)}
              onAddMembers={handleAddMembers}
              addMembersPending={addMembersMutation.isPending}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Create Channel Modal */}
      <CreateChannelModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateChannel}
        availableUsers={MOCK_AVAILABLE_USERS}
      />
    </div>
  );
};

export default ChannelPage;
