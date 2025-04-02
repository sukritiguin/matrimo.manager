import * as React from "react";
import { useDropzone } from "react-dropzone";
import { debounce } from "lodash";
import { ShapeElements, TextTemplates } from "../constants";
import { getUploadFiles, uploadFile } from "@/services/editor.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Photo, PhotosWithTotalResults } from "pexels";

export const useEditorCanvasSidbar = () => {
  const [activeTab, setActiveTab] = React.useState("text");
  const [dragging, setDragging] = React.useState<string | null>(null);
  const [textTemplates, setTextTemplates] = React.useState(TextTemplates);
  const [shapeElements, setShapeElements] = React.useState(ShapeElements);
  const [stockPhotos, setStockPhotos] = React.useState<any[]>([]);
  const [photoQuery, setPhotoQuery] = React.useState("nature"); // Default query

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setPhotoQuery(query); // Update the query state

    if (activeTab === "text") {
      setTextTemplates((prev) =>
        query
          ? prev.filter(
              (item) =>
                item.name.toLowerCase().includes(query) ||
                item.preview.toLowerCase().includes(query)
            )
          : TextTemplates
      );
    }

    if (activeTab === "elements") {
      setShapeElements((prev) =>
        query
          ? prev.filter(
              (item) => item.name.toLowerCase().includes(query) || item.type.includes(query)
            )
          : ShapeElements
      );
    }

    if (activeTab === "uploads") {
      // Handle file upload logic here
      console.log("Uploads: ", data);
    }

    if (activeTab == "photos") {
      console.log("Photo search :: ", query);
      setStockPhotos((prev) =>
        query
          ? prev.filter(
              (item) => item.name.toLowerCase().includes(query) || item.type.includes(query)
            )
          : []
      );
    }
  }, 200);

  // Tabs - text, uploads, elements, photos
  const onChangeTab = (tab: string) => {
    setActiveTab(tab);
  };

  const queryClient = useQueryClient();
  const { mutate: uploadNewFile } = useMutation({
    mutationKey: ["upload", "new"],
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["uploads"] });
    },
  });

  const { data: pexelsApiData } = useQuery({
    queryKey: ["photos", "stock", photoQuery],
    queryFn: async () => {
      const res = await fetch(`https://api.pexels.com/v1/search?query=${photoQuery}?per_page=10`, {
        headers: {
          Authorization: import.meta.env.VITE_PIXEL_API_KEY,
        },
      });

      return (await res.json()) as PhotosWithTotalResults;
    },
    enabled: activeTab === "photos" && photoQuery.length > 0,
  });

  const { data } = useQuery({
    queryKey: ["uploads"],
    queryFn: () => getUploadFiles(),
    refetchInterval: false, // refetch every minute
  });

  // Handle file uploads
  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        uploadNewFile(acceptedFiles[0]);
      }
    },
    [uploadNewFile]
  );

  const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".svg"],
    },
  });

  // Handle drag start for elements
  const handleDragStart = (event: React.DragEvent, type: string, data: any) => {
    event.dataTransfer.setData("text/plain", JSON.stringify({ type, data }));
    setDragging(data.id);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDragging(null);
  };

  return {
    handleSearch,
    dragging,
    activeTab,
    onChangeTab,
    uploads: data?.uploads || [],
    inputRef,
    getRootProps,
    getInputProps,
    isDragActive,
    handleDragStart,
    handleDragEnd,
    textTemplates,
    shapeElements,
    stockPhotos: pexelsApiData?.photos,
  };
};
