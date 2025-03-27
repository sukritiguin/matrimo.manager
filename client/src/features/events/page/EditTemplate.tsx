import React from "react";
import { EditTemplate } from "../components/EditTemplate";

import { EditorCanvasActions } from "../contexts/EditorCanvasActions";
import { EditorCanvasProvider } from "../contexts/EditorCanvasProvider";
import { EditorCanvasKeyEvent } from "../contexts/EditorCanvasKeyEvents";
import { EditorTemplateProvider } from "../contexts/EditorTemplateProvider";
import { EditorCanvasElementActions } from "../contexts/EditorCanvasElementActions";
import { EditorCanvasServices } from "../contexts/EditorCanvasServices";

export const EditTemplatePage: React.FC = () => {
  return (
    <EditorTemplateProvider.Provider>
      <EditorCanvasProvider.Provider>
        <EditorCanvasActions.Provider>
          <EditorCanvasServices.Provider>
            <EditorCanvasKeyEvent.Provider>
              <EditorCanvasElementActions.Provider>
                <EditTemplate />
              </EditorCanvasElementActions.Provider>
            </EditorCanvasKeyEvent.Provider>
          </EditorCanvasServices.Provider>
        </EditorCanvasActions.Provider>
      </EditorCanvasProvider.Provider>
    </EditorTemplateProvider.Provider>
  );
};
