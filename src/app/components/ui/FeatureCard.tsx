import React from "react";

interface Feature {
  img: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<Feature> = ({ img, title, description }) => {
  return (
    <div className="w-full bg-white rounded-2xl p-5 md:p-6 flex items-center gap-4 md:gap-6 shadow-sm hover:shadow-md transition cursor-pointer">
      {/* Image Section (1/3) */}
      <div className="flex-shrink-0 w-1/3 flex justify-center">
        <img
          src={img}
          alt={title}
          className="w-full max-w-[80px] md:max-w-[120px] aspect-square object-cover rounded-xl"
        />
      </div>

      {/* Text Section (2/3) */}
      <div className="w-2/3 text-left">
        <h3 className="text-grey text-lg md:text-xl font-semibold mb-1">
          {title}
        </h3>
        <p className="text-grey-medium text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
