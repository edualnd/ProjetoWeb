import { useForm } from "react-hook-form";
import { Stack, Button, Typography, Box, TextField } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userStore } from "../../../store/userStore.js";
import { redirect, useNavigate } from "react-router-dom";
const registerSchema = z.object({
  data: z.string().nonempty("Este campo é obrigatório").min(3, "Muito curto"),
  password: z
    .string()
    .nonempty("A senha é obrigatório")
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .max(100, "Senha muito longa"),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });
  const { loginUser } = userStore();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const response = await loginUser(data);
    if (response.success) {
      navigate("/");
    } else {
      alert(response.message);
    }
  };

  return (
    <>
      <Stack
        direction={"column"}
        spacing={3}
        sx={{
          width: "65%",
          height: "80%",
          justifyContent: "center",
          alignItems: "center",
        }}
        component={"form"}
      >
        <Typography
          variant="h2"
          component={"h1"}
          color="ocean.dark"
          sx={{
            textAlign: "left",
            width: "100%",
            fontSize: {
              xs: "40px",
              lg: "46px",
            },
            fontFamily: "inter",
          }}
        >
          Login
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Typography
            color="ocean.dark"
            sx={{
              fontFamily: "inter",
              color: errors?.data ? "error.main" : "ocean.dark",
            }}
          >
            Email ou Username
          </Typography>
          <TextField
            error={errors?.data}
            fullWidth
            type="data"
            name="data"
            id="data"
            {...register("data")}
            helperText={errors?.data ? `${errors?.data?.message}` : ""}
          />
        </Box>

        <Box color="ocean.dark" sx={{ width: "100%" }}>
          <Typography
            sx={{
              fontFamily: "inter",
              color: errors?.password ? "error.main" : "ocean.dark",
            }}
          >
            Senha
          </Typography>
          <TextField
            error={errors?.password}
            fullWidth
            type="password"
            name="password"
            id="password"
            {...register("password")}
            helperText={errors?.password ? `${errors?.password?.message}` : ""}
          />
        </Box>

        <Button
          variant="contained"
          type="submit"
          sx={{
            height: "50px",
            width: "100%",
            bgcolor: "ocean.dark",
            fontFamily: "inter",
            fontSize: "20px",
          }}
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          LOGAR
        </Button>
      </Stack>
    </>
  );
};

export default LoginForm;
