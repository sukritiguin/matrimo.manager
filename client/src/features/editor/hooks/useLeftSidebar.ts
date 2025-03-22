import * as React from "react";
import { useDropzone } from "react-dropzone";
import { debounce } from "lodash";
import { ShapeElements, TextTemplates } from "../constants";

export const useLeftSidebar = () => {
  const [activeTab, setActiveTab] = React.useState("text");
  const [uploads, setUploads] = React.useState<File[]>([]);
  const [dragging, setDragging] = React.useState<string | null>(null);
  const [textTemplates, setTextTemplates] = React.useState(TextTemplates);
  const [shapeElements, setShapeElements] = React.useState(ShapeElements);

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();

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
      console.log("Uploads: ", uploads);
    }
  }, 200);

  // Tabs - text, uploads, elements, photos
  const onChangeTab = (tab: string) => {
    setActiveTab(tab);
  };

  // Handle file uploads
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    setUploads((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
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
    uploads,
    getRootProps,
    getInputProps,
    isDragActive,
    handleDragStart,
    handleDragEnd,
    textTemplates,
    shapeElements,
  };
};
