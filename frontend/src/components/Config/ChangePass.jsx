import { Stack, Typography, Box, TextField, Button } from "@mui/material";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userStore } from "../../../store/userStore.js";
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.!%*?&])[A-Za-z\d@$.!%*?&]*$/;
const registerSchema = z
  .object({
    oldPassword: z
      .string()
      .nonempty("A senha é obrigatório")
      .min(8, "Senha deve ter no mínimo 8 caracteres"),
    newPassword: z
      .string()
      .nonempty("A senha é obrigatório")
      .min(8, "Senha deve ter no mínimo 8 caracteres")
      .regex(
        passwordRegex,
        "Deve ter: 1 letra maiúscula, 1 minúscula, 1 número, 1 caractere especial"
      )
      .max(100, "Senha muito longa"),
  })
  .refine((data) => data.oldPassword != data.newPassword, {
    message: "Senhas precisam ser diferentes",
    path: ["newPassword"],
  });

const ChangePass = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });
  const { changePass } = userStore();
  const handleChange = async (data) => {
    const res = await changePass(data);
    if (res.success) {
      console.log("Senha alterado");
      reset();
      return;
    }
    alert(res.message);
    return;
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Mudar senha
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
              id="oldPassword"
              type="password"
              sx={{
                width: "100%",
              }}
              {...register("oldPassword")}
              error={errors?.oldPassword}
              helperText={
                errors?.oldPassword ? `${errors?.oldPassword?.message}` : ""
              }
            ></TextField>
          </Box>
          <Box
            sx={{
              mx: 5,
              width: "100%",
            }}
          >
            <TextField
              label="Nova senha"
              id="newPassword"
              type="password"
              sx={{
                width: "100%",
              }}
              {...register("newPassword")}
              error={errors?.newPassword}
              helperText={
                errors?.newPassword ? `${errors?.newPassword?.message}` : ""
              }
            ></TextField>
          </Box>
          <Button
            variant="contained"
            sx={{
              width: "50%",
              height: "50px",
            }}
            disabled={!isValid}
            onClick={handleSubmit(handleChange)}
          >
            Mudar
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default ChangePass;
