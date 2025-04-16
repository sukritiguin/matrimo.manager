export type TUser = {
  id: string;
  name?: string;
  username?: string;
  verified: boolean;
  onBoarding: boolean;
};

export type TSession = {
  user?: TUser;
  isAuthenticated: boolean;
  isInitailLoading: boolean;
};

export type TApiResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};

export type TImage = {
  id: number;
  url: string;
  filename: string;
  mimetype: string;
  createdAt: Date;
};

export type TOwner = {
  id: number;
  name: null;
  username: null;
  createdAt: Date;
  image: TImage;
};

export type TCategory = {
  id: number;
  name: string;
};

export type TCanvas = {
  id: string;
  title: null;
  data: string;
  width: number;
  height: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TEvent = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  canvasId: string;
  canvas: TCanvas;
  category: TCategory;
  images: TImage[];
  owner: TOwner;
};
