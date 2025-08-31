import RegisterForm from "@/app/features/auth/components/form/RegisterForm";
import { Button, Logo } from "@/app/components/ui";

import google from "@/app/assets/icons/google.svg";
import circlefb from "@/app/assets/icons/circlefb.svg";
import { REGISTER_IMAGE_URL } from "@/app/constants/image-cloudinary";

const RegisterPage = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Left Section with gradient overlay */}
      <div className="hidden md:block w-1/2 h-full relative">
        <img
          src={REGISTER_IMAGE_URL}
          alt="register"
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/90" />

        {/* Text Overlay */}
        <div className="absolute bottom-0 left-0 p-6 w-full px-32 py-12 text-white">
          <h2 className="h3-bold-32 text-white pb-4 max-w-md">
            Seamless Experience, Anytime, Anywhere
          </h2>
          <p className="body-bold-16 mt-1 max-w-2xl">
            Stay synced across all devices, both mobile and desktop, and access
            your account anytime, anywhere. So no matter where you are, you’ll
            always have a smooth and seamless experience.
          </p>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center overflow-y-auto px-4 pt-48 pb-12">
        <div className="w-full max-w-md">
          <Logo />

          {/* Title */}
          <div className="text-start pt-8">
            <h2 className="h5-medium-16 text-grey-medium">
              Let’s get you started,
            </h2>
            <p className="mt-2 h3-bold-32 text-base-black">
              Create your account
            </p>
          </div>
          <RegisterForm />

          {/* OR */}
          <div className="flex items-center gap-2 text-gray-400">
            <hr className="flex-grow border-gray-300" />
            <span className="text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Social Logins */}
          <div className="space-y-2">
            <Button
              label="Sign in with Google"
              variant="outlined"
              IconLeft={<img src={google} alt="Facebook" className="w-5 h-5" />}
              className="w-full border-grey-light text-grey-medium h5-bold-16"
            />
            <Button
              label="Sign in with Facebook"
              variant="outlined"
              IconLeft={
                <img src={circlefb} alt="Facebook" className="w-5 h-5" />
              }
              className="w-full border-grey-light text-grey-medium h5-bold-16"
            />
          </div>

          {/* Login Redirect */}
          <p className="text-center h5-regular-16 text-grey-medium mt-4">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary h5-regular-16  hover:underline"
            >
              Log in
            </a>
          </p>

          {/* Copyright */}
          <p className="h5-bold-16 text-grey-medium mt-4 text-center">
            © 2025 Chatblix. All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
