const constants = {
  API_URL: import.meta.env.VITE_API_URL,
  APP_NAME: import.meta.env.VITE_APP_NAME,

  CATALOGO_BEBIDAS: Number(import.meta.env.VITE_CATALOGO_BEBIDAS),
  CATALOGO_MASA: Number(import.meta.env.VITE_CATALOGO_MASA),
  CATALOGO_RELLENO: Number(import.meta.env.VITE_CATALOGO_RELLENO),
  CATALOGO_ENVOLTURA: Number(import.meta.env.VITE_CATALOGO_ENVOLTURA),
  CATALOGO_PICANTE: Number(import.meta.env.VITE_CATALOGO_PICANTE),
  CATALOGO_TAMANIO_BEBIDA: Number(import.meta.env.VITE_CATALOGO_TAMANIO_BEBIDA),
  CATALOGO_ENDULZANTE: Number(import.meta.env.VITE_CATALOGO_ENDULZANTE),
  CATALOGO_TOPPINGS: Number(import.meta.env.VITE_CATALOGO_TOPPINGS),
  CATALOGO_TAMANIO_TAMAL: Number(import.meta.env.VITE_CATALOGO_TAMANIO_TAMAL),
  CATALOGO_COMBO: Number(import.meta.env.VITE_CATALOGO_COMBO),
  CATALOGO_EVENTO: Number(import.meta.env.VITE_CATALOGO_EVENTO),
};

export default constants;
