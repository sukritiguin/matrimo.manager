import api from "./api";

import { TApiResponse, TCanvas } from "@/types";

const getCanvasById = (id: string): Promise<TApiResponse<{ canvas: TCanvas }>> => {
  return api.get(`/canvases/${id}`);
};

const createCanvas = (data: Partial<TCanvas>): Promise<TApiResponse<{ canvas: TCanvas }>> => {
  return api.post(`/canvases`, data);
};

const updateCanvas = (
  id: string,
  data: Partial<TCanvas>
): Promise<TApiResponse<{ canvas: TCanvas }>> => {
  return api.patch(`/canvases/${id}`, data);
};

const updateCanvasData = (
  id: string,
  data: Partial<TCanvas["data"]>
): Promise<TApiResponse<{ canvas: TCanvas }>> => {
  return api.patch(`/canvases/${id}/data`, data);
};

export { getCanvasById, createCanvas, updateCanvas, updateCanvasData };
