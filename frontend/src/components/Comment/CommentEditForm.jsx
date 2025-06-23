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
import { postStore } from "../../../store/postsStore.js";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


const registerSchema = z.object({
  comment: z
    .string()
    .min(1, "Comentario muito curto")
    .max(200, "Comentario muito longo"),
});
const CommentEditForm = ({ text, id }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(!openModal);
    reset();
  };
  const { editComment } = postStore();
  const handleClick = async (data) => {
    const res = await editComment(id, data);
    setOpenModal(!openModal);
    if (res.success) {
      console.log("Alterado");
      return;
    }
    alert(res.message);
    return;
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
            defaultValue={text}
            type="text"
            fullWidth
            variant="standard"
            {...register("comment")}
            helperText={errors?.comment ? `${errors?.comment?.message}` : ""}
            error={errors?.comment}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenModal}>Cancel</Button>
          <Button
            type="submit"
            onClick={handleSubmit(handleClick)}
            disabled={!isValid}
          >
            Editar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default CommentEditForm;
