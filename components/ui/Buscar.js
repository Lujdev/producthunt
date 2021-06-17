import React, { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Router from "next/router";

const InputText = styled.input`
  border: 1px solid var(--gris3);
  padding: 1rem;
  min-width: 300px;
`;
const ButtonSubmit = styled.button`
  height: 3rem;
  width: 3rem;
  display: block;
  background-size: 3rem;
  background-image: url("/img/buscar.png");
  background-repeat: no-repeat;
  position: absolute;
  right: 1rem;
  top: 1px;
  background-color: white;
  border: none;
  text-indent: -9999px;
  margin-top: 4px;
  &:hover {
    cursor: pointer;
  }
`;

const Buscar = () => {
  const [busqueda, guardarBusqueda] = useState('');

  const buscarProducto = (e) => {
    e.preventDefault();

    if (busqueda.trim() === "") return;

    //redireccionar a /buscar

    Router.push({
      pathname: "/buscar",
      query: { q: busqueda },
    });
  };

  return (
    <form
      css={css`
        position: relative;
      `}
    >
      <InputText
        type="text"
        placeholder="Buscar Productos"
        onChange={(e) => guardarBusqueda(e.target.value)}
      />

      <ButtonSubmit onClick={buscarProducto} type="submit">Buscar</ButtonSubmit>
    </form>
  );
};

export default Buscar;
