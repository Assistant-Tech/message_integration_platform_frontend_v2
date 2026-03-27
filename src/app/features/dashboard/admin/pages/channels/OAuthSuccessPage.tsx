import { Button } from "@/app/components/ui";
import { useEffect } from "react";

const OAuthSuccessPage = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const platform = params.get("platform");
    let token = params.get("token");

    if (token && token.includes("#")) {
      token = token.split("#")[0] as string;
    }

    if (token && window.opener) {
      window.opener.postMessage(
        {
          type: "OAUTH_SUCCESS",
          payload: { platform, token },
        },
        window.location.origin,
      );

      const timeout = setTimeout(() => {
        window.close();
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-primary absolute inset-0 animate-pulse rounded-full blur-3xl" />
      <div className="from-base-white to-base-white/40 relative flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br shadow-lg">
        <img
          src="/chatblix_icon.svg"
          alt="ChatBlix Icon"
          width={100}
          height={100}
        />
      </div>
      <div className="text-center flex flex-col items-center justify-center">
        <h2 className="text-grey text-2xl font-semibold">Success!</h2>
        <p className="text-grey-medium mt-2">
          Your account is connected. Closing this window...
        </p>
        <Button
          label="Close Window"
          onClick={() => window.close()}
          variant="primary"
        />
      </div>
    </div>
  );
};

export default OAuthSuccessPage;
