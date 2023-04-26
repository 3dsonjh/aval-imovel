import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

export default function Confirmar(props){

    function cancelar(){
        props.modificador(false);
        props.retorno(false);
    }

    function confirmar(){
        props.modificador(false);
        props.retorno(true);
    }

    return (
        <Dialog
            open={props.abrir}
        >
            <DialogTitle>{props.titulo}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                {props.texto}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={cancelar}>{props.botao_nao}</Button>
                <Button onClick={confirmar}>{props.botao_sim}</Button>
            </DialogActions>
        </Dialog>
    )
}