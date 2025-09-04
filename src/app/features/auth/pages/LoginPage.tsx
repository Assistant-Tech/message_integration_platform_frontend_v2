import { Logo } from "@/app/components/ui";
import { LOGIN_IMAGE_URL } from "@/app/constants/image-cloudinary";
import LoginForm from "@/app/features/auth/components/form/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Section (Image + Text) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center bg-base-white p-8">
        <div className="w-full max-w-md flex flex-col items-center text-center">
          <img
            src={LOGIN_IMAGE_URL}
            alt="Login illustration"
            className="w-full h-80 object-contain"
          />
          <h2 className="h3-bold-32 text-base-black mt-8 mb-3">
            Seamless Experience, Anytime, Anywhere
          </h2>
          <p className="body-regular-16 text-grey-medium">
            Stay synced across all devices, both mobile and desktop. No matter
            where you are, enjoy a smooth and seamless experience.
          </p>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md p-6 sm:p-8">
          <Logo />
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
