
export interface Tamal {
  id_tamal: number;
  id_tipo_masa_fk: number;
  id_relleno_fk: number;
  id_envoltura_fk: number;
  id_nivel_picante: number;
  precio: number;
  inventario: number;
  count?: number
}
