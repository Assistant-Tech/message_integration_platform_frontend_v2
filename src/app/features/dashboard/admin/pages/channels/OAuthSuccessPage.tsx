import { useEffect } from "react";

const OAuthSuccessPage = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const platform = params.get("platform");

    let token = params.get("token");
    const code = params.get("code");

    if (!token && code) {
      token = code;
    }

    if (token && token.includes("#")) {
      token = token.split("#")[0] as string;
    }

    if (token && window.opener) {
      window.opener.postMessage(
        {
          type: "OAUTH_SUCCESS",
          payload: { platform, token },
        },
        "*",
      );
    } else {
      console.error("No token or no opener");
    }

    setTimeout(() => {
      window.close();
    }, 500);
  }, []);

  return null;
};

export default OAuthSuccessPage;
