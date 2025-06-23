import {
  Stack,
  Typography,
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
} from "@mui/material";
import OTPModal from "./OTPModal.jsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRef } from "react";
import { userStore } from "../../../store/userStore.js";


const registerSchema = z.object({
  newEmail: z
    .string()
    .nonempty("O email é obrigatório")
    .email("Email não é válido")
    .max(50, "Email muito longo"),
  password: z
    .string()
    .nonempty("A senha é obrigatório")
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .max(100, "Senha muito longa"),
});

const ChangeEmail = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });
  const [renderModal, setRenderModal] = useState(false);
  const { changeEmail } = userStore();
  const emailRef = useRef();
  const sendEmailConfirm = async (data) => {
    emailRef.current = data;
    
    const res = await changeEmail(data);
     if (res.success) {
      setRenderModal(!renderModal);
      
      return;
    }
    alert(res.message);
    return;
    
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Mudar email
        </Typography>

        <Stack
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={3}
          sx={{
            mt: 3,
          }}
        >
          <Box
            sx={{
              mx: 5,
              width: "100%",
            }}
          >
            <TextField
              label="Senha atual"
              id="password"
              type="password"
              sx={{
                width: "100%",
              }}
              {...register("password")}
              helperText={
                errors?.password ? `${errors?.password?.message}` : ""
              }
              error={errors?.password}
            ></TextField>
          </Box>
          <Box
            sx={{
              mx: 5,
              width: "100%",
            }}
          >
            <TextField
              label="Novo email"
              id="newEmail"
              sx={{
                width: "100%",
              }}
              {...register("newEmail")}
              helperText={
                errors?.newEmail ? `${errors?.newEmail?.message}` : ""
              }
              error={errors?.newEmail}
            ></TextField>
          </Box>

          <Button
            variant="contained"
            sx={{
              width: "50%",
              height: "50px",
            }}
            disabled={!isValid}
            onClick={handleSubmit(sendEmailConfirm)}
          >
            Mudar
          </Button>
          {renderModal && (
            <OTPModal
              fun={() => {
                setRenderModal(!renderModal);
                emailRef.current = null;
                reset()
              }}
              email={emailRef.current.newEmail}
            ></OTPModal>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default ChangeEmail;
