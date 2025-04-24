import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useEditorStore } from "@/editor/store/useEditorStore";
import { useRouter } from "@tanstack/react-router";

export const Menu = () => {
  const { exportCanvas } = useEditorStore();
  const router = useRouter();
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="px-4">File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onSelect={() => {}}>
            Save
            <MenubarShortcut>Ctrl+S</MenubarShortcut>
          </MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Export</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem onSelect={exportCanvas.asImage}>Export as Image</MenubarItem>
              <MenubarItem onSelect={() => console.log("Export as PDF clicked")}>
                Export as PDF
              </MenubarItem>
              <MenubarItem onSelect={exportCanvas.asSvg}>Export as SVG</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem onSelect={() => router.navigate({ to: "/library" })}>Exit</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="px-4">Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onSelect={() => {}}>
            Undo <MenubarShortcut>Ctrl+Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onSelect={() => {}}>
            Redo <MenubarShortcut>Ctrl+Y</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onSelect={() => {}}>
            Cut <MenubarShortcut>Ctrl+X</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onSelect={() => {}}>
            Copy <MenubarShortcut>Ctrl+C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onSelect={() => {}}>
            Paste <MenubarShortcut>Ctrl+V</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="px-4">View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onSelect={() => {}}>
            Zoom In <MenubarShortcut>Ctrl++</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onSelect={() => {}}>
            Zoom Out <MenubarShortcut>Ctrl+-</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onSelect={() => {}}>
            Reset Zoom <MenubarShortcut>Ctrl+0</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onSelect={() => {}}>
            Fullscreen <MenubarShortcut>F11</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onSelect={() => {}}>
            Toggle Grid <MenubarShortcut>G</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onSelect={() => {}}>
            Toggle Rulers <MenubarShortcut>R</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
