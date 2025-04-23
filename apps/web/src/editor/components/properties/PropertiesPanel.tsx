import { useEditorStore } from "@/editor/store/useEditorStore";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SizeAndPositionSection } from "./SizeAndPostionSection";
import { useObjectProperties } from "@/editor/store/usePropertiesStore";
import { StyleSection } from "./StyleSection";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { TextSection } from "./TextSection";
import { isTextObject } from "@/editor/constants";

export const PropertiesPanel: React.FC = () => {
  const { showPropertiesPanel } = useEditorStore();
  const { selectedObject } = useObjectProperties();

  const defaultAccordionValue =
    selectedObject && isTextObject(selectedObject) ? "text" : "size-position";

  return (
    <AnimatePresence>
      {showPropertiesPanel && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.5 }}
          className="fixed right-0 w-[20rem] flex flex-1 flex-col gap-2 overflow-y-scroll z-50 border-2 h-[calc(100svh-6.5rem)] border-r-0 my-[1px] rounded-l-md backdrop-blur-lg shadow-lg shadow-purple-300 no-scrollbar"
        >
          <div className="flex gap-4 items-center px-3 border-b">
            <h2 className="py-2 font-bold">Properties</h2>
            <span className="text-xs py-1 px-2 -mb-0.5 rounded-lg border bg-muted text-muted-foreground">
              {selectedObject?.type}
            </span>

            <Button
              variant="outline"
              size="icon"
              onClick={() => useEditorStore.setState({ showPropertiesPanel: false })}
              className="ml-auto"
            >
              <XIcon className="size-4" />
            </Button>
          </div>

          <div className="flex flex-col gap-2 px-3 overflow-y-scroll no-scrollbar pb-2">
            <div className="flex flex-col gap-2">
              <Accordion type="single" collapsible defaultValue={defaultAccordionValue}>
                {isTextObject(selectedObject) && (
                  <AccordionItem value="text">
                    <AccordionTrigger>Text Properties</AccordionTrigger>
                    <AccordionContent>
                      <TextSection />
                    </AccordionContent>
                  </AccordionItem>
                )}
                <AccordionItem value="size-position">
                  <AccordionTrigger>Size & Position</AccordionTrigger>
                  <AccordionContent>
                    <SizeAndPositionSection />
                  </AccordionContent>
                </AccordionItem>
                {!isTextObject(selectedObject) && (
                  <AccordionItem value="style">
                    <AccordionTrigger>Style</AccordionTrigger>
                    <AccordionContent>
                      <StyleSection />
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
