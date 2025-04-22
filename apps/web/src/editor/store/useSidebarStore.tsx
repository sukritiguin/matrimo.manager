import { create } from "zustand";

import { Grid, Pencil, Settings, Type, Upload } from "lucide-react";
import ElementsPanel from "@/editor/components/sidebar/ElementsPanel";
import DrawingsPanel from "@/editor/components/sidebar/DrawingsPanel";
import SettingsPanel from "@/editor/components/sidebar/SettingsPanel";
import TextPanel from "@/editor/components/sidebar/TextPanel";
import UploadsPanel from "@/editor/components/sidebar/UploadsPanel";

export const SidebarItems = [
  {
    id: "elements",
    icon: <Grid className="size-4" />,
    label: "Elements",
    panel: () => <ElementsPanel />,
  },
  {
    id: "text",
    icon: <Type className="size-4" />,
    label: "Text",
    panel: () => <TextPanel />,
  },
  {
    id: "uploads",
    icon: <Upload className="size-4" />,
    label: "Uploads",
    panel: () => <UploadsPanel />,
  },
  {
    id: "draw",
    icon: <Pencil className="size-4" />,
    label: "Draw",
    panel: () => <DrawingsPanel />,
  },
  {
    id: "settings",
    icon: <Settings className="size-4" />,
    label: "Settings",
    panel: () => <SettingsPanel />,
  },
] as const;

type TSidebarId = (typeof SidebarItems)[number]["id"];

interface SidebarStoreState {
  activeItem: TSidebarId | null;
}

interface SidebarStoreActions {
  setActiveItem: (id: TSidebarId | null) => void;
  onChangeActiveItem: (id: TSidebarId | null) => void;
  reset: () => void;
}

export const useSidebarStore = create<SidebarStoreState & SidebarStoreActions>((set, get) => ({
  activeItem: null,

  setActiveItem: (id) => set((state) => ({ activeItem: state.activeItem === id ? null : id })),

  onChangeActiveItem: (id) => {
    if (id === get().activeItem) {
      set({ activeItem: null });
    } else {
      set({ activeItem: id });
    }
  },

  reset: () =>
    set({
      activeItem: null,
    }),
}));
