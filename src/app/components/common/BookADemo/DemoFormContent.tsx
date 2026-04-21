import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Agreement, Button, Input, PhoneInput } from "@/app/components/ui";
import DemoTextArea from "./DemoTextArea";
import { DemoFormData, demoSchema } from "../../table/schemas/demo.schema";

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

  const onSubmit = () => {
    toast.success("Form Submitted Successfully");
    reset();
    onClose?.();
  };

  const onError = () => {
    toast.error("Please fill out all required fields.");
  };

  return (
    <div className={`${className}`}>
      <div
        className={`${isFullPage ? "grid grid-cols-1 lg:grid-cols-2 items-stretch relative" : "flex flex-col sm:flex-row justify-center gap-4 md:gap-12"}`}
      >
        <DemoTextArea isFullPage={isFullPage} />

        {showCloseButton && (
          <button
            onClick={onClose}
            className="text-base-black absolute top-4 right-4 hidden sm:block cursor-pointer z-10 p-2 rounded-lg bg-white/90 hover:bg-white shadow-sm"
          >
            <X size={20} />
          </button>
        )}

        <div
          className={`${isFullPage ? "w-full py-8 px-6 lg:py-10 lg:px-10 flex flex-col justify-center" : "w-full "}`}
        >
          <div className="flex justify-between items-start">
            <h2
              className={`${isFullPage ? "text-2xl lg:text-3xl font-bold text-gray-800 mb-6" : "h5-bold-16 pt-4 text-grey"}`}
            >
              Schedule your personalized demo!
            </h2>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="flex flex-col gap-4 justify-center w-full space-y-2"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 min-w-0">
                <Input
                  label="First Name"
                  placeholder="Enter your first name"
                  {...register("firstName")}
                  error={errors.firstName?.message}
                />
              </div>
              <div className="flex-1 min-w-0">
                <Input
                  label="Last Name"
                  placeholder="Enter your last name"
                  {...register("lastName")}
                  error={errors.lastName?.message}
                />
              </div>
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
