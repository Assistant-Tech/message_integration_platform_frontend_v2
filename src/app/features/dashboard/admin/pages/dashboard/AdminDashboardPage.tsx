import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/store/auth.store";
import { useMfaStore } from "@/app/store/mfa.store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import RecoveryPhrasesModal from "../../component/mfa/RecoveryCodesModal";
import { Loading } from "@/app/components/common";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user: profile, logout } = useAuthStore();

  const { recoveryPhrases } = useMfaStore();
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);

  useEffect(() => {
    if (recoveryPhrases?.length > 0) {
      setShowRecoveryModal(true);
    }
  }, [recoveryPhrases]);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully!");
    navigate("/login", { replace: true });
  };
  
  if (!profile) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-full flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border">
          <h2 className="font-semibold">User Information</h2>
          <p className="mt-2">ID: {profile.id}</p>
          <p className="mt-2">Email: {profile.email}</p>
          <p className="mt-2">
            Verified: {profile.isVerified ? "✅ Yes" : "❌ No"}
          </p>
        </div>
      </div>

      {showRecoveryModal && (
        <RecoveryPhrasesModal
          codes={recoveryPhrases}
          onClose={() => setShowRecoveryModal(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
