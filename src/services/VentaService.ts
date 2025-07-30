import api from "./api";
import handleRequest from "../utils/handleRequest";
import type { Venta } from "@/types/Venta";
import type { Cart } from "@/types/Cart";

export const crearVenta = async (cart: Cart) =>
  await handleRequest<Venta>(() => api.post('/venta', cart));

export const obtenerHistorialVentas = async () =>
  await handleRequest<any>(() => api.get('/venta/historial'));

export const obtenerProductosMasVendidos = async () =>
  await handleRequest<any>(() => api.get('/venta/mas-vendidos'));

export const obtenerEstadisticasVentas = async () =>
  await handleRequest<any>(() => api.get('/venta/estadisticas'));
