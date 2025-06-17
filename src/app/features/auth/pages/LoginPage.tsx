import { Logo } from "@/app/components/ui";
import LoginForm from "@/app/features/auth/components/form/LoginForm";
// import LoginImage from "@/app/features/auth/components/LoginImage";
import loginImage from "@/app/assets/images/loginImage.png";

const LoginPage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Section */}
      <div className="hidden md:flex flex-col w-1/2 items-center justify-center ">
        {/* <LoginImage /> */}
        <div>
          <img src={loginImage} className="w-96 h-auto" />
        </div>
        <div className="mt-8 max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
            Seamless Experience, Anytime, Anywhere
          </h2>
          <p className="text-gray-600 leading-relaxed text-center">
            Stay synced across all devices, both mobile and desktop. No matter
            where you are, enjoy a smooth and seamless experience.
          </p>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md p-6 sm:p-8">
          <Logo />
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
