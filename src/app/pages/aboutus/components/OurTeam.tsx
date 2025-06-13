import Section from "@/app/components/layout/Section";
import { Badge, OurTeamCard } from "@/app/components/ui";
import { teamMembers } from "@/app/utils/utils";
import { motion } from "framer-motion";

const OurTeam = () => {
  return (
    <motion.div>
      <div className="w-full pt-20">
        <article className="flex flex-col justify-center items-center text-center space-y-4">
          <Badge title="OUR TEAM" />
          <h1 className="h3-bold-32 text-grey">Team Behind Assistant Tech</h1>
        </article>

        {/* Card Section */}
        <Section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
            {teamMembers.map((member) => (
              <OurTeamCard
                key={member.name}
                name={member.name}
                title={member.title}
                imageUrl={member.imageUrl}
                socialLinks={member.socialLinks}
                className={member.className}
              />
            ))}
          </div>
        </Section>
      </div>
    </motion.div>
  );
};

export default OurTeam;
