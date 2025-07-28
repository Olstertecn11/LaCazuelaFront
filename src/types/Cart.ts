import type { Tamal } from "./Tamal";
import type { Bebida } from "./Bebida";

export type CartItem<T> = {
  producto: T;
  cantidad: number;
};

export type Cart = {
  fh_ingreso: string;
  id_usuario_fk: number;
  items: {
    tamales: Tamal[];
    bebidas: Bebida[];
  };
  total: number;
};
