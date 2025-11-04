export class Usuario {
    #nombreUsuario;
    #correo;
    #password;

    constructor(nombreUsuario, correo, password) { 
        this.#nombreUsuario = nombreUsuario;
        this.#correo = correo;
        this.#password = password;
    }

    // Getters para todos los atributos (solo lectura)
    get nombreUsuario() {
        return this.#nombreUsuario;
    }

    get correo() {
        return this.#correo;
    }

    get password() {
        return this.#password;
    }

    // Setter solo para la contraseña
    set password(nuevaPassword) {
        this.#password = nuevaPassword;
    }

    obtenerDatosPublicos() {
        return {
            nombreUsuario: this.#nombreUsuario,
            correo: this.#correo
        };
    }
}