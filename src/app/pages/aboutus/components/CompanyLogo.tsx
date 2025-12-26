import { motion } from "framer-motion";
interface CompanyLogoProps {
  name: string;
  index: number;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ name, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="inline-flex items-center mx-12 px-8 py-4 bg-white rounded-lg shadow-sm border border-gray-200"
  >
    <div className="w-8 h-8 bg-gray-300 rounded mr-3"></div>
    <span className="text-gray-600 font-medium text-lg">{name}</span>
  </motion.div>
);

export default CompanyLogo;
