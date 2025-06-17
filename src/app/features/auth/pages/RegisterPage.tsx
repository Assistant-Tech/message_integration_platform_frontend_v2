import RegisterForm from "@/app/features/auth/components/form/RegisterForm";
import registerImage from "@/app/assets/images/register.png";
import { Logo } from "@/app/components/ui";

const RegisterPage = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Left Section with overlay text */}
      <div className="hidden md:block w-1/2 h-full relative">
        <img
          src={registerImage}
          alt="register"
          className="w-full h-full object-cover"
        />

        {/* Text Overlay */}
        <div className="absolute bottom-0 left-0 p-6 bg-black/70 text-white w-full px-32 py-12">
          <h2 className="h3-bold-32 text-white pb-4 max-w-md">
            Seamless Experience, Anytime, Anywhere
          </h2>
          <p className="body-bold-16 text-white mt-1 max-w-2xl">
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
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
