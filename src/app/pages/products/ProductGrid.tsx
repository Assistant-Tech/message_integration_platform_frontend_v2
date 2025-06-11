import { motion } from "framer-motion";
import { services } from "@/app/utils/product/utils";
import ProductCard from "@/app/components/ui/ProductCard";
import { Badge } from "@/app/components/ui";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const ProductGrid = () => {
  const grouped = [];
  for (let i = 0; i < services.length; i += 3) {
    grouped.push(services.slice(i, i + 3));
  }

  return (
    <section className="py-16 md:py-10 px-4 md:px-px w-full">
      <motion.div
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="text-center"
      >
        <Badge title="WHAT WE OFFER" className="my-6"/>
        <motion.h2
          variants={itemVariants}
          className="h2-bold-40 mb-4 text-gray-900"
        >
          Products Designed for You
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-grey-medium h4-regular-24 pb-12"
        >
          Explore our product suite below to see how we can help your business.
          These are the tools our customers use every day to stay organized and
          grow with ease.
        </motion.p>

        <motion.div variants={containerVariants} className="space-y-10">
          {grouped.map((group, index) => (
            <motion.div
              key={index}
              className="flex flex-col md:grid md:grid-cols-3 items-center gap-y-8"
              variants={itemVariants}
            >
              {index % 2 === 0 ? (
                <>
                  {group[0] && (
                    <img
                      src={group[0].img}
                      alt=""
                      className="w-full h-64 md:h-80 px-2"
                    />
                  )}
                  {group[1] && (
                    <div className="w-full">
                      <ProductCard service={group[1]} />
                    </div>
                  )}
                  {group[2] && (
                    <img
                      src={group[2].img}
                      alt=""
                      className="w-full h-64 md:h-80 px-2"
                    />
                  )}
                </>
              ) : (
                <>
                  {group[0] && (
                    <div className="w-full">
                      <ProductCard service={group[0]} />
                    </div>
                  )}
                  {group[1] && (
                    <img
                      src={group[1].img}
                      alt={`${group[0]?.title}.png`}
                      className="w-full h-64 md:h-80 px-2 md:px-px px-2"
                    />
                  )}
                  {group[2] && (
                    <div className="w-full">
                      <ProductCard service={group[2]} />
                    </div>
                  )}
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProductGrid;
