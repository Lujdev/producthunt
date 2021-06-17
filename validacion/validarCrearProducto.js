export default function validarCrearProductos(valores) {

    let errores = {};

    //Validar el nombre de usuario
    if(!valores.nombre) {
        errores.nombre = "El nombre es obligatorio.";
    }

    //Validar empresa
    if(!valores.empresa){
        errores.empresa = "El nombre de la empresa es obligatorio.";
    }

    //Validar Url
    if(!valores.url){
        errores.url = 'La URL del producto es obligatorio';
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)){
        errores.url = 'La URL ingresada no es válida.';
    }

    //Validar descripcion
    if(!valores.descripcion){
        errores.descripcion = "Agregue una descripción a su producto."
    }

    return errores;
}