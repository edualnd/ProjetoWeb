import { Stack, TextField, Typography, Button, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userStore } from "../../store/userStore.js";
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.!%*?&])[A-Za-z\d@$.!%*?&]*$/;
const registerSchema = z
  .object({
    newPassword: z
      .string()
      .nonempty("A senha é obrigatório")
      .min(8, "Senha deve ter no mínimo 8 caracteres")
      .regex(
        passwordRegex,
        "Deve ter: 1 letra maiúscula, 1 minúscula, 1 número, 1 caractere especial"
      )
      .max(100, "Senha muito longa"),
    passwordConfirmation: z.string().nonempty("Confirme a senha"),
  })
  .refine((data) => data.newPassword == data.passwordConfirmation, {
    message: "Senhas precisam ser iguais",
    path: ["passwordConfirmation"],
  });
const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });
  const { token } = useParams();
  const { resetPass } = userStore();
  const navigate = useNavigate();
  const handleSubmitClick = async (data) => {
    const res = await resetPass(token, data);
    reset();
    if (res.success) {
      alert("Senha mudada");
      navigate("/login");
      return;
    }
    alert(res.message);
    return;
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Stack
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={3}
          sx={{
            p: 5,

            width: "50%",
            borderRadius: 5,
            border: "1px solid #bebebe",
          }}
        >
          <Typography
            variant="h4"
            component={"h1"}
            color="ocean.dark"
            sx={{
              textTransform: "uppercase",
              fontSize: "24px",
            }}
          >
            Trocar senha
          </Typography>
          <TextField
            id="newPass"
            label="Nova senha"
            sx={{
              width: "100%",
            }}
            variant="standard"
            error={errors?.newPassword}
            {...register("newPassword")}
            helperText={
              errors?.newPassword ? `${errors?.newPassword?.message}` : ""
            }
          />
          <TextField
            variant="standard"
            id="confirmPass"
            label="Confirme a senha"
            sx={{
              width: "100%",
            }}
            error={errors?.passwordConfirmation}
            {...register("passwordConfirmation")}
            helperText={
              errors?.passwordConfirmation
                ? `${errors?.passwordConfirmation?.message}`
                : ""
            }
          />
          <Button disabled={!isValid} onClick={handleSubmit(handleSubmitClick)}>
            Trocar
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default ForgotPassword;
