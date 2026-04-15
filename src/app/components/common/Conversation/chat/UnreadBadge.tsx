interface Props {
  count: number;
}

const UnreadBadge = ({ count }: Props) => {
  if (count <= 0) return null;
  return (
    <span
      className="flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white"
      aria-label={`${count} unread ${count === 1 ? "message" : "messages"}`}
      title={`${count} unread ${count === 1 ? "message" : "messages"}`}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
};

export default UnreadBadge;
