import { useEffect, useRef, useState } from "react";
import { connectMetaApiPage } from "@/app/services/meta.services";

const OAuthSuccessPage = () => {
  const hasRunRef = useRef(false);
  const [status, setStatus] = useState<"processing" | "success" | "error">(
    "processing",
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const run = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(
        window.location.hash.replace(/^#/, ""),
      );

      const platform = searchParams.get("platform");

      // TikTok: credentials already saved by backend callback — just show success
      if (platform === "tiktok") {
        setStatus("success");
        setTimeout(() => window.close(), 1500);
        return;
      }

      // Meta: extract selectionCode and finalize page storage
      let token: string | null =
        searchParams.get("token") ??
        searchParams.get("code") ??
        searchParams.get("access_token") ??
        hashParams.get("token") ??
        hashParams.get("code") ??
        hashParams.get("access_token");

      if (token) token = token.split("#")[0]?.split("?")[0]?.trim() ?? token;

      if (!token) {
        setStatus("error");
        setErrorMessage("No token returned from the provider.");
        setTimeout(() => window.close(), 2000);
        return;
      }

      try {
        const res = await connectMetaApiPage(token);
        if (res?.success) {
          setStatus("success");
          setTimeout(() => window.close(), 1500);
        } else {
          setStatus("error");
          setErrorMessage(res?.message || "Failed to connect.");
          setTimeout(() => window.close(), 2000);
        }
      } catch (err: any) {
        setStatus("error");
        setErrorMessage(err?.response?.data?.message || "Failed to connect.");
        setTimeout(() => window.close(), 2000);
      }
    };

    run();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-white px-4">
      <div className="max-w-md w-full text-center space-y-3">
        {status === "processing" && (
          <>
            <h1 className="h4-bold-24 text-grey">Connecting your account…</h1>
            <p className="label-regular-14 text-grey-medium">
              Please wait while we link your pages.
            </p>
          </>
        )}
        {status === "success" && (
          <>
            <h1 className="h4-bold-24 text-success-dark">Connected!</h1>
            <p className="label-regular-14 text-grey-medium">
              Pages linked. This window will close automatically.
            </p>
          </>
        )}
        {status === "error" && (
          <>
            <h1 className="h4-bold-24 text-danger">Connection failed</h1>
            <p className="label-regular-14 text-grey-medium">
              {errorMessage || "Something went wrong. Please try again."}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default OAuthSuccessPage;
