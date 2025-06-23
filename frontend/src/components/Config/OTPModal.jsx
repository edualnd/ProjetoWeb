import {
  DialogTitle,
  TextField,
  DialogContent,
  DialogActions,
  Button,
  Dialog,
} from "@mui/material";
import { useState } from "react";
import { userStore } from "../../../store/userStore.js";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const tokenSchema = z.object({
  tokenOTP: z
    .string()
    .nonempty("O token é obrigatório")
    .min(6, "Deve ter 6 digitos")
    .max(6, "Muito grande")
    .regex(/^\d{6}$/, "Somente numeros"),
});
const OTPModal = ({ fun, email }) => {
  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(tokenSchema),
    mode: "all",
  });
  const [openModal, setOpenModal] = useState(true);
  const handleOpenModal = () => {
    setOpenModal(!openModal);
    fun();
  };

  const { otpToken } = userStore();
  const handleSubmitToken = async ({ tokenOTP }) => {
    const res = await otpToken({ tokenOTP, newEmail: email });
    if (res.success) {
      console.log("Email mudou");
      return;
    }
    alert(res.message);
    return;
  };

  return (
    <>
      <Dialog open={openModal} onClose={handleOpenModal}>
        <DialogTitle>Codigo de verificação enviado no email</DialogTitle>
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
            {...register("tokenOTP")}
            helperText={errors?.tokenOTP ? `${errors?.tokenOTP?.message}` : ""}
            error={errors?.tokenOTP}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenModal}>Cancel</Button>
          <Button onClick={handleSubmit(handleSubmitToken)} disabled={!isValid}>
            Mudar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OTPModal;
