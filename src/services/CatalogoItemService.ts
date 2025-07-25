import api from "./api";
import handleRequest from "../utils/handleRequest";
import type { CatalogoItem } from "@/types/CatalogoItem";

export const getCatalogosItem = async () => {
  return handleRequest<CatalogoItem[]>(() => api.get("/CatalogoItem"));
};

export const getCatalogoItemByParentId = async (id_catalogo: number) => {
  return handleRequest<CatalogoItem[]>(() =>
    // the route is CatalogoItem/catalogo/10
    api.get(`/CatalogoItem/catalogo/${id_catalogo}`)
  );
}

export const createCatalogoItem = async (catalogo: any) => {
  return handleRequest<CatalogoItem>(() => api.post("/CatalogoItem", catalogo));
};
