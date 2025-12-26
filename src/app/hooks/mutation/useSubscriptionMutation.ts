import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  cancelSubscription,
  pauseSubscription,
  resumeSubscription,
} from "@/app/services/subscription.services";
import { toast } from "sonner";
import { CancelSubscriptionProps, pauseSubscriptionProps, resumeSubscriptionProps } from "@/app/types/subscription.types";


export const useSubscriptionMutations = () => {
  const queryClient = useQueryClient();

  const cancelMutation = useMutation({
    mutationFn: (payload: CancelSubscriptionProps) => cancelSubscription(payload),
    onSuccess: () => {
      toast.success("Subscription canceled successfully!");
      queryClient.invalidateQueries({ queryKey: ["current-subscription"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to cancel subscription");
    },
  });

  const pauseMutation = useMutation({
    mutationFn: (payload: pauseSubscriptionProps) => pauseSubscription(payload),
    onSuccess: () => {
      toast.success("Subscription paused successfully!");
      queryClient.invalidateQueries({ queryKey: ["current-subscription"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to pause subscription");
    },
  });

  const resumeMutation = useMutation({
    mutationFn: (payload: resumeSubscriptionProps) => resumeSubscription(payload),
    onSuccess: () => {
      toast.success("Subscription resumed successfully!");
      queryClient.invalidateQueries({ queryKey: ["current-subscription"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to resume subscription");
    },
  });

  return { cancelMutation, pauseMutation, resumeMutation };
};
