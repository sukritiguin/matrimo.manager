import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/seperator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@radix-ui/react-label";
import { ChevronDown, Save, Share2 } from "lucide-react";
import { useCanvasStore } from "../stores/useCanvasStore";
import { UndoRedo } from "./UndoRedo";
import React from "react";
import { CirCulerStack } from "../utils/stack";
import * as fabric from "fabric";
import { ExportFormat } from "../constants";

export const EditorHeader: React.FC = () => {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4"></div>
        <div className="flex items-center gap-2">
          {/* <UndoRedo history={history} undo={undo} redo={redo} /> */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                Export <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
              //   onClick={() => exportCanvas("png")}
              >
                PNG Image
              </DropdownMenuItem>
              {/* <DropdownMenuItem onClick={() => exportCanvas("jpeg")}>JPEG Image</DropdownMenuItem> */}
              {/* <DropdownMenuItem onClick={() => exportCanvas("json")}>
                JSON Document
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-1">
                <Share2 className="h-4 w-4" /> Share
              </Button>
            </SheetTrigger>
            <SheetContent className="p-4">
              <SheetHeader>
                <SheetTitle>Share Your Invitation</SheetTitle>
                <SheetDescription>
                  Choose how you want to share your invitation with others.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="link">Invitation Link</Label>
                  <div className="flex items-center gap-2">
                    <Input id="link" value="https://matrimo.com/i/abc123" readOnly />
                    <Button variant="outline" size="sm" onClick={() => console.log("Copy link")}>
                      Copy
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="grid gap-2">
                  <Label>Share to Social Media</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      className="gap-1"
                      //   onClick={() => handleShare("facebook")}
                    >
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      className="gap-1"
                      //   onClick={() => handleShare("twitter")}
                    >
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      className="gap-1"
                      //   onClick={() => handleShare("instagram")}
                    >
                      Instagram
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="grid gap-2">
                  <Label>Send via Email</Label>
                  <Textarea placeholder="Enter email addresses separated by commas" />
                  <Button onClick={() => console.log("Send emails")}>Send Invitation</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Button onClick={() => console.log("Save design")}>
            <Save className="h-4 w-4 mr-2" /> Save
          </Button>
        </div>
      </div>
    </header>
  );
};
