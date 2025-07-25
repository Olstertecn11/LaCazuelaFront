import type { Catalogo } from "@/types/Catalogo";

export const CatalogoAdapter = (catalogo: Catalogo) => ({
  nombre: catalogo.nombre,
  descripcion: catalogo.descripcion,
  estaActivo: catalogo.esta_activo,
});
