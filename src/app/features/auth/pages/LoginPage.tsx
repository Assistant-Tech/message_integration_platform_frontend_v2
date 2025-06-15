import { Logo } from "@/app/components/ui";
import LoginForm from "@/app/features/auth/components/form/LoginForm";
import LoginImage from "@/app/features/auth/components/LoginImage";

const LoginPage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-muted">
        <LoginImage />
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
