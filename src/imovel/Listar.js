import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { app } from "../firebase";

import {getFirestore} from "firebase/firestore";
import { collection, getDocs } from 'firebase/firestore';

import { useState } from 'react';
import { useEffect } from 'react';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'

import Confirmar from './Confirmar';

//conexao com o banco de dados
const db = getFirestore(app);

export default function Listar(){

    const [imoveis,     setImoveis  ] = useState([]);
    const [dialogo,     setDialogo  ] = useState(false);
    const [confirmar,   setConfirmar] = useState();

    useEffect(() => {

        let ignore = false;

        async function carregar(){
            const resultado = await getDocs(collection(db,"imoveis"));
            const novo = resultado.docs.map(function(item){
                return item.data();
            });
            if(imoveis.length == 0){
                setImoveis(novo);
                console.log(novo);
            }
        }
        carregar();
        
        return () => {
            ignore = true;
        }
        
    },[imoveis]);

    function deletar()
    {
        setDialogo(true);
    }

    /*async function carregar(){
    
    }
    carregar();*/
    


    return (
        <Grid container spacing={3}>
            <Grid item>
                <Button variant="contained" href="/imoveis/cadastro">Cadastrar Imóvel</Button>
            </Grid>
            <Grid item xs={12} md={12} lg={12}> 
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                   
                  }}
                >

                <Confirmar
                    abrir={dialogo}
                    texto="Deseja Realmente Deletar o Imóvel "
                    botao_sim="Confirmar"
                    botao_nao="Desistir"
                    titulo="Deletar Imóvel"
                    modificador={setDialogo}
                    retorno={setConfirmar}
                />
                

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell>Endereço</TableCell>
                            <TableCell>Valor</TableCell>
                            <TableCell>Data de Cadastro</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                    { imoveis.map(function(imo) {
                        return(
                            <TableRow key={imo.codigo}>
                                <TableCell>{imo.codigo}</TableCell>
                                <TableCell>{imo.endereco}</TableCell>
                                <TableCell>{imo.valor_avaliado.toLocaleString("pt-BR",{style: "currency", currency:"BRL"})}</TableCell>
                                <TableCell>{imo.data_cadastro.toDate().toLocaleString()}</TableCell>
                                <TableCell>
                                    <IconButton onClick={deletar}><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        )
                        })
                    }
                    </TableBody>

                </Table>
                

                </Paper>
            </Grid>

        </Grid>
    )
}