import { TUser } from "./user.type";

export type TTemplate = {
  id: string;
  title: string;
  content?: string;
  tags?: string[];
  image?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TTemplateWithUser = TTemplate & {
  user: TUser;
};

export type TEditor = TTemplate & {
  data: Record<string, any>;
  isArchive: boolean;
  shareLink: string;
};
