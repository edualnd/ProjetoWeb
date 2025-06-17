import {
  DialogTitle,
  DialogContent,
  TextField,
  Dialog,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
const CommentEditForm = () => {
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
      <IconButton type="button" onClick={handleOpenModal}>
        <EditIcon sx={{ fontSize: 20 }}></EditIcon>
      </IconButton>
      <Dialog open={openModal} onClose={handleOpenModal}>
        <DialogTitle>Editar Comentario</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="comment"
            name="comment"
            defaultValue={"comentarioooo"}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenModal}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Editar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default CommentEditForm;
