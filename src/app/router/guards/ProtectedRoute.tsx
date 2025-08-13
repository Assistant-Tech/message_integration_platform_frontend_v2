import { Loading } from "@/app/components/common";
import { useAuthStore } from "@/app/store/auth.store";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // const user = useAuthStore((s) => s.user);
  const isRefreshing = useAuthStore((s) => s.isRefreshing);

  if (isRefreshing) {
    return <Loading />;
  }
  // The user is authenticated and verified.
  return <Outlet />;
};

export default ProtectedRoute;
