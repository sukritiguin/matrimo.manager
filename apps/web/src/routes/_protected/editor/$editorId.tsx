import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/editor/$editorId")({
  component: EditorPage,
});

function EditorPage() {
  const { editorId } = useParams({ from: "/_protected/editor/$editorId" });
  return (
    <div>
      <h1>Editor {editorId}</h1>
    </div>
  );
}
