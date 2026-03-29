import { useEffect } from "react";

/*  
MOCK-TEST:
http://localhost:3000/api/v1/meta/oauth/callback?code=AQDG97QVpKj03EA0KnGcZmfD92SFzdC1Y-xJrawyVha7K_8GJCZd9mUb_8TgfkpP2chq26wRms-BQ-tZ2uKXRLnrIWux6WGSkz5tONvS7zToHpCHjb5VZh1xVy4dGfYxWSxgGLZzLm5DWU35DK7FQzXwLqNYyoyay5um2IZO0UyXHWXk7G8a2yg9XyO9QARUiCgFZ6Gt0FD_uXXU6pyrj6BtPoAoJC88ufv5__9LlcZ5RDXT2ZRX3xYO-8GggIxbaw9K2jYSFslLEn2mSAV4Sy782jfa5_FT2b_pJWPTbWYieFLyxLVJM5c1Zx-aEWLSXWiy3JVhtPRcJi0OIb-RYZG4qsV5LorEmQOa6UrMi0nq67vwUypyTEEAVELekDL12p6iEkyMQc3300ihlYA4h3IxBdR9Gy-aN1WLGBz_KrJsiXSQjKVcYpd5x5kn8wcQyjiGXb_ZGWaCGgE9Kug8qLT2&state=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJZCI6IjNmODE2NDQ3LWI4MDctNGZkOS04OTk1LTc0OTk3YzA1ODUyYSIsImlhdCI6MTc3NDYyMDcxMiwiZXhwIjoxNzc0NjIxNjEyfQ.VNGsCxOFYnGb9P2ffU46M5vJ-KLHj0lQ6UitY8GgLZU#_=_
 */
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
    }

    // No success dialog; close the popup immediately
    window.close();
  }, []);

  // Render nothing; this page is only used for the OAuth callback side-effect
  return null;
};

export default OAuthSuccessPage;
