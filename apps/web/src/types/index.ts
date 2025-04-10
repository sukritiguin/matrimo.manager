export type TUser = {
  id: string;
  name?: string;
  username?: string;
  verified: boolean;
  onBoarding: boolean;
};

export type TSession = {
  user?: TUser ;
  isAuthenticated: boolean;
  isInitailLoading: boolean;
};

export type TApiResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};
