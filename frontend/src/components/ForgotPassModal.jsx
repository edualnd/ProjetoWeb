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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userStore } from "../../store/userStore.js";
const registerSchema = z.object({
  email: z
    .string()
    .nonempty("Este campo é obrigatório")
    .email("Digite um email valido"),
});
const ForgotPassModal = () => {
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
    reset();
    setOpenModal(!openModal);
  };
  const { forgotPass } = userStore();
  const handleSubmitClick = async (data) => {
    
    const res = await forgotPass(data);
    if (res.success) {
      alert("Um token foi enviado para o seu email");
      handleOpenModal();
      return;
    }
    alert(res.message);
    return;
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
            error={errors?.email}
            {...register("email")}
            helperText={errors?.email ? `${errors?.email?.message}` : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenModal}>Cancel</Button>
          <Button
            type="submit"
            disabled={!isValid}
            onClick={handleSubmit(handleSubmitClick)}
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ForgotPassModal;
