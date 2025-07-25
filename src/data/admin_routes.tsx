import Dashboard from "../pages/Dashboard";
import Tamales from "@/pages/products/Tamales";
import Bebida from "@/pages/products/Bebida";
import Catalogo from "@/pages/Catalogo";
import type { AdminRoute } from "@/types/routes/admin_routes";


const admin_routes: AdminRoute[] = [
  { path: '/', component: Dashboard, public: false, index: true },
  { path: '/productos/tamales', component: Tamales, public: false, index: false },
  { path: '/productos/bebidas', component: Bebida, public: false, index: false },
  { path: '/catalogo/index', component: Catalogo, public: false, index: false }
]

export default admin_routes;

