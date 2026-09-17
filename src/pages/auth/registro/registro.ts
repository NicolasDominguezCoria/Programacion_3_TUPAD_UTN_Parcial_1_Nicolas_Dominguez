import type { IUser } from "../../../types/IUser";

const formRegistro = document.querySelector<HTMLFormElement>("#form-registro")

formRegistro?.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    const formElement = event.currentTarget as HTMLFormElement;
    const formData = new FormData(formElement);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string
    

    if(!email || !password) {
        alert("Por favor, completa todos los campos");
        return;
    };

    const usuariosGuardados: IUser[] = JSON.parse(localStorage.getItem("usuarios") || "[]");

    const usuarioExiste = usuariosGuardados.some((usuario) => usuario.email === email);

    if (usuarioExiste) {
        alert("El email ya se encuentra registrado.");
        return;
    };

    const nuevoUsuario: IUser = {
        email: email,
        password: password,
        rol: "client"
    }

    usuariosGuardados.push(nuevoUsuario);
    localStorage.setItem("users", JSON.stringify(usuariosGuardados));

    alert("Usuario registrado con éxito");

    formElement.reset();
})