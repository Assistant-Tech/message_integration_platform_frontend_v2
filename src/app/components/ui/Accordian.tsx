import * as Accordion from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react";
import { FAQ } from "@/app/utils/utils"; // Adjust the import based on your structure

interface AccordianProps {
  items: FAQ[];
  defaultOpenId?: string;
}

const Accordian = ({ items, defaultOpenId }: AccordianProps) => {
  return (
    <Accordion.Root
      type="single"
      collapsible
      defaultValue={defaultOpenId ?? items[0]?.id}
    >
      {items.map(({ id, question, answer }) => (
        <Accordion.Item
          key={id}
          value={id}
          className="border-b border-grey-light overflow-hidden"
        >
          <Accordion.Header>
            <Accordion.Trigger className="flex justify-between items-center w-full text-start transition-colors group pt-4 pb-2">
              <span className="h5-bold-16 text-grey">{question}</span>
              <Minus className="w-5 h-5 text-gray-600 group-data-[state=closed]:hidden flex-shrink-0 cursor-pointer" />
              <Plus className="w-5 h-5 text-gray-600 group-data-[state=open]:hidden flex-shrink-0 cursor-pointer" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="h5-regular-16 text-grey-medium pb-2">
            {answer}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

export default Accordian;
