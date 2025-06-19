import {
  DialogTitle,
  DialogContent,
  Dialog,
  DialogActions,
  Button,
  Rating,
} from "@mui/material";

import { useState } from "react";

const RateMenu = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  const handleSubmit = () => {
    const comment = document.getElementById("comment");
    console.log("Editando", comment.value);
    setOpenModal(!openModal);
  };

  return (
    <>
      <Button onClick={handleOpenModal}>Avaliar</Button>
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
        <DialogTitle>Avaliar</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <>
            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenModal}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Avaliar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RateMenu;
