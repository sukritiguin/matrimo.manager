import { useEffect } from "react";
import { createFileRoute, redirect, useParams } from "@tanstack/react-router";

import { queryClient } from "@/lib/utils";
import { queryOptions } from "@tanstack/react-query";

import { Editor } from "@/editor/components/Editor";
import { getEventById } from "@/services/events.services";
import { useEditorStore } from "@/editor/store/useEditorStore";

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

  useEffect(() => {
    return () => editor.reset();
  }, []);

  if (editorId) {
    return <Editor />;
  }
}
