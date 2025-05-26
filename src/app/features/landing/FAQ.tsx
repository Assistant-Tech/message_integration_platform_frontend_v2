import { Accordian, Badge } from "@/app/components/ui";
import { faqData } from "@/app/utils/utils";

const FAQ = () => {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="bg-base-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex flex-col justify-center items-center lg:flex-row">
            {/* Left Section */}
            <div className="w-1/2 px-16">
              <div className="space-y-4 max-w-xl">
                <Badge title="YOU ASK, WE ANSWER" />
                <h2 className="h2-bold-40 text-grey">
                  Frequently Asked Questions
                </h2>
                <p className="text-grey-medium h4-regular-24 max-w-96">
                  Find answers to commonly asked questions in our platform
                </p>
              </div>
            </div>
            <div className="w-3/5 py-8 pe-16">
              <Accordian items={faqData} defaultOpenId="item-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
