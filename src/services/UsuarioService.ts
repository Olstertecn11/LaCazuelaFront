import api from "./api";
import handleRequest from "../utils/handleRequest";
import type { User } from "@/types/User";



export const obtenerUsuarios = async () => await handleRequest<User[]>(() => api.get('/Usuario'));

export const registrarUsuario = async (usuario: User) =>
  await handleRequest<User>(() => api.post('/Register', usuario));
