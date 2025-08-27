import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Agreement, Button, Input, PhoneInput } from "@/app/components/ui";
import { DemoFormData, demoSchema } from "@/app/schemas/demoSchema";

import DemoTextArea from "./DemoTextArea";

const DemoFormContent = ({
  onClose,
  showCloseButton = false,
  className = "",
  isFullPage = false,
}: {
  onClose?: () => void;
  showCloseButton?: boolean;
  className?: string;
  isFullPage?: boolean;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DemoFormData>({
    resolver: zodResolver(demoSchema),
    mode: "onSubmit",
  });

  const onSubmit = (data: DemoFormData) => {
    toast.success("Form Submitted Successfully");
    console.log("Submitted:", data);
    reset();
    onClose?.();
  };

  const onError = () => {
    toast.error("Please fill out all required fields.");
  };

  return (
    <div className={`${className}`}>
      <div
        className={`${isFullPage ? "flex flex-col lg:flex-row min-h-auto" : "flex flex-col sm:flex-row justify-center gap-4 md:gap-12"}`}
      >
        <DemoTextArea />

        {showCloseButton && (
          <button
            onClick={onClose}
            className="text-base-black absolute top-5 right-5 hidden sm:block cursor-pointer"
          >
            <X size={24} />
          </button>
        )}

        <div className={`${isFullPage ? "flex-1 py-6 px-6 lg:py-6 lg:px-12" : ""}`}>
          <div className="flex justify-between items-start">
            <h2
              className={`${isFullPage ? "text-2xl lg:text-3xl font-bold text-gray-800 mb-8" : "h5-bold-16 pt-4 text-grey"}`}
            >
              Schedule your personalized demo!
            </h2>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className={`flex flex-col gap-4 justify-center w-full space-y-2 ${isFullPage ? "max-w-2xl" : "max-w-7xl"}`}
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                label="First Name"
                placeholder="Enter your first name"
                {...register("firstName")}
                error={errors.firstName?.message}
              />
              <Input
                label="Last Name"
                placeholder="Enter your last name"
                {...register("lastName")}
                error={errors.lastName?.message}
              />
            </div>

            <Input
              label="Company Name"
              placeholder="Enter your company name"
              {...register("company")}
              error={errors.company?.message}
            />

            <Input
              label="Email"
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
              error={errors.email?.message}
            />

            <PhoneInput
              label="Phone Number"
              placeholder="Enter your phone number"
              {...register("phone")}
              error={errors.phone?.message}
            />

            <Input
              label="How many people will be using Chatblix?"
              placeholder="Enter the range of individuals"
              {...register("usage")}
              error={errors.usage?.message}
            />

            <div className="mt-2">
              <Button label="Book a Demo" type="submit" className="w-full" />
            </div>

            <div className="w-full mt-1">
              <Agreement />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default DemoFormContent;
