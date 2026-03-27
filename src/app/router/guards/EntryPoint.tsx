import { useAuthStore } from "@/app/store/auth.store";
import { Navigate } from "react-router-dom";
import { Loading } from "@/app/components/common";

const EntryRedirect = () => {
  const { user } = useAuthStore();
  const { tenantSlug } = useAuthStore();

  if (!user) return <Loading />;

  if (!tenantSlug) return <Navigate to="/" replace />;

  switch (user.roleType) {
    case "TENANT_ADMIN":
      return <Navigate to={`/app/${tenantSlug}/admin/dashboard`} replace />;
    case "MEMBER":
      return <Navigate to={`/app/${tenantSlug}/dashboard`} replace />;
    default:
      return <Navigate to="/unauthorized" replace />;
  }
};
export default EntryRedirect;
