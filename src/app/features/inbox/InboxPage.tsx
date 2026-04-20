import { useCallback, useState } from "react";
import InboxRail from "@/app/features/inbox/components/InboxRail";
import InboxWorkspace from "@/app/features/inbox/components/InboxWorkspace";
import { InboxView } from "@/app/features/inbox/utils/helper";

const InboxPage = () => {
  const [viewCounts, setViewCounts] = useState<
    Partial<Record<InboxView, number>>
  >({});

  const handleViewCountsChange = useCallback(
    (counts: Partial<Record<InboxView, number>>) => setViewCounts(counts),
    [],
  );

  return (
    <div className="flex h-full min-h-0 w-full">
      <InboxRail counts={viewCounts} />
      <InboxWorkspace onViewCountsChange={handleViewCountsChange} />
    </div>
  );
};

export default InboxPage;
