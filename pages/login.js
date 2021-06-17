import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { css } from "@emotion/react";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/ui/Formulario";
import firebase from '../firebase';
import Router from 'next/router';

//Validaciones
import useValidacion from "../hooks/useValidacion";
import validarIniciarSesion from "../validacion/validarIniciarSesion";

const STATE_INICIAL = {
    email: "",
    password: "",
  };

const Login = () => {
    const [ error, guardarError] = useState(false);

    const { valores, errores, handleSubmit, handleChange } = useValidacion(
      STATE_INICIAL,
      validarIniciarSesion,
      iniciarSesion
    );
  
    const { email, password } = valores;
  
    async function iniciarSesion(){
        try {
            const usuario = await firebase.login(email, password);
            console.log(usuario);
            Router.push('/');
        } catch (error) {
            console.error('Hubo un error al autenticar usuario', error.message);
            guardarError(error.message);
        }
    }
  
    return (
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Iniciar Sesión
          </h1>
          <Formulario onSubmit={handleSubmit}>
  
            <Campo>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Ingrese un correo electronico"
                name="email"
                onChange={handleChange}
              />
            </Campo>
  
            {errores.email && <Error>{errores.email}</Error>}
  
            <Campo>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Ingrese una contraseña"
                name="password"
                onChange={handleChange}
              />
            </Campo>
  
            {errores.password && <Error>{errores.password}</Error>}
  
            {error && <Error>{error}</Error>}
  
            <InputSubmit type="submit" value="Iniciar Sesión" />
          </Formulario>
        </>
      </Layout>
    );
}
 
export default Login;