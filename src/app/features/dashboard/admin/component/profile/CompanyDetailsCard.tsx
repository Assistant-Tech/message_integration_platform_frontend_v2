import { motion } from "framer-motion";
import {
  Building2,
  ExternalLink,
  Globe,
  Hash,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-react";
import type { TenantDetails } from "@/app/types/tenant.types";

interface CompanyDetailsCardProps {
  tenant: TenantDetails | undefined;
  isLoading: boolean;
}

const InfoRow = ({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Mail;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-start gap-3">
    <div className="flex items-center gap-2 w-28 shrink-0 pt-0.5">
      <Icon size={13} className="text-grey-medium" />
      <span className="caption-medium-12 text-grey-medium">{label}</span>
    </div>
    {children}
  </div>
);

const SkeletonRows = () => (
  <div className="space-y-3">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex gap-3">
        <div className="h-3 w-24 bg-grey-light rounded animate-pulse" />
        <div className="h-3 flex-1 bg-grey-light/60 rounded animate-pulse" />
      </div>
    ))}
  </div>
);

const CompanyDetailsCard = ({ tenant, isLoading }: CompanyDetailsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="bg-white rounded-xl border border-grey-light overflow-hidden h-full"
    >
      {/* Company header */}
      <div className="bg-primary-light/30 px-5 py-5 sm:px-6 border-b border-grey-light">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-white border border-grey-light shadow-sm overflow-hidden shrink-0 flex items-center justify-center">
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-grey-light animate-pulse" />
            ) : tenant?.logoUri || tenant?.logoUrl ? (
              <img
                src={(tenant.logoUri || tenant.logoUrl)!}
                alt="Company logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <Building2 size={24} className="text-grey-medium" />
            )}
          </div>
          <div className="min-w-0">
            {isLoading ? (
              <div className="space-y-2">
                <div className="h-4 w-36 bg-grey-light rounded animate-pulse" />
                <div className="h-3 w-24 bg-grey-light rounded animate-pulse" />
              </div>
            ) : (
              <>
                <h2 className="body-bold-16 text-grey truncate">
                  {tenant?.organizationName || "---"}
                </h2>
                <p className="caption-medium-12 text-grey-medium mt-0.5 truncate">
                  {tenant?.slug ? `@${tenant.slug}` : ""}
                </p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  {/*{tenant?.status && (
                    <span
                      className={`caption-bold-12 px-2 py-0.5 rounded-full ${
                        tenant.status === "ACTIVE"
                          ? "bg-success-light text-success border border-success/20"
                          : "bg-grey-light text-grey-medium border border-grey-light"
                      }`}
                    >
                      {tenant.status}
                    </span>
                  )}*/}
                  {tenant?.industry && (
                    <span className="caption-medium-12 px-2 py-0.5 rounded-full bg-primary-light text-primary border border-primary/20">
                      {tenant.industry}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Company fields */}
      <div className="px-5 py-5 sm:px-6 space-y-5">
        {isLoading ? (
          <SkeletonRows />
        ) : (
          <>
            {tenant?.email && (
              <InfoRow icon={Mail} label="Email">
                <span className="label-semi-bold-14 text-grey break-all">
                  {tenant.email}
                </span>
              </InfoRow>
            )}

            {tenant?.contactNumber && (
              <InfoRow icon={Phone} label="Phone">
                <span className="label-semi-bold-14 text-grey">
                  {tenant.contactNumber}
                </span>
              </InfoRow>
            )}

            {tenant?.website && (
              <InfoRow icon={Globe} label="Website">
                <a
                  href={tenant.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-semi-bold-14 text-primary hover:underline flex items-center gap-1 truncate"
                >
                  {tenant.website.replace(/^https?:\/\//, "")}
                  <ExternalLink size={11} className="shrink-0" />
                </a>
              </InfoRow>
            )}

            {tenant?.address && (
              <InfoRow icon={MapPin} label="Address">
                <span className="label-semi-bold-14 text-grey">
                  {tenant.address}
                </span>
              </InfoRow>
            )}

            {tenant?.registrationNumber && (
              <InfoRow icon={Hash} label="Reg. No.">
                <span className="label-semi-bold-14 text-grey font-mono">
                  {tenant.registrationNumber}
                </span>
              </InfoRow>
            )}

            {tenant?.description && (
              <div className="pt-1 border-t border-grey-light">
                <p className="caption-medium-12 text-grey-medium mb-1">About</p>
                <p className="body-regular-16 text-grey leading-relaxed">
                  {tenant.description}
                </p>
              </div>
            )}

            {/* Team members */}
            {tenant?.user && tenant.user.length > 0 && (
              <div className="py-4 border-t border-grey-light">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <Users size={13} className="text-grey-medium" />
                    <span className="body-semi-bold-16 text-grey-medium">
                      Team Members
                    </span>
                  </div>
                  {tenant._count && (
                    <span className="caption-bold-12 text-primary bg-primary-light px-2 py-0.5 rounded-full">
                      {tenant._count.user} total
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  {tenant.user.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-3 bg-base-white rounded-lg px-3 py-2 border border-grey-light/50"
                    >
                      <div
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          member.status === "ONLINE"
                            ? "bg-success"
                            : "bg-grey-light"
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="label-semi-bold-14 text-grey truncate">
                          {member.name}
                        </p>
                        <p className="caption-medium-12 text-grey-medium truncate">
                          {member.email}
                        </p>
                      </div>
                      <span
                        className={`caption-medium-12 px-1.5 py-0.5 rounded shrink-0 ${
                          member.status === "ONLINE"
                            ? "text-success bg-success-light"
                            : "text-grey-medium bg-grey-light"
                        }`}
                      >
                        {member.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default CompanyDetailsCard;
