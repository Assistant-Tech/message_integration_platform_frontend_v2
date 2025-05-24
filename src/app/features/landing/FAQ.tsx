import { Badge } from "@/app/components/ui";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";

const FAQ = () => {
  return (
    <div className="py-8 my-12 px-4 sm:px-6 lg:px-8 bg-white">
      {/* Added max-w-7xl and mx-auto here */}
      <div className="max-w-[1600px] mx-auto">
        <div className="bg-base-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex flex-col justify-center items-center lg:flex-row">
            {/* Left Section */}
            <div className="lg:w-2/5 p-8 lg:p-12">
              <div className="space-y-4 max-w-xl">
                <Badge title="YOU ASK, WE ANSWER" />
                <h2 className="h2-bold-40 text-grey">
                  Frequently Asked Questions
                </h2>
                <p className="text-grey-medium h4-regular-24">
                  Find answers to commonly asked questions in our platform
                </p>
              </div>
            </div>

            {/* Right Section - FAQ Accordion */}
            <div className="lg:w-3/5 p-6 lg:p-8">
              <Accordion.Root
                type="single"
                collapsible
                className="space-y-4"
                defaultValue="item-1"
              >
                {/* First FAQ Item - Expanded by default */}
                <Accordion.Item
                  value="item-1"
                  className="border-b border-grey rounded-lg overflow-hidden"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="flex justify-between items-center w-full p-6 text-left transition-colors group">
                      <span className="h5-bold-16 text-grey">
                        What message management features does your platform?
                      </span>
                      <Minus className="w-5 h-5 text-gray-600 group-data-[state=closed]:hidden flex-shrink-0" />
                      <Plus className="w-5 h-5 text-gray-600 group-data-[state=open]:hidden flex-shrink-0" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="h5-regular-16 px-6 pb-6 text-grey-medium ">
                    Vestibulum tempus imperdiet sem ac porttitor. Vivamus
                    pulvinar commodo orci, suscipit porttitor velit elementum
                    non. Fusce nec pellentesque erat, id lobortis nunc. Donec
                    dui leo, ultrices quis turpis nec, sollicitudin sodales
                  </Accordion.Content>
                </Accordion.Item>

                {/* Second FAQ Item */}
                <Accordion.Item
                  value="item-2"
                  className="border-b border-grey rounded-lg overflow-hidden"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="flex justify-between items-center w-full p-6 text-left transition-colors group">
                      <span className="h5-bold-16 text-grey">
                        What message management features does your platform?
                      </span>
                      <Minus className="w-5 h-5 text-gray-600 group-data-[state=closed]:hidden flex-shrink-0" />
                      <Plus className="w-5 h-5 text-gray-600 group-data-[state=open]:hidden flex-shrink-0" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="h5-regular-16 px-6 pb-6 text-grey-medium ">
                    Vestibulum tempus imperdiet sem ac porttitor. Vivamus
                    pulvinar commodo orci, suscipit porttitor velit elementum
                    non. Fusce nec pellentesque erat, id lobortis nunc. Donec
                    dui leo, ultrices quis turpis nec, sollicitudin sodales
                  </Accordion.Content>
                </Accordion.Item>

                {/* Third FAQ Item */}
                <Accordion.Item
                  value="item-3"
                  className="border-b border-grey rounded-lg overflow-hidden"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="flex justify-between items-center w-full p-6 text-left transition-colors group">
                      <span className="h5-bold-16 text-grey">
                        What message management features does your platform?
                      </span>
                      <Minus className="w-5 h-5 text-gray-600 group-data-[state=closed]:hidden flex-shrink-0" />
                      <Plus className="w-5 h-5 text-gray-600 group-data-[state=open]:hidden flex-shrink-0" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="h5-regular-16 px-6 pb-6 text-grey-medium ">
                    Vestibulum tempus imperdiet sem ac porttitor. Vivamus
                    pulvinar commodo orci, suscipit porttitor velit elementum
                    non. Fusce nec pellentesque erat, id lobortis nunc. Donec
                    dui leo, ultrices quis turpis nec, sollicitudin sodales
                  </Accordion.Content>
                </Accordion.Item>

                {/* Fourth FAQ Item */}
                <Accordion.Item
                  value="item-4"
                  className="border-b border-grey rounded-lg overflow-hidden"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="flex justify-between items-center w-full p-6 text-left transition-colors group">
                      <span className="h5-bold-16 text-grey">
                        What message management features does your platform?
                      </span>
                      <Minus className="w-5 h-5 text-gray-600 group-data-[state=closed]:hidden flex-shrink-0" />
                      <Plus className="w-5 h-5 text-gray-600 group-data-[state=open]:hidden flex-shrink-0" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="h5-regular-16 px-6 pb-6 text-grey-medium ">
                    Vestibulum tempus imperdiet sem ac porttitor. Vivamus
                    pulvinar commodo orci, suscipit porttitor velit elementum
                    non. Fusce nec pellentesque erat, id lobortis nunc. Donec
                    dui leo, ultrices quis turpis nec, sollicitudin sodales
                  </Accordion.Content>
                </Accordion.Item>

                {/* Fifth FAQ Item */}
                <Accordion.Item
                  value="item-5"
                  className="border-b border-grey rounded-lg overflow-hidden"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="flex justify-between items-center w-full p-6 text-left transition-colors group">
                      <span className="h5-bold-16 text-grey">
                        What message management features does your platform?
                      </span>
                      <Minus className="w-5 h-5 text-gray-600 group-data-[state=closed]:hidden flex-shrink-0" />
                      <Plus className="w-5 h-5 text-gray-600 group-data-[state=open]:hidden flex-shrink-0" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="h5-regular-16 px-6 pb-6 text-grey-medium ">
                    Vestibulum tempus imperdiet sem ac porttitor. Vivamus
                    pulvinar commodo orci, suscipit porttitor velit elementum
                    non. Fusce nec pellentesque erat, id lobortis nunc. Donec
                    dui leo, ultrices quis turpis nec, sollicitudin sodales
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
