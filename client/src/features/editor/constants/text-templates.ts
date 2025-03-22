import * as fabric from "fabric";

export type TextTemplate = {
  id: string;
  name: string;
  preview: string;
  options: Partial<fabric.TextboxProps>;
};

export const TextTemplates: TextTemplate[] = [
  {
    id: "heading",
    name: "Heading",
    preview: "Heading Text",
    options: { fontSize: 32, fontWeight: "bold", fill: "black" },
  },
  {
    id: "subheading",
    name: "Subheading",
    preview: "Subheading Text",
    options: { fontSize: 24, fontWeight: "600", fill: "black" },
  },
  {
    id: "body",
    name: "Body",
    preview: "Body Text",
    options: { fontSize: 18, fontWeight: "normal", fill: "#333" },
  },
  {
    id: "caption",
    name: "Caption",
    preview: "Caption Text",
    options: { fontSize: 14, fontWeight: "300", fill: "#666" },
  },
  {
    id: "quote",
    name: "Quote",
    preview: "Quote Text",
    options: { fontSize: 20, fontStyle: "italic", fill: "#444" },
  },
];
