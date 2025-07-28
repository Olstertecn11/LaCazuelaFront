import type { User } from "@/types/User";


export type LoginRequest = {
  message: string,
  token: string,
  usuario: User
}
