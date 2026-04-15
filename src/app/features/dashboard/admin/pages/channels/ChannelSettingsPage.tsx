import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "@/app/components/layout";
import { Button } from "@/app/components/ui";
import { APP_ROUTES } from "@/app/constants/routes";
import { useChannels } from "@/app/hooks/useChannels";
import { ColumnDef } from "@tanstack/react-table";
import { GenericTable } from "@/app/components/table/GenericTable";
import { Trash2 } from "lucide-react";

const PROVIDER_LABELS: Record<string, string> = {
  facebook: "Facebook Messenger",
  instagram: "Instagram",
  whatsapp: "WhatsApp Business",
  tiktok: "TikTok",
};

const ChannelSettingsPage = () => {
  const navigate = useNavigate();
  const { slug, providerId } = useParams();
  const { pages, isLoading, startMetaOAuth } = useChannels();
  // console.log("pages", pages);

  const normalizedProviderId = (providerId || "").toLowerCase();

  const filteredPages = useMemo(() => {
    return pages.filter(
      (page) => page.channelType.toLowerCase() === normalizedProviderId,
    );
  }, [pages, normalizedProviderId]);

  const providerLabel =
    PROVIDER_LABELS[normalizedProviderId] ||
    (providerId ? `${providerId.toUpperCase()} Channel` : "Channel");

  const goBack = () => {
    if (!slug) return;
    navigate(`/app/${slug}/admin/${APP_ROUTES.ADMIN.CHANNEL}`);
  };

  const handleAddPage = () => {
    if (normalizedProviderId === "facebook") {
      startMetaOAuth();
    }
  };

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Page Name",
        cell: (info) => {
          const pageName = String(info.getValue() ?? "");

          return (
            <div>
              <p className="label-semi-bold-14 text-grey">{pageName}</p>
              <p className="text-[11px] text-grey-medium font-mono">
                {info.row.original.id}
              </p>
            </div>
          );
        },
      },
      {
        accessorKey: "channelType",
        header: "Channel Type",
      },
      {
        accessorKey: "externalId",
        header: "External ID",
      },
      {
        id: "actions",
        header: "Actions",
        cell: () => (
          <div className="flex items-center gap-2">
            <Button label="Edit Settings" variant="outlined" size="sm" />
            <Button
              IconLeft={<Trash2 size={18} />}
              variant="danger"
              size="sm"
            />
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <Container>
      <div className="pt-8 pb-6 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="h4-bold-24 text-grey">{providerLabel} Settings</h1>
            <p className="label-regular-14 text-grey-medium mt-1">
              Manage connected pages and review page details for this channel.
            </p>
          </div>
          <div className="flex justify-end items-center gap-4">
            <Button
              label="Back to Channels"
              variant="outlined"
              size="sm"
              onClick={goBack}
            />
            <Button
              label="Add Page"
              variant="primary"
              size="sm"
              onClick={handleAddPage}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-2xl border border-grey-light bg-white p-6">
            <p className="label-regular-14 text-grey-medium animate-pulse">
              Loading connected pages...
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl overflow-hidden border border-grey-light">
            <GenericTable
              data={filteredPages}
              columns={columns}
              emptyMessage={`No ${providerLabel} pages found.`}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default ChannelSettingsPage;
