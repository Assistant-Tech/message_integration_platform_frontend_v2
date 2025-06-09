import { Flex } from "@radix-ui/themes";
import { Button, Input, Agreement } from "@/app/components/ui/";

const NewsLetter = () => {
  return (
    <Flex
      justify="between"
      align="center"
      className="flex-col md:flex-col lg:flex-row py-8 border border-grey-light bg-base-white px-6 md:px-10 lg:px-16 rounded-2xl gap-6"
    >
      <div className="text-start lg:max-w-1/2 w-full">
        <h3 className="h3-bold-32 text-base-black">
          Subscribe to Assistant Tech’s monthly newsletter to stay updated
        </h3>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 w-full max-w-md">
        <Input placeholder="Enter your email address" className="w-full py-3" />
        <Button label="Subscribe" variant="primary" className="w-full py-3" />
        <div className="text-start text-grey-medium">
          <Agreement />
        </div>
      </div>
    </Flex>
  );
};

export default NewsLetter;
