const OrderStats = ({
  stats,
}: {
  stats: Array<{ label: string; count: number; color: string }>;
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6 cursor-pointer">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`rounded-lg px-4 py-3 ${stat.color} text-base-black hover:scale-105`}
        >
          <p className="body-regular-16">{stat.label}</p>
          <p className="h4-bold-24">{stat.count}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderStats;
