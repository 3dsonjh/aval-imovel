import { Form, useLoaderData } from "react-router-dom"

import { Box, Grid, Button, MenuItem, Paper, TextField, CircularProgress } from "@mui/material";

import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';

import { useState } from "react";

import { app } from "../firebase";
import { getFirestore, setDoc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
//conexao com o banco de dados
const db = getFirestore(app);



export async function carregaDados(req){
    const id = req.params.id;
    // table e id
    const ref = doc(db, "imoveis", id);
    // pega registro
    const registro = await getDoc(ref);

    if(registro.exists()){
        let dados = registro.data();
        dados.id = registro.id
        return dados;
    } else {
        return {erro: "Registro não encontrado"}
    }

    //console.log(id);
    return id;
}

export default function Editar(){

    const valor = useLoaderData();
    console.log(valor);

    const [carregando,setCarregando] = useState(false);
    const [novoImovel,setNovoImovel] = useState(valor);

    function alteraImovel(evento){

        let campo = evento.target.name;
        let valor = evento.target.value;

        novoImovel[campo]=valor;

        setNovoImovel(novoImovel);
    }

    async function salvar(){
        setCarregando(true);
        
        //let valor = (novoImovel.valor_avaliado).parseInt();
        //novoImovel.valor_avaliado = valor;

        const novo = doc(db,"imoveis",novoImovel.id);
        await setDoc(novo, novoImovel);
        setCarregando(false);
        window.location.pathname = "/imoveis";
    }


    const geoloc=(valor.geoloc)?valor.geoloc.latitude+","+valor.geoloc.longitude:"";

    let extras = "";
    if(valor.extras){
        {
           extras = valor.extras.map((item) => {
                return (
                    <Chip 
                        label={item}
                        key={item}
                    >
                    
                    </Chip>
                )
            })
        }
    }

    return(
        
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
                    
                    >
                        <TextField onChange={alteraImovel} label="Código" margin="normal" name="codigo" defaultValue={valor.codigo}></TextField>
                        <TextField onChange={alteraImovel} label="Descrição" multiline rows={4} margin="normal" name="descricao" defaultValue={valor.descricao}></TextField>
                        <TextField onChange={alteraImovel} label="Endereço" margin="normal" name="endereco" defaultValue={valor.endereco}></TextField>
                        <TextField onChange={alteraImovel} label="Quartos" margin="normal" name="quartos" defaultValue={valor.quartos}></TextField>
                        <TextField onChange={alteraImovel} label="Tipo do Imóvel" margin="normal" name="tipo" defaultValue={valor.tipo} select>
                            <MenuItem defaultvalue="AP">Apartamento</MenuItem>
                            <MenuItem value="SB">Sobrado</MenuItem>
                            <MenuItem value="CS">Casa</MenuItem>
                            <MenuItem value="LJ">Loja</MenuItem>
                            <MenuItem value="CJ">Conjunto Comercial</MenuItem>
                        </TextField>
                        <TextField onChange={alteraImovel} label="Valor do Imóvel" margin="normal" name="valor_avaliado" defaultValue={valor.valor_avaliado}></TextField>
                        <TextField onChange={alteraImovel} label="Geolocalização" margin="normal" name="geoloc" defaultValue={geoloc}></TextField>
                        <TextField onChange={alteraImovel} label="Extras" margin="normal" name="extras" defaultValue={valor.extras}></TextField>

                        {extras}
                        

                        {(carregando==true)?
                        <Button disabled type="submit" variant="contained">Carregando...  <CircularProgress /></Button>
                        :
                        <Button onClick={salvar} variant="contained">Confirmar Alteração</Button>
                        }
                    </Box>
                </Paper>
            </Grid>
        </Grid>
        
    )
}