const stats = [
  { label: "Total Orders", count: 0, color: "bg-primary-inactive" },
  { label: "Confirmed", count: 0, color: "bg-secondary-light" },
  { label: "Shipped", count: 0, color: "bg-information-light" },
  { label: "Delivered", count: 0, color: "bg-primary-light" },
  { label: "Cancelled", count: 0, color: "bg-danger-light" },
];

const OrderStats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`rounded-lg px-4 py-3 ${stat.color} text-base-black`}
        >
          <p className="body-regular-16">{stat.label}</p>
          <p className="h4-bold-24">{stat.count}</p>
        </div>
      ))}
    </div>
  );
};
export default OrderStats;
