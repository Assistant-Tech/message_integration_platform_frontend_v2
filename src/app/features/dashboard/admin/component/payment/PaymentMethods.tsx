import { BadgeCheck } from "lucide-react";

// images import
import { useForm } from "react-hook-form";

interface OrderFormValues {
  customer: string;
  fullName: string;
  phone: string;
  email: string;
  location: string;
  expectedDelivery: string;
  paymentMethod: string;
}

const PaymentMethods = () => {
  const { register } = useForm<OrderFormValues>();

  // Mapping the images && Texts for payment methods
  const paymentOptions = [
    {
      id: "Khalti",
      image:
        "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1753920905/khalti_xsudv7.webp",
      label: "Khalti",
    },
    {
      id: "eSewa",
      image:
        "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1753920903/esewa_cmqyoh.webp",
      label: "eSewa",
    },
    {
      id: "Stripe",
      image:
        "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1753920897/stripe_py4qze.webp",
      label: "Stripe",
    },
    {
      id: "Cash On Delivery",
      image:
        "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1756631203/cod_qyz92a.jpg",
      label: "Cash On Delivery",
    },
  ];
  return (
    <div className="border border-grey-light rounded-md">
      <h3 className="h5-bold-16 text-grey px-8 py-4 rounded-t-lg bg-base-white">
        Payment Methods
      </h3>
      <div className="px-8 py-6">
        <div className="grid grid-cols-2 gap-3">
          {paymentOptions.map((option) => (
            <label
              key={option.id}
              className="relative border border-grey-light rounded-lg p-px flex flex-col items-center gap-1 cursor-pointer transition hover:shadow-sm"
            >
              {/* Tick icon when selected */}
              <input
                type="radio"
                value={option.id}
                {...register("paymentMethod")}
                className="peer hidden"
              />
              <BadgeCheck
                className="absolute top-2 right-2 text-white rounded-2xl bg-primary-dark bg- opacity-20 peer-checked:opacity-80 transition-opacity"
                size={24}
              />
              <img
                src={option.image}
                alt={option.label}
                className="h-48 object-contain"
              />
              <span className="label-bold-14 text-grey">
                {option.label === "Cash On Delivery" && (
                  <span>{option.label}</span>
                )}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
