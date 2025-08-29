import { cn } from "@/app/utils/cn";

const Ribbon = ({
  label = "Most Popular",
  className,
}: {
  label?: string;
  className?: string;
}) => {
  return (
    <div className={cn("absolute top-0 right-0 z-30", className)}>
      <div
        className="absolute -right-12 top-6 w-42 py-1.5 rotate-45 bg-secondary text-white text-sm font-semibold text-center shadow-lg shadow-secondary-inactive"
        style={{
          clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
        }}
      >
        {label}
      </div>
    </div>
  );
};

export default Ribbon;
