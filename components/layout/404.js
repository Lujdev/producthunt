import React from 'react';
import styled from '@emotion/styled';

const ProductoNoExiste = styled.h1`
    margin-top: 5rem;
    text-align: center;
`;

const Error404 = () => {
    return ( 
        <ProductoNoExiste>Error con la dirección ingresada</ProductoNoExiste>
     );
}
 
export default Error404;