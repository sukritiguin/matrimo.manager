import * as React from "react";
import { deleteUpload, getUploads, uploadFile } from "@/services/uploads.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addImageToCanvas } from "../fabric/fabric-utils";
import { useEditorStore } from "../store/useEditorStore";
import { useUploadStore } from "../store/useUploadStore";

export const useUploads = () => {
  const { canvas } = useEditorStore();
  const { setPreviewImage } = useUploadStore();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file) {
        uploadAFile(file);
      }
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleClickToUpload = () => {
    const input = document.createElement("input");
    input.style.display = "none";
    input.type = "file";
    input.accept = "image/*";

    input.click();

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement)?.files?.[0];
      if (file) {
        uploadAFile(file).finally(() => {
          input.remove();
        });
      }
    };
  };

  const handleClickToAddImage = (url: string) => {
    try {
      addImageToCanvas(canvas!, url);
      setPreviewImage(null);
    } catch (error) {
      console.error("Error adding image to canvas:", error);
    }
  };

  const { data } = useQuery({
    queryKey: ["events", "editor", "uploads"],
    queryFn: ({ queryKey }) => getUploads(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  const { mutateAsync: uploadAFile } = useMutation({
    mutationKey: ["events", "editor", "upload"],
    mutationFn: uploadFile,
    onSuccess: () => {
      console.log("File uploaded successfully");
      queryClient.invalidateQueries({
        queryKey: ["events", "editor", "uploads"],
      });
    },
  });

  //   Delete the file from the server
  const { mutateAsync: deleteAFile } = useMutation({
    mutationKey: ["events", "editor", "delete"],
    mutationFn: deleteUpload,
    onSuccess: () => {
      console.log("File deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["events", "editor", "uploads"],
      });
    },
  });

  const handleClickToDeleteImage = async (id: string) => {
    try {
      setPreviewImage(null);
      setTimeout(async () => {
        await deleteAFile(id);
      }, 500);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return {
    uploadHandler: {
      handleDrop,
      handleDragOver,
      handleDragEnter,
      handleDragLeave,
    },
    handleClickToUpload,
    handleClickToAddImage,
    handleClickToDeleteImage,
    uploads: data?.uploads || [],
  };
};
