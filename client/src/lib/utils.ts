import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { Canvas } from "fabric";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Auth routes
export const AuthRoutes = ["/auth/login", "/auth/verify"];

// For redux
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// Empty editor canvas
const emptyEditorCanvas = new Canvas();
