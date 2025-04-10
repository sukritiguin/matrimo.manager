import * as React from "react";

interface FormErrorMessageProps {
  isError: boolean;
  error?: string;
}

export const FormErrorMessage: React.FC<FormErrorMessageProps> = ({
  isError,
  error,
}) => {
  if (!isError || !error) return null;

  return (
    <div className="flex items-center justify-between border rounded-md px-3 py-1 bg-destructive/20 border-destructive/40">
      <p className="text-destructive text-sm">{error}</p>
    </div>
  );
};

interface FormSuccessMessageProps {
  isSuccess: boolean;
  message: string;
}

export const FormSuccessMessage: React.FC<FormSuccessMessageProps> = ({
  isSuccess,
  message,
}) => {
  if (!isSuccess || !message) return null;

  return (
    <div className="flex items-center justify-between border rounded-md px-3 py-1 bg-emerald-600 border-emerald-300">
      <p className="text-emerald-500 text-sm">{message}</p>
    </div>
  );
};
