import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { useDemoDialogStore } from "@/app/store/useDemoDialogStore";
import { Input, Button } from "@/app/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  demoSchema,
  DemoFormData,
} from "@/app/features/auth/schemas/demoSchema";
import { DemoTextArea } from "@/app/features/auth/components/ui";
import PhoneInput from "@/app/components/ui/PhoneInput";
import { X } from "lucide-react";

export const DemoDialog = () => {
  const { isOpen, close } = useDemoDialogStore();

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
    console.log("Submitted:", data);
    reset();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && close()}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/70 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                initial={{ y: "-10%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-10%", opacity: 0 }}
                className="fixed z-50 left-1/2 top-1/2 max-h-[95vh] w-full max-w-xs md:max-w-7xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-4xl bg-white p-4 scrollbar-hide"
              >
                <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-12">
                  <DemoTextArea />
                  <button
                    onClick={() => {
                      close();
                    }}
                    className="text-base-black absolute top-5 right-5 hidden sm:block cursor-pointer"
                  >
                    <X size={24} />
                  </button>
                  <div>
                    <div className="flex justify-between items-start">
                      <Dialog.Title className="h5-bold-16 pt-4 text-grey">
                        Schedule your personalized demo!
                      </Dialog.Title>
                    </div>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex flex-col gap-3 mt-3 w-full max-w-7xl"
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
                        label="How many people will be using Assistant Tech?"
                        placeholder="Enter the range of individuals"
                        {...register("usage")}
                        error={errors.usage?.message}
                      />

                      <div className="mt-2">
                        <Button
                          label="Book a Demo"
                          type="submit"
                          className="w-full"
                        />
                      </div>

                      <div className="w-full mt-1">
                        <h1 className="label-regular-14 text-grey-medium text-center sm:text-left">
                          By submitting this form, I agree to the company's{" "}
                          <span className="label-bold-14 text-grey">
                            Terms of Service
                          </span>{" "}
                          and{" "}
                          <span className="label-bold-14 text-grey">
                            Privacy Policy.
                          </span>{" "}
                        </h1>
                      </div>
                    </form>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default DemoDialog;
