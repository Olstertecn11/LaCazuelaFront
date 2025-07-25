import type { Bebida } from "@/types/Bebida"
export const BebidaAdapter = (bebida: Bebida) => (
  {
    idBebida: bebida.id_bebida,
    idTipoBebida: bebida.id_tipo_bebida,
    idTamanioFk: bebida.id_tamanio_fk,
    idToppingFk: bebida.id_topping_fk,
    precio: bebida.precio,
    inventario: bebida.inventario,
  }
)
