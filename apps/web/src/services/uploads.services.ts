import api from "./api";

import { Upload } from "@/types/upload.types";
import { PaginatedMeta } from "@/types/common.types";

interface GetUploadResponse extends PaginatedMeta {
  uploads: Upload[];
}

export const getUploads = async (
  page: number = 1,
  limit: number = 10
): Promise<GetUploadResponse> => {
  const { data } = await api.get<GetUploadResponse>("/uploads", {
    params: {
      page,
      limit,
    },
  });
  return data;
};

export const getUpload = async (id: string): Promise<Upload> => {
  const { data } = await api.get<Upload>(`/uploads/${id}`);
  return data;
};

export const deleteUpload = async (id: string): Promise<void> => {
  await api.delete(`/uploads/${id}`);
};

export const uploadFile = async (file: File): Promise<Upload> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post<Upload>("/uploads", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
