import {
  DialogTitle,
  TextField,
  DialogContent,
  DialogActions,
  Button,
  Dialog,
} from "@mui/material";
import { useState } from "react";

const OTPModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const token = document.getElementById("tokenOTP");
    const email = document.getElementById("novoEmail");
    console.log("Token OTP");
    console.log(token.value, email.value);
    handleOpenModal();
  };
  const handleSubmitToken = () => {
    const senha = document.getElementById("password");
    const email = document.getElementById("novoEmail");
    console.log(email.value, senha.value);
    handleOpenModal();
  };
  return (
    <>
      <Button
        onClick={(event) => handleSubmitToken(event)}
        variant="contained"
        sx={{
          width: "50%",
          height: "50px",
        }}
      >
        Mudar
      </Button>
      <Dialog open={openModal} onClose={handleOpenModal}>
        <DialogTitle>Codigo de verificação</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="tokenOTP"
            name="tokenOTP"
            placeholder={"XXXXXX"}
            type="text"
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 6 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenModal}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Mudar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OTPModal;
