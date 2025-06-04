import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  RegisterFormInputs,
  registerSchema,
} from "@/app/schemas/registerSchema";
import { registerFields } from "@/app/utils/resource/utils";
import { Button, Input, PhoneInput } from "@/app/components/ui";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      console.log("🚀 ~ constonSubmit: ~ data: ", data);
      // Simulate API call

      await new Promise((res) => setTimeout(res, 1000));
      toast.success("Form Submitted Successfully");
    } catch (error) {
      toast.error("Submission failed");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {registerFields.map((field) => {
        const { name, label, placeholder, type, variant, component } = field;

        const inputProps = {
          label,
          placeholder,
          error: errors[name]?.message,
          ...register(name),
        };

        const isFullWidth = name !== "firstName" && name !== "lastName";

        if (component === "PhoneInput") {
          return (
            <div key={name} className={isFullWidth ? "col-span-2" : ""}>
              <PhoneInput {...inputProps} />
            </div>
          );
        }

        return (
          <div key={name} className={isFullWidth ? "col-span-2" : ""}>
            <Input type={type || "text"} variant={variant} {...inputProps} />
          </div>
        );
      })}

      <div className="col-span-2">
        <Button
          label="Contact Us"
          variant="primary"
          type="submit"
          loading={isSubmitting}
          className="w-full py-2 px-2"
        />
      </div>
      <motion.h1 className="label-regular-14 text-grey-medium col-span-2">
        By submitting this form, I agree to the company’s{" "}
        <span className="text-primary underline cursor-pointer">
          Terms of Service{" "}
        </span>{" "}
        and{" "}
        <span className="text-primary underline cursor-pointer">
          Privacy Policy
        </span>
        .
      </motion.h1>
    </motion.form>
  );
};

export default RegisterForm;
