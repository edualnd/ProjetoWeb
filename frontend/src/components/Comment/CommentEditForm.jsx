import {
  DialogTitle,
  DialogContent,

  TextField,
} from "@mui/material";

const CommentEditForm = ({}) => {
  return (
    <>
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
    </>
  );
};
export default CommentEditForm;
