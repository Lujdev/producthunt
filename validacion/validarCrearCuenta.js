export default function validarCrearCuenta(valores) {

    let errores = {};

    //RegEx para validar Email
    let validarEmailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


    //Validar el nombre de usuario
    if(!valores.nombre) {
        errores.nombre = "El nombre es obligatorio"
    }

    //Validar el email de usuario
    if(!valores.email) {
        errores.email = "El email es obligatorio";
    } else if(!validarEmailReg.test(valores.email)){
        errores.email = "Email no válido";
    }

    //Validar el password de usuario
    if(!valores.password) {
        errores.password = "El password es obligatorio"
    }else if ( valores.password.length < 6 ){
        errores.password = "El password debe contener al menos 6 caracteres";
    }

    return errores;
}