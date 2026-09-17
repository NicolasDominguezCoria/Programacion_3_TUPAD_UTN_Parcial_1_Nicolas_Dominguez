import type { IUser } from "../types/IUser";
import type { Rol } from "../types/Rol";
import { getUSer, removeUser } from "./localStorage";
import { navigate } from "./navigate";

export const checkAuhtUser = (
  redireccion1: string,
  redireccion2: string,
  rol: Rol
) => {

  const user: IUser | null = getUSer();

  if (!user) {
    navigate(redireccion1);
    return;
  } else {
    console.log("existe pero no tiene el rol admin, redirigiendo a home-client");

    if (user.rol !== rol) {
      navigate(redireccion2);
      return;
    }
  }
};

export const logout = () => {
  removeUser();
  navigate("/src/pages/auth/login/login.html");
};