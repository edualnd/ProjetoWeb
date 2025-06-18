import {
  DialogTitle,
  DialogContent,
  Dialog,
  DialogActions,
  Button,
  IconButton,
  Stack,
} from "@mui/material";

import {  useState } from "react";

import iconIdenity from "../../assets/carteira-de-identidade.png";
const GetInscricoes = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <IconButton
        type="button"
        onClick={handleOpenModal}
        aria-label=""
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          width: "100%",
          height: "100%",
          p: 0,
          borderRadius: 0,
        }}
      >
        <img src={iconIdenity} width={"20px"} height={"20px"}></img>
      </IconButton>
      <Dialog
        open={openModal}
        onClose={handleOpenModal}
        sx={{
          "& .MuiPaper-root": {
            width: "100%",
            height: "auto",
          },
        }}
      >
        <DialogTitle>Inscritos</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <>
            <Stack spacing={2}></Stack>
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenModal}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GetInscricoes;
