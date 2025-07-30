import Dashboard from "../pages/Dashboard";
import Tamales from "@/pages/products/Tamales";
import Bebida from "@/pages/products/Bebida";
import Catalogo from "@/pages/Catalogo";
import CatalogoItem from "@/pages/CatalogoItem";
import Login from "@/pages/Login";
import type { AdminRoute } from "@/types/routes/admin_routes";
import Venta from "@/pages/Venta";
import HistorialVenta from '@/pages/HistorialVenta'
import Usuario from "@/pages/Usuario";


const admin_routes: AdminRoute[] = [
  { path: '/Login', component: Login, public: true, index: true },
  { path: '/', component: Dashboard, public: false, index: true },
  { path: '/productos/tamales', component: Tamales, public: false, index: false },
  { path: '/productos/bebidas', component: Bebida, public: false, index: false },
  { path: '/usuario/index', component: Usuario, public: false, index: false },
  { path: '/venta/index', component: Venta, public: false, index: false },
  { path: '/venta/historial', component: HistorialVenta, public: false, index: false },
  { path: '/catalogo/index', component: Catalogo, public: false, index: false },
  { path: '/catalogo_item/index', component: CatalogoItem, public: false, index: false }
]

export default admin_routes;

