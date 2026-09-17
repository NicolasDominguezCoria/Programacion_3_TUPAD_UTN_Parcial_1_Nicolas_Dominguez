//importación de los recursos necesarios
import type { IUser } from "../../../types/IUser";
import { saveUser } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

//creación de las variables que nos permiten gestionar el formulario del login
const formLogin = document.getElementById("form-login") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

//
formLogin.addEventListener("submit", (event: SubmitEvent) => {
    //evita que la pagina se recargue automaticamente
    event.preventDefault(); 

    //extraemos del formulario los valores ingresados 
    const valueEmail = inputEmail.value.trim();
    const valuePassword = inputPassword.value;


    //obtenemos la lista de usuarios del localstorage
    const usuariosGuardados: IUser[] = JSON.parse(localStorage.getItem("users") || "[]");

    // buscamos coincidencia de email y contraseña
    const usuarioEncontrado = usuariosGuardados.find(
        (usuario) => usuario.email === valueEmail && usuario.password === valuePassword
    );

    // condicional de seguridad para verificar el intento de ingreso
    if (!usuarioEncontrado) {
        alert("Credenciales incorrectas o usuario no registrado");
        return;
    }

    // creamos el objeto de la sesion y lo guardamos en el localstorage (sin mostrar la contraseña)
    const sesionUsuario: IUser = {
        email: usuarioEncontrado.email,
        rol: usuarioEncontrado.rol
    };

    saveUser(sesionUsuario);

    //realiza la verificación del rol y redirige segun su tipo
    if (sesionUsuario.rol === "admin") {
        navigate("/src/pages/admin/home/home.html");
    } else {
        navigate("/src/pages/client/home/home.html");
    };
});

/*
 Usuarios iniciales: como se habló en el encuentro sincrónico previo al parcial, este método
  crea automaticamente al iniciar la app un usuario de tipo "admin" y otro de tipo "client" para poder hacer login.
*/
  const cargarUsuariosPrueba = () => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const adminExiste = users.some((u: any) => u.email === "admin@mail.com");
  const clientExiste = users.some((u: any) => u.email === "client@mail.com");

  if (!adminExiste) {
    users.push({
      email: "admin@mail.com",
      password: "admin",
      rol: "admin"
    });
    localStorage.setItem("users", JSON.stringify(users));
  }

  if (!clientExiste) {
    users.push({
        email: "client@mail.com",
        password: "client",
        rol: "client"
    });
    localStorage.setItem("users", JSON.stringify(users));
  }
};

cargarUsuariosPrueba();