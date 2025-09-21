import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button, Input } from "@/app/components/ui";
import { handleApiError } from "@/app/utils/handlerApiError";
import { useAuthStore } from "@/app/store/auth.store";

interface MfaFormData {
  code: string;
}

const MfaForm = () => {
  const { state } = useLocation() as {
    state: { mfaToken: string; email: string };
  };
  const { verifyMfa } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MfaFormData>();

  const onSubmit = async (data: MfaFormData) => {
    try {
      const res = await verifyMfa(state.mfaToken, data.code);

      toast.success("MFA verification successful");

      useAuthStore.getState().setTenantSlug(res.data.tenantSlug);

      if (res.data.requiresOnboarding) {
        navigate("/onboardingform");
      } else {
        navigate(`/${res.data.tenantSlug}/admin/dashboard`);
      }
    } catch (error) {
      const parsedError = handleApiError(error);
      toast.error(parsedError.message || "MFA verification failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className="text-2xl font-bold">Enter MFA Code</h2>
      <Input
        label="Authentication Code"
        placeholder="123456"
        {...register("code", { required: "Code is required" })}
        error={errors.code?.message}
      />
      <Button type="submit" label="Verify" className="w-full" />
    </form>
  );
};

export default MfaForm;
