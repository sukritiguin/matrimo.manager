import React from "react";
import { SessionContext } from "@/providers/session-provider";

export const useSession = () => {
  return React.useContext(SessionContext);
};
