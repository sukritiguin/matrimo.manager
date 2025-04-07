import qs from "querystring";
import config from "../config/env.config.js";
import axios from "axios";

export const getGoogleOAuthURL = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    redirect_uri: config.oauth.GOOGLE_OAUTH_REDIRECT_URL,
    client_id: config.oauth.GOOGLE_OAUTH_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: ["openid", "profile", "email"].join(" "),
  };

  return `${rootUrl}?${qs.stringify(options)}`;
};

export const getTokens = async (code: string) => {
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: config.oauth.GOOGLE_OAUTH_CLIENT_ID,
    client_secret: config.oauth.GOOGLE_OAUTH_CLIENT_SECRET,
    redirect_uri: config.oauth.GOOGLE_OAUTH_REDIRECT_URL,
    grant_type: "authorization_code",
  };

  const res = await axios.post(url, qs.stringify(values), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return res.data;
};
