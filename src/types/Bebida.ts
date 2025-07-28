export interface Bebida {
  id_bebida: number;
  id_tipo_bebida: number;
  id_tamanio_fk: number;
  id_endulzante_fk: number;
  id_topping_fk: number;
  precio: number;
  inventario: number;
  cantidad?: number;
}
