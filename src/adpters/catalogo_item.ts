import type { CatalogoItem } from "@/types/CatalogoItem";

export const CatalogoItemAdapter = (catalogo: CatalogoItem, id_catalogo: number) => ({
  idCatalogo: id_catalogo,
  idCatalogoItem: catalogo.id_catalogo_item,
  itemNombre: catalogo.item_nombre,
  descripcion: catalogo.descripcion,
  estaActivo: catalogo.esta_activo,
});
