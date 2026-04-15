interface Props {
  status: "SENT" | "DELIVERED" | "READ";
}

const MessageStatusIcon = ({ status }: Props) => {
  if (status === "READ") {
    return (
      <span className="text-[10px] font-medium text-primary" title="Seen">
        ✓✓ Seen
      </span>
    );
  }
  return (
    <span className="text-[10px] text-grey-medium" title="Sent">
      ✓ Sent
    </span>
  );
};

export default MessageStatusIcon;
