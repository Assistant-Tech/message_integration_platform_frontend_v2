import { useRef } from "react";
import { motion } from "framer-motion";
import { Camera, Shield } from "lucide-react";
import { getAvatarUrl } from "@/app/utils/avatar";

interface ProfilePersonalCardProps {
  name: string;
  email: string;
  avatar: string | null;
  roleType: string;
  userStatus: string;
  isVerified: boolean;
}

/* const getRoleBadge = (role: string) => {
  const label =
    role === "TENANT_ADMIN" ? "Admin" : role === "MEMBER" ? "Member" : role;
  const style =
    role === "TENANT_ADMIN"
      ? "bg-primary-light text-primary border border-primary/20"
      : "bg-information-light text-information border border-information/20";
  return { label, style };
}; */

const ProfilePersonalCard = ({
  name,
  email,
  avatar,
  roleType: _roleType,
  userStatus: _userStatus,
  isVerified,
}: ProfilePersonalCardProps) => {
  void _userStatus; void _roleType; // kept for future use — role badge is commented out below
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const role = getRoleBadge(roleType);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="bg-white border border-grey-light rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5"
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="w-20 h-20 rounded-full ring-4 ring-base-white shadow-md overflow-hidden bg-grey-light">
          <img
            src={getAvatarUrl(avatar)}
            alt="Profile avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1.5 shadow-md hover:bg-primary-dark transition-colors"
          title="Change avatar"
        >
          <Camera size={13} />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
        />
      </div>

      {/* Identity */}
      <div className="flex-1 min-w-0 text-center sm:text-left">
        <h3 className="h5-bold-16 text-grey truncate">{name}</h3>
        <p className="label-regular-14 text-grey-medium truncate mt-0.5">
          {email}
        </p>
        <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 flex-wrap">
          {/*<span
            className={`caption-bold-12 px-2.5 py-0.5 rounded-full ${role.style}`}
          >
            {role.label}
          </span>*/}
          {isVerified && (
            <span className="flex items-center gap-1 caption-bold-12 px-2.5 py-0.5 rounded-full bg-success-light text-success border border-success/20">
              <Shield size={10} />
              Verified
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePersonalCard;
