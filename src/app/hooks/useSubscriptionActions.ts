// import { SubscriptionInitiationData } from "@/app/types/subscription.types";
// import {
//   getCurrentSubscription,
//   initiateSubscription,
// } from "@/app/services/subscription.services";
// import { toast } from "sonner";

// export const useSubscriptionActions = () => {
//   const handleSubscription = async (data: SubscriptionInitiationData) => {
//     try {
//       const current = await getCurrentSubscription();

//       if (
//         current &&
//         ["ACTIVE", "TRIALING", "PAST_DUE", "UNPAID"].includes(current.status)
//       ) {
//         toast.error(
//           `You already have a ${current.status.toLowerCase()} subscription.`,
//         );
//         return current;
//       }

//       const newSub = await initiateSubscription(data);
//       toast.success("Subscription initiated successfully!");
//       return newSub;
//     } catch (err: any) {
//       toast.error(err?.message || "Failed to initiate subscription");
//       throw err;
//     }
//   };

//   return { handleSubscription };
// };
