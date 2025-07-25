import api from "./api";
import handleRequest from "../utils/handleRequest";
import type { Bebida } from "@/types/Bebida";

export const getBebidas = async () => {
  return handleRequest<Bebida[]>(() => api.get("/Bebida"));
};

export const createBebida = async (bebida: any) => {
  return handleRequest<Bebida>(() => api.post("/Bebida", bebida));
};
