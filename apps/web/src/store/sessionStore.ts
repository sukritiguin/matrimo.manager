import { create } from "zustand";

interface ISessionState {
  accessToken: string | null;
  isInitailLoading: boolean;
}

interface ISessionStore extends ISessionState {
  setAccessToken: (accessToken: string) => void;
  setIsInitailLoading: (isInitailLoading: boolean) => void;
  clearAccessToken: () => void;
  reset: () => void;
}

const initialState: ISessionState = {
  accessToken: null,
  isInitailLoading: true,
};

export const useSessionStore = create<ISessionStore>((set) => ({
  ...initialState,
  
  setAccessToken: (accessToken: string) => set({ accessToken }),
  clearAccessToken: () => set({ accessToken: null }),

  setIsInitailLoading: (isInitailLoading: boolean) => set({ isInitailLoading }),
  
  reset: () => set(initialState),
}));
