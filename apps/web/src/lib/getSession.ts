import { useSessionStore } from "@/store/sessionStore";

export const getSession = () => useSessionStore.getState();