import { useEffect, useState } from "react";

const OAuthErrorPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [platform, setPlatform] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPlatform(params.get("platform") || "Unknown");
    setErrorMessage(
      params.get("message") || "Something went wrong. Please try again.",
    );
    setTimeout(() => window.close(), 3000);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-white px-4">
      <div className="max-w-md w-full text-center space-y-3">
        <h1 className="h4-bold-24 text-danger">Connection failed</h1>
        <p className="label-regular-14 text-grey-medium">
          {platform}: {errorMessage}
        </p>
        <p className="label-regular-14 text-grey-light">
          This window will close automatically.
        </p>
      </div>
    </div>
  );
};

export default OAuthErrorPage;
