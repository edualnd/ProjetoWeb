import {
  DialogTitle,
  TextField,
  DialogContent,
  DialogActions,
  Button,
  Dialog,
  Typography,
} from "@mui/material";
import { useState } from "react";

const ForgotPassModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    alert("Um token foi enviado para o seu email");
    handleOpenModal();
  };

  return (
    <>
      <Button
        variant="text"
        onClick={() => handleOpenModal()}
        sx={{
          color: "ocean.dark",
          fontFamily: "Inter",
          textTransform: "none",
          textSize: "40px",
        }}
      >
        Esqueci a senha
      </Button>
      <Dialog open={openModal} onClose={handleOpenModal}>
        <DialogTitle>Codigo de verificação</DialogTitle>
        <DialogContent>
          <Typography>Qual seu email?</Typography>
          <TextField
            required
            margin="dense"
            id="email"
            name="email"
            type="email"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenModal}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ForgotPassModal;
