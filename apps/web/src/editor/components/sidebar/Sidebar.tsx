import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { SidebarItems, useSidebarStore } from "@/editor/store/useSidebarStore";

export const Sidebar: React.FC = () => {
  const { activeItem, onChangeActiveItem } = useSidebarStore();

  return (
    <div className="flex h-full">
      <motion.aside className="flex bg-background flex-col items-center w-16 border-r-2 h-full overflow-hidden rounded-r-xs z-[100]">
        <div className="flex flex-col gap-6 py-6">
          {SidebarItems.map((item) => (
            <Button
              key={item.id}
              className="relative"
              variant="outline"
              size="icon"
              onClick={() => onChangeActiveItem(item.id)}
            >
              {activeItem === item.id && (
                <motion.div
                  layoutId="highlight"
                  className="absolute w-full h-full inset-0 bg-purple-300 rounded-md border border-purple-300"
                />
              )}
              <div className="p-3 relative text-purple-700">{item.icon}</div>
            </Button>
          ))}
        </div>
      </motion.aside>

      <AnimatePresence>{activeItem && <SidebarPanel />}</AnimatePresence>
    </div>
  );
};

const SidebarPanel: React.FC = () => {
  const item = SidebarItems.find((item) => item.id === useSidebarStore.getState().activeItem);

  if (!item) {
    return null;
  }

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.5 }}
      className="fixed h-[calc(100svh-6rem)] ml-16 top-24 z-50 flex-1 flex flex-col border-2 border-l-0 my-[1px] w-[18rem] rounded-r-md px-3 py-2 backdrop-blur-lg shadow-lg shadow-purple-300"
    >
      {item.panel()}
    </motion.div>
  );
};
