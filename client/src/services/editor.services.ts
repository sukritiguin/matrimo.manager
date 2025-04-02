import {
  CreateEditorSchema,
  RenameEditorSchema,
  UpdateEditorSchema,
} from "@/schemas/editor.schema";
import { TUpload } from "@/types/canvas";
import { TEditor, TTemplate, TTemplateWithUser } from "@/types/template";
import axios, { AxiosError } from "axios";

const editorApi = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1`,
  withCredentials: true,
});

editorApi.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

editorApi.interceptors.response.use(
  (response) => {
    return response.data.data;
  },
  (error) => {
    if (error instanceof AxiosError) {
      console.log("Editor response error :: ", error.response?.data.message);
      return Promise.reject(error.response?.data);
    }
    if (error instanceof Error) {
      console.log("Editor request error :: ", error.message);
      return Promise.reject(error);
    }
    return Promise.reject(new Error("An unknown error occurred"));
  }
);

export const createNewEditor = (data: CreateEditorSchema) => {
  return editorApi.post(`/editors`, data);
};

export const getEditors = (): Promise<{ editors: TTemplate[] }> => {
  return editorApi.get(`/editors`);
};

export const getEditorById = (editorId: string): Promise<{ editor: TEditor }> => {
  return editorApi.get(`/editors/${editorId}`);
};

export const updateEditor = (editorId: string, data: UpdateEditorSchema) => {
  return editorApi.patch(`/editors/${editorId}`, data);
};

export const deleteEditor = (editorId: string) => {
  return editorApi.delete(`/editors/${editorId}`);
};

export const renameEditor = (editorId: string, data: RenameEditorSchema) => {
  return editorApi.post(`/editors/${editorId}/rename`, data);
};

export const saveEditor = (editorId: string, data: FormData) => {
  return editorApi.post(`/editors/${editorId}/save`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getUploadFiles = (): Promise<{ uploads: TUpload[] }> => {
  return editorApi.get("/editors/uploads");
};

export const uploadFile = (image: File) => {
  const formData = new FormData();
  formData.append("image", image);
  return editorApi.post(`/editors/uploads`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteUpload = (uploadId: string) => {
  return editorApi.delete(`/editors/uploads/${uploadId}`);
};

export const downloadFile = (uploadId: string) => {
  return editorApi.get(`/editors/uploads/${uploadId}/download`, {
    responseType: "blob",
  });
};

export const getAllArchives = () => {
  return editorApi.get(`/editors/archives`);
};

export const getArchiveByEditorId = (editorId: string) => {
  return editorApi.get(`/editors/archives/${editorId}`);
};

export const toggleArchive = (editorId: string) => {
  return editorApi.post(`/editors/archives/${editorId}`);
};

export const deleteArchive = (editorId: string) => {
  return editorApi.delete(`/editors/archives/${editorId}`);
};

// TODO: Implement share and download endpoints
// export const shareEditor = (editorId: string) => {
//   return editorApi.get(`/editors/${editorId}/share`);
// };

// export const downloadEditor = (editorId: string) => {
//     return editorApi.get(`/editors/${editorId}/download`, {
//     responseType: "blob",
//   });
// }
