import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import {
  Checkbox,
  Stack,
  FormControlLabel,
  Button,
  Typography,
  Box,
  FormHelperText,
  FormControl,
} from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/;
const registerSchema = z
  .object({
    username: z
      .string()
      .nonempty("O username é obrigatório")
      .min(3, "Username muito curto")
      .max(30, "Username muito longo"),
    email: z
      .string()
      .nonempty("O email é obrigatório")
      .email("Email não é válido")
      .max(50, "Email muito longo"),
    password: z
      .string()
      .nonempty("A senha é obrigatório")
      .min(8, "Senha deve ter no mínimo 8 caracteres")
      .regex(
        passwordRegex,
        "Deve ter: 1 letra maiúscula, 1 minúscula, 1 número, 1 caractere especial"
      )
      .max(100, "Senha muito longa"),
    passwordConfirmation: z.string().nonempty("Confirme a senha"),
    privacyTerms: z.literal(true, {
      errorMap: () => ({ message: "Você precisa aceitar os termos." }),
    }),
  })
  .refine((data) => data.password == data.passwordConfirmation, {
    message: "Senhas precisam ser iguais",
    path: ["passwordConfirmation"],
  });
console.log("render");
const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  console.log(errors);
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
          Cadastro
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Typography
            color="ocean.dark"
            sx={{
              fontFamily: "inter",
              color: errors?.email ? "error.main" : "ocean.dark",
            }}
          >
            Email
          </Typography>
          <TextField
            error={errors?.email}
            fullWidth
            type="email"
            name="email"
            id="email"
            {...register("email")}
            helperText={errors?.email ? `${errors?.email?.message}` : ""}
          />
        </Box>
        <Box color="ocean.dark" sx={{ width: "100%" }}>
          <Typography
            sx={{
              fontFamily: "inter",
              color: errors?.username ? "error.main" : "ocean.dark",
            }}
          >
            Username
          </Typography>
          <TextField
            error={errors?.username}
            fullWidth
            type="text"
            name="username"
            id="username"
            {...register("username")}
            helperText={errors?.username ? `${errors?.username?.message}` : ""}
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
        <Box color="ocean.dark" sx={{ width: "100%" }}>
          <Typography
            sx={{
              fontFamily: "inter",
              color: errors?.passwordConfirmation ? "error.main" : "ocean.dark",
            }}
          >
            Confirmar senha
          </Typography>
          <TextField
            error={errors?.passwordConfirmation}
            fullWidth
            type="password"
            name="passwordConfirmationassord"
            id="passwordConfirmation"
            {...register("passwordConfirmation")}
            helperText={
              errors?.passwordConfirmation
                ? `${errors?.passwordConfirmation?.message}`
                : ""
            }
          />
        </Box>
        <Box
          sx={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <FormControl error={errors.privacyTerms}>
            <FormControlLabel
              control={<Checkbox {...register("privacyTerms")} />}
              label="Aceito os termos e condições"
              componentsProps={{
                typography: {
                  sx: {
                    fontFamily: "inter",
                    color: errors?.privacyTerms ? "error.main" : "ocean.dark",
                  },
                },
              }}
            />
            {errors?.privacyTerms && (
              <FormHelperText>{errors.privacyTerms.message}</FormHelperText>
            )}
          </FormControl>
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
          Cadastrar
        </Button>
      </Stack>
        
    </>
  );
};

export default RegisterForm;
