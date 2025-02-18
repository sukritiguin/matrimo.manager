import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { Button } from "../ui/button";

import googleIcon from "./../../assets/googleIcon.svg";
import { userGoogleLogin } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const GoogleLoginButton = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
      <LoginButton />
    </GoogleOAuthProvider>
  );
};

const LoginButton = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: googleLogin } = useMutation({
    mutationKey: ["user", "login", "google"],
    mutationFn: userGoogleLogin,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      navigate("/");
    },
  });

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      googleLogin(tokenResponse.access_token);
    },
    onError: (error) => console.error(error),
  });

  return (
    <div className="text-center">
      <Button
        onClick={() => login()}
        className="w-full bg-[#8B0000] text-white font-bold py-3 rounded-lg"
      >
        <img src={googleIcon} alt="Google Icon" width={36} height={36} /> Sign
        in with Google
      </Button>
    </div>
  );
};
