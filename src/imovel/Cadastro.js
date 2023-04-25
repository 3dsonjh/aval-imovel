import { MenuItem, Paper, TextField } from "@mui/material";
import { Grid } from "@mui/material";

export default function Cadastro()
{
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{
                    p:2,
                    display: "flex",
                    flexDirection: "column"
                }}>

                    <TextField label="Código" margin="normal"></TextField>
                    <TextField label="Descrição" multiline rows={4} margin="normal"></TextField>
                    <TextField label="Endereço" margin="normal"></TextField>
                    <TextField label="Quartos" margin="normal"></TextField>
                    <TextField label="Tipo do Imóvel" margin="normal" select>
                        <MenuItem value="AP">Apartamento</MenuItem>
                        <MenuItem value="SB">Sobrado</MenuItem>
                        <MenuItem value="CS">Casa</MenuItem>
                        <MenuItem value="LJ">Loja</MenuItem>
                        <MenuItem value="CJ">Conjunto Comercial</MenuItem>
                    </TextField>
                    <TextField label="Valor do Imóvel" margin="normal"></TextField>
                    <TextField label="Geolocalização" margin="normal"></TextField>
                    <TextField label="Extras" margin="normal"></TextField>

                    
                </Paper>
            </Grid>
        </Grid>
    )
}