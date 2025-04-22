import { Upload } from "@/types/upload.types";
import { create } from "zustand";

interface UploadStoreState {
  previewImage: Upload | null;
}

interface UploadStoreActions {
  setPreviewImage: (url: Upload | null) => void;
  reset: () => void;
}

const initialState: UploadStoreState = {
  previewImage: null,
};

export const useUploadStore = create<UploadStoreState & UploadStoreActions>((set) => ({
  ...initialState,

  setPreviewImage: (url: Upload | null) => set({ previewImage: url }),

  reset: () => set({ ...initialState }),
}));
