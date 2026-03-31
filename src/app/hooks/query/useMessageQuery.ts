// import { fetchInboxMessages } from "@/app/services/messages.services";
// import { useInfiniteQuery } from "@tanstack/react-query";

// export const useMessagesQuery = (conversationId: string) => {
//   return useInfiniteQuery({
//     queryKey: ["messages", conversationId],
//     queryFn: ({ pageParam }) =>
//       fetchInboxMessages(conversationId, pageParam),
//     getNextPageParam: (lastPage) => lastPage.nextCursor,
//     enabled: !!conversationId,
//   });
// };
