import { FabricObject, FabricObjectProps } from "fabric";

export type ShapeElement = {
  id: string;
  name: string;
  type: string;
  options: Partial<FabricObject>;
  style: React.CSSProperties;
};

export const ShapeElements: ShapeElement[] = [
  {
    id: "1",
    name: "Rectangle",
    type: "rect",
    options: { width: 100, height: 60, fill: "blue", stroke: "black", strokeWidth: 2 },
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
      padding: "10px",
      borderRadius: "5px",
      cursor: "pointer",
      userSelect: "none",
      pointerEvents: "none",
      zIndex: 1000,
      border: "2px solid black",
      width: "50px",
      height: "30px",
      backgroundColor: "rgba(0,0,0,0.8)",
    },
  },
  {
    id: "2",
    name: "Circle",
    type: "circle",
    options: { fill: "red", stroke: "black", strokeWidth: 2 },
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
      backgroundColor: "rgba(0,0,0,0.8)",
      padding: "10px",
      borderRadius: "50%",
      cursor: "pointer",
      userSelect: "none",
      pointerEvents: "none",
      border: "2px solid black",
      width: "40px",
      height: "40px",
      zIndex: 1000,
    },
  },
  {
    id: "3",
    name: "Triangle",
    type: "triangle",
    options: { width: 80, height: 80, fill: "green", stroke: "black", strokeWidth: 2 },
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.8)",
      zIndex: 1000,
      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
      width: "40px",
      height: "40px",
    },
  },
  {
    id: "4",
    name: "Line",
    type: "line",
    options: { width: 100, height: 2, fill: "black" },
    style: {
      backgroundColor: "black",
      height: "2px",
    },
  },
  {
    id: "5",
    name: "Star",
    type: "star",
    options: { width: 100, height: 100, fill: "yellow", stroke: "black", strokeWidth: 2 },
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
      backgroundColor: "rgba(0,0,0,0.8)",
      padding: "10px",
      borderRadius: "50%",
      cursor: "pointer",
      userSelect: "none",
      pointerEvents: "none",
      zIndex: 1000,
      clipPath:
        "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
      width: "50px",
      height: "50px",
      transform: "rotate(45deg)",
    },
  },
];
