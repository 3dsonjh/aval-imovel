import Home from './dashboard/Home';
import Cadastro from './imovel/Cadastro';
import ListarImovel from './imovel/Listar';
import Editar from './imovel/Editar';
import { carregaDados } from './imovel/Editar';

import {  createBrowserRouter, RouterProvider } from "react-router-dom";

const paginas = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },{
      path: "/imoveis",
      element: <ListarImovel />
    },{
      path: "/imoveis/cadastro",
      element: <Cadastro />
    },{
      path: "/imoveis/editar/:id",
      element: <Editar />,
      loader: carregaDados
    }
  ]);
export default paginas