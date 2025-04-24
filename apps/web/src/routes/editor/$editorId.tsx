import { useEffect } from "react";
import { createFileRoute, redirect, useParams } from "@tanstack/react-router";

import { queryClient } from "@/lib/utils";
import { queryOptions } from "@tanstack/react-query";

import { Editor } from "@/editor/components/Editor";
import { getEventById } from "@/services/events.services";
import { useEditorStore } from "@/editor/store/useEditorStore";
import { useSidebarStore } from "@/editor/store/useSidebarStore";
import { useUploadStore } from "@/editor/store/useUploadStore";
import { useObjectProperties } from "@/editor/store/usePropertiesStore";
import { useCanvasHistoryStore } from "@/editor/store/useCanvasHistory";

export const Route = createFileRoute("/editor/$editorId")({
  loader: ({ context, location, params }) => {
    const isAuthenticated = context.session?.isAuthenticated;

    if (!isAuthenticated) {
      throw redirect({
        to: "/auth/signin",
        search: { callback: location.pathname },
      });
    }

    queryClient.ensureQueryData(
      queryOptions({
        queryKey: ["event", params.editorId],
        queryFn: () => getEventById(params.editorId),
        refetchOnWindowFocus: false,
        refetchInterval: 15 * 60 * 1000,
      })
    );
  },
  component: EditorPage,
  errorComponent: () => <div>404</div>,
  pendingComponent: () => <p>Loading...</p>,
});

function EditorPage() {
  const { editorId } = useParams({ from: "/editor/$editorId" });
  const editor = useEditorStore();
  const editorSidebar = useSidebarStore();
  const uploadStore = useUploadStore();
  const propertiesStore = useObjectProperties();
  const historyStore = useCanvasHistoryStore();

  useEffect(() => {
    return () => {
      editor.reset();
      editorSidebar.reset();
      uploadStore.reset();
      propertiesStore.reset();
      historyStore.reset();
    };
  }, []);

  if (editorId) {
    return <Editor />;
  }
}
