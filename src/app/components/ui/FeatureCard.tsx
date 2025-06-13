// FeatureCard.tsx
import { Box, Flex } from "@radix-ui/themes";

interface Feature {
  img: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<Feature> = ({ img, title, description }) => {
  return (
    <Box className="w-full bg-white rounded-2xl p-4 cursor-pointer">
      <Flex direction="row" align="center" gap="4">
        <Box className="flex">
          <img
            src={img}
            alt={title}
            className="w-24 h-24 object-cover rounded-xl"
          />
        </Box>
        <Box className="px-3 pt-2 text-start">
          <h3 className="h5-bold-16 text-grey mb-1">{title}</h3>
          <p className="h5-regular-16 text-grey-medium">{description}</p>
        </Box>
      </Flex>
    </Box>
  );
};

export default FeatureCard;
