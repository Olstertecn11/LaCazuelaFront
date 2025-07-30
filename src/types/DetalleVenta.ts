export interface DetalleVenta {
  id_detalle_venta?: number; // Opcional si lo genera la DB
  id_venta_fk: number;
  id_producto_fk: number;
  id_tipo_producto: number;
  cantidad: number;
  precio: number;
}
