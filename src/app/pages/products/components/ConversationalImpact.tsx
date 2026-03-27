import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const impactStats = [
  { label: "Faster Replies", value: "5x", desc: "Improved response speed" },
  { label: "Customer Retention", value: "+35%", desc: "Higher satisfaction" },
  {
    label: "Query Automation",
    value: "80%",
    desc: "Support queries automated",
  },
];

const ConversationalImpact = () => {
  return (
    <section className="py-20 rounded-2xl">
      <div className="text-center">
        <motion.h2
          className="h3-bold-32 text-base-black mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Supercharge Your Customer Conversations
        </motion.h2>
        <motion.p
          className="body-regular-16 text-grey-medium max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Deliver faster, smarter, and more human-like support experiences
          across platforms with AI-powered automation.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {impactStats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Sparkles className="text-primary w-6 h-6 mb-2 mx-auto" />
              <h3 className="body-regular-16 text-grey-medium">{stat.value}</h3>
              <p className="h5-bold-16 text-grey">{stat.label}</p>
              <p className="h5-semi-bold-16 text-grey-light">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConversationalImpact;
