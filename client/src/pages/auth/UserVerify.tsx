import { userVerify } from "@/services/auth.service";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const UserVerify = () => {
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setErrorMessage("Token is required");
      return;
    }
    userVerify(token)
      .then(() => {
        setSuccessMessage("User verified!");
      })
      .catch((err) => {
        setErrorMessage("User verification failed");
      })
      .finally(() => {
        setTimeout(() => {
          navigate("/");
        }, 5000);
      });
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex justify-center items-center p-4 border-2 shadow-2xl rounded-lg">
        {successMessage && (
          <div className="text-emerald-500 text-2xl">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="text-red-500 text-2xl">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};
