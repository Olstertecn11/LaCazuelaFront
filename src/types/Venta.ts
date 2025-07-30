export interface Venta {
  id_venta?: number;         // Opcional si lo genera la DB
  id_usuario_fk: number;
  fh_ingreso?: string;       // ISO string si viene de timestamp
  monto: number;
}
