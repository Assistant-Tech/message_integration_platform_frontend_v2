import { isAuthBypassEnabled } from "@/app/utils/dev/mockAuth";

const DevBanner = () => {
  if (!isAuthBypassEnabled()) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-orange-500 text-white text-center py-1 text-sm font-medium z-50 shadow-md">
      🔧 DEVELOPMENT MODE: Authentication bypassed for UI development
    </div>
  );
};

export default DevBanner;
