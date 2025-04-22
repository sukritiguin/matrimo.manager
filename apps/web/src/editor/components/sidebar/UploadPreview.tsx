import { Button } from "@/components/ui/button";
import { useUploads } from "@/editor/hooks/useUploads";
import { useUploadStore } from "@/editor/store/useUploadStore";
import { useClickOutside } from "@/hooks/useClickOutSide";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export const UploadPreview: React.FC = () => {
  const { previewImage, setPreviewImage } = useUploadStore();
  const ref = useClickOutside(() => {
    setPreviewImage(null);
  });
  const { handleClickToAddImage, handleClickToDeleteImage } = useUploads();

  return (
    <AnimatePresence>
      {previewImage && (
        <motion.div className="absolute inset-0 flex z-[200] bg-black/10 backdrop-blur-sm items-center justify-center p-4">
          <div ref={ref} className="flex flex-col gap-4 items-center justify-center">
            <motion.div
              className="max-w-[400px] shadow-lg relative"
              layoutId={`upload-${previewImage.imageId}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                layoutId={`img-${previewImage.imageId}`}
                src={previewImage.image.url}
                alt="Preview"
                className="rounded-md"
              />
              <Button
                variant="outline"
                size="icon"
                className="top-2 right-2 absolute"
                onClick={() => setPreviewImage(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeIn" }}
              className="flex justify-between items-center w-full px-4"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleClickToAddImage(previewImage.image.url)}
              >
                Add to Canvas
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleClickToDeleteImage(previewImage.id)}
              >
                Delete Image
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
