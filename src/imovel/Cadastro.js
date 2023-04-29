import { Box, Grid, Button, MenuItem, Paper, TextField, CircularProgress } from "@mui/material";

import { useRef, useState } from "react";


import { app } from "../firebase";
import { getStorage } from "firebase/storage";
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { redirect } from "react-router-dom";

//conexao com o banco de dados
const db = getFirestore(app);
//criacao referencia
const storage = getStorage(app);


export default function Cadastro()
{
    const [carregando,setCarregando] = useState(false);
    const [novoImovel,setNovoImovel] = useState({});

    const inputUpload = useRef();

    async function cadastrar(evento){
        evento.preventDefault();
        console.log(evento);
        setCarregando(true);
        const novo = doc(collection(db,"imoveis"));
        novoImovel.data_cadastro = new Date();
        novoImovel.valor_avaliado = parseFloat(novoImovel.valor_avaliado);
        //console.log(novo);
        const resultado = await setDoc(novo,novoImovel);
        //console.log(resultado);
        setCarregando(false);
        
        window.location.pathname = "/imoveis";

    }

    function alteraImovel(evento){
        //console.log(evento.target.name);

        let campo = evento.target.name;
        let valor = evento.target.value;

        novoImovel[campo]=valor;
        setNovoImovel(novoImovel);

        console.log(novoImovel);
    }

    function upload(){
        console.log(inputUpload);
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{
                    p:2,
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m:1, width:'40%'},
                    }}
                    onSubmit={cadastrar}
                    >
                        <TextField onChange={alteraImovel} label="Código" margin="normal" name="codigo"></TextField>
                        <TextField onChange={alteraImovel} label="Descrição" multiline rows={4} margin="normal" name="descricao"></TextField>
                        <TextField onChange={alteraImovel} label="Endereço" margin="normal" name="endereco"></TextField>
                        <TextField onChange={alteraImovel} label="Quartos" margin="normal" name="quartos"></TextField>
                        <TextField onChange={alteraImovel} label="Tipo do Imóvel" margin="normal" name="tipo" select>
                            <MenuItem value="AP">Apartamento</MenuItem>
                            <MenuItem value="SB">Sobrado</MenuItem>
                            <MenuItem value="CS">Casa</MenuItem>
                            <MenuItem value="LJ">Loja</MenuItem>
                            <MenuItem value="CJ">Conjunto Comercial</MenuItem>
                        </TextField>
                        <TextField onChange={alteraImovel} label="Valor do Imóvel" margin="normal" name="valor_avaliado"></TextField>
                        <TextField onChange={alteraImovel} label="Geolocalização" margin="normal" name="geoloc"></TextField>
                        <TextField onChange={alteraImovel} label="Extras" margin="normal" name="extras"></TextField>
                        <TextField type="file" label="Foto" ref={inputUpload}></TextField>

                        <Button onClick={upload}>Upload</Button>

                        {(carregando==true)?
                        <Button disabled type="submit" variant="contained">Carregando...  <CircularProgress /></Button>
                        :
                        <Button type="submit" variant="contained">Confirmar</Button>
                        }
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}