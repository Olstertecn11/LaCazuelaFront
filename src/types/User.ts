export type User = {
  idUsuario?: number;
  correo: string;
  nombre: string;
  contrasenia?: string;
  rolIdFk: number;
}
