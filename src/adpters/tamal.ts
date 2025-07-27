import type { Tamal } from "@/types/Tamal";
export const TamalAdapter = (tamal: Tamal) => ({
  idTipoMasaFk: tamal.id_tipo_masa_fk,
  idRellenoFk: tamal.id_relleno_fk,
  idEnvolturaFk: tamal.id_envoltura_fk,
  idNivelPicante: tamal.id_nivel_picante,
  precio: tamal.precio,
  inventario: tamal.inventario,
});
