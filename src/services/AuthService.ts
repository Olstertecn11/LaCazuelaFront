import api from "./api";
import handleRequest from "../utils/handleRequest";
import type { LoginRequest } from "@/types/LoginRequest";




export const login = async (correo: string, contrasenia: string) => {
  return handleRequest<LoginRequest>(() => api.post("/login", { correo, contrasenia }));
};
