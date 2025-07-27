import api from "./api";
import handleRequest from "../utils/handleRequest";
import type { Tamal } from "@/types/Tamal";

export const getTamales = async () => {
  return handleRequest<Tamal[]>(() => api.get("/Tamal"));
};

export const createTamal = async (tamal: any) => {
  return handleRequest<Tamal>(() => api.post("/Tamal", tamal));
};
