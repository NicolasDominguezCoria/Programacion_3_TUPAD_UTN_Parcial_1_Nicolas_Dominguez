import type { Rol } from "./Rol";

export interface IUser {
  email: string;
  password?: string; //lo dejamos como opcional por si no se quiere exponer
  rol: Rol;
}