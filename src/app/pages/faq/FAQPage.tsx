import { Accordian, Input } from "@/app/components/ui";
import { faqData } from "@/app/utils/faq/faq";
import { Search } from "lucide-react";
import { useState } from "react";

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "CRM Software",
    "Unified Inbox",
    "Chatbot",
    "Bulk Messaging",
  ];

  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory =
      activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-36 h-full">
      {/* Header */}
      <h1 className="h2-bold-40 text-base-black mb-8">
        Frequently Asked Questions ( FAQ )
      </h1>

      {/* Filter Buttons */}
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-3 mb-6 ">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg h5-bold-16 transition-colors ${
                activeCategory === category
                  ? "bg-primary text-white"
                  : "bg-base-white text-grey-medium hover:bg-grey-light hover:cursor-pointer"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-grey-light" />
          </div>
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-grey-light rounded-lg bg-white placeholder-grey-light focus:outline-none focus:placeholder-grey-light focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      {/* FAQ Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Column */}
        <div className="pt-4">
          <Accordian
            items={filteredFAQs.filter((_, index) => index % 2 === 0)}
          />
        </div>

        {/* Right Column */}
        <div className="pt-4">
          <Accordian
            items={filteredFAQs.filter((_, index) => index % 2 === 1)}
          />
        </div>
      </div>

      {/* No results message */}
      {filteredFAQs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-grey-medium text-lg">
            No FAQs found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default FAQPage;
