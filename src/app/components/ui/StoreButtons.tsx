import { motion } from "framer-motion";

type Store = {
  img: string;
  label: string;
};

interface StoreButtonsProps {
  stores: Store[];
  className?: string;
  direction?: "row" | "column";
}

const StoreButtons: React.FC<StoreButtonsProps> = ({
  stores,
  className = "",
  direction = "column",
}) => {
  const layoutClass = direction === "row" ? "flex-row" : "flex-col";

  return (
    <div className={`flex ${layoutClass} gap-4 w-fit pb-6 ${className}`}>
      {stores.map((store, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.1 }}
          className="bg-black text-white px-3 py-1 rounded-lg flex items-center gap-2 h-14 cursor-pointer"
        >
          <img
            src={store.img}
            alt={`${store.label} logo`}
            className="h-8 w-auto"
          />
          <div className="flex flex-col text-left leading-tight">
            <span className="text-xs">Available on the</span>
            <span className="ml-1 font-bold text-sm">{store.label}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
export default StoreButtons;
