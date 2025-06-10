import { motion } from "framer-motion";
import { Button } from "@/app/components/ui";
import { ServiceItem } from "@/app/types/product";

interface Props {
  service: ServiceItem;
}

const ProductCard = ({ service }: Props) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      className="bg-base-white p-6 md:p-8 mx-4 rounded-2xl transition-all duration-300 cursor-pointer h-full flex flex-col text-center"
    >
      <h3 className="h4-bold-24 text-grey mb-3 md:mb-4">{service.title}</h3>

      <p className=" bod-regular-16 text-grey-medium text-center mb-6 flex-grow ">
        {service.description}
      </p>

      <div className="flex justify-center items-center">
        <Button
          label="Learn More"
          className="bg-transparent underline text-base-black hover:bg-transparent"
        />
      </div>
    </motion.div>
  );
};

export default ProductCard;
