import React, { useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import { css } from "@emotion/react";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/ui/Formulario";
import FileUploader from "react-firebase-file-uploader";
import { FirebaseContext } from "../firebase";
import Router, { useRouter } from "next/router";

//Validaciones
import useValidacion from "../hooks/useValidacion";
import validarCrearProducto from "../validacion/validarCrearProducto";
import Error404 from "../components/layout/404";


const STATE_INICIAL = {
  nombre: "",
  empresa: "",
  // imagen: "",
  url: "",
  descripcion: "",
};

const NuevoProducto = () => {
  //State de las imagenes

  const [nombreimagen, guardarNombre] = useState("");
  const [subiendo, guardarSubiendo] = useState(false);
  const [progreso, guardarProgreso] = useState(0);
  const [urlimagen, guardarUrlImagen] = useState("");

  const [error, guardarError] = useState(false);

  const { valores, errores, handleSubmit, handleChange } = useValidacion(
    STATE_INICIAL,
    validarCrearProducto,
    crearProducto
  );

  // Hook de routing para redireccionar
  const router = useRouter();

  const { nombre, empresa, imagen, url, descripcion } = valores;

  //Context para las operaciones crud de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  async function crearProducto() {
    //Si el usuario no esta autenticado
    if (!usuario) {
      return router.push("/login");
    }

    //crear el objeto de nuevo producto
    const producto = {
      nombre,
      empresa,
      url,
      urlimagen,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName
      },
      haVotado: []
    };

    // Insertar a la base de datos
    firebase.db.collection("productos").add(producto);
    
    return router.push('/');
  }

  const handleUploadStart = () => {
      guardarProgreso(0);
      guardarSubiendo(true);
  }

  const handleProgress = progreso => guardarProgreso({ progreso });

  const handleUploadError = error => {
      guardarSubiendo(error);
      console.error(error);
  };

  const handleUploadSuccess = nombre => {
      guardarProgreso(100);
      guardarSubiendo(false);
      guardarNombre(nombre);
      firebase.storage.ref("productos").child(nombre).getDownloadURL().then(url => {
        console.log(url);
        guardarUrlImagen(url);
      });
  };


  return (
    <Layout>
      { !usuario ? <Error404 /> :
      (

      <>
        <h1
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}
        >
          Nuevo Producto
        </h1>
        <Formulario onSubmit={handleSubmit}>
          <fieldset>
            <legend>Informacion General</legend>

            <Campo>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                placeholder="Nombre del Producto"
                name="nombre"
                onChange={handleChange}
              />
            </Campo>

            {errores.nombre && <Error>{errores.nombre}</Error>}

            <Campo>
              <label htmlFor="empresa">Empresa</label>
              <input
                type="text"
                id="empresa"
                placeholder="Nombre de la empresa"
                name="empresa"
                onChange={handleChange}
              />
            </Campo>

            {errores.empresa && <Error>{errores.empresa}</Error>}

            <Campo>
              <label htmlFor="imagen">Imagen</label>
              <FileUploader
                accept="image/*"
                id="imagen"
                name="imagen"
                randomizeFilename
                storageRef={firebase.storage.ref("productos")}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
              />
            </Campo>

            <Campo>
              <label htmlFor="url">Url</label>
              <input
                type="url"
                id="url"
                value={url}
                name="url"
                placeholder="Ingrese una Url"
                onChange={handleChange}
              />
            </Campo>

            {errores.url && <Error>{errores.url}</Error>}
          </fieldset>

          <fieldset>
            <legend>Sobre tu Producto</legend>

            <Campo>
              <label htmlFor="descripcion">Descripcion</label>
              <textarea
                id="descripcion"
                value={descripcion}
                name="descripcion"
                onChange={handleChange}
              />
            </Campo>

            {errores.descripcion && <Error>{errores.descripcion}</Error>}
          </fieldset>

          {error && <Error>{error}</Error>}

          <InputSubmit type="submit" value="Agregar Producto" />
        </Formulario>
      </>
      )
    }
    </Layout>
  );
};

export default NuevoProducto;
