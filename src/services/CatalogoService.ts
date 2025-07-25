// services/catalogoService.ts
import api from "./api";
import handleRequest from "../utils/handleRequest";
import type { Catalogo } from "../types/Catalogo";

export const getCatalogos = async () => {
  return handleRequest<Catalogo[]>(() => api.get("/Catalogo"));
};

export const createCatalogo = async (catalogo: any) => {
  return handleRequest<Catalogo>(() => api.post("/Catalogo", catalogo));
};
