import { Logo } from "@/app/components/ui";
import verify from "@/app/assets/images/IllustrationVerify.png";

const VerifyEmail = () => {
  return (
    <div className="max-w-screen max-h-screen">
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <Logo />
        <img src={verify} alt="verify.png" className="mt-10" />

        <article className="space-y-4 text-center py-8">
          <h1 className="h3-bold-32 text-base-black">
            Verify you Email Address
          </h1>
          <p className="body-regular-16 text-grey-medium">
            We’ve sent a verification link to abc@gmail.com. Please verify your
            email address by clicking on the link provided there. Once verified,
            you can then start using our app.
          </p>
          <h5 className="h5-regular-16 text-grey-medium">
            Didn’t get the email?{" "}
            <span className="text-primary underline cursor-pointer">
              Resend?
            </span>
          </h5>
        </article>
      </div>
    </div>
  );
};

export default VerifyEmail;
