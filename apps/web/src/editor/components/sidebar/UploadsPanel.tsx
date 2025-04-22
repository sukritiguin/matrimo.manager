import { PanelWrapper } from "./PanelWrapper";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { useUploadStore } from "@/editor/store/useUploadStore";
import { useUploads } from "@/editor/hooks/useUploads";

const UploadsPanel = () => {
  const { setPreviewImage } = useUploadStore();
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);

  const { handleClickToAddImage, handleClickToUpload, uploadHandler, uploads } = useUploads();

  return (
    <React.Fragment>
      <PanelWrapper key="uploads" className="flex flex-col h-full pt-4">
        <div
          className="h-[calc(100svh-3rem)] w-full"
          onDrop={uploadHandler.handleDrop}
          onDragOver={uploadHandler.handleDragOver}
          onDragEnter={uploadHandler.handleDragEnter}
          onDragLeave={uploadHandler.handleDragLeave}
        >
          {/* Uploads Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col gap-1">
              <h4 className="text-lg font-medium text-gray-800">Uploads</h4>
              <div className="text-xs text-muted-foreground">
                Drag and drop files here to upload
              </div>
            </div>
            <Button variant="outline" size="icon" className="size-8" onClick={handleClickToUpload}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {uploads.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {uploads.map((upload, index) => (
                <motion.div
                  layoutId={`upload-${upload.image.url}`}
                  key={upload.id}
                  className="relative flex flex-col items-center justify-center border p-1 rounded-md"
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <AnimatePresence>
                    {hoverIndex === index && (
                      <motion.div
                        className="absolute inset-0 p-1 rounded-md flex items-center justify-center bg-muted/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        {/* Add and Preview buttons */}
                        <motion.div className="flex flex-col gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleClickToAddImage(upload.image.url)}
                          >
                            Add
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPreviewImage(upload)}
                          >
                            Preview
                          </Button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="text-sm sr-only">{upload.image.fileName}</div>
                  <motion.img
                    layoutId={`img-${upload.imageId}`}
                    src={upload.image.url}
                    alt={upload.image.fileName}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <NoUploadsDisplay />
          )}
        </div>
      </PanelWrapper>
    </React.Fragment>
  );
};

const NoUploadsDisplay = () => {
  return (
    <div className="flex flex-col items-center justify-center h-60 py-4 px-2 border border-dashed border-gray-300 rounded-md bg-gray-50">
      <div className="text-gray-500 text-sm">No uploads yet</div>
      <div className="text-gray-400 text-xs">Drag and drop files here to upload</div>
    </div>
  );
};

export default UploadsPanel;
