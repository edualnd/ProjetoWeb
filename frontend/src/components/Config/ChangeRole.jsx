import { Stack, Typography, Box, TextField, Button } from "@mui/material";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userStore } from "../../../store/userStore.js";
const schemaRegex =
  /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

const registerSchema = z.object({
  document: z
    .string()
    .min(11, "Deve ter no minimo 11 caracteres")
    .max(18, "No maximo 18 caracteres")
    .regex(schemaRegex, "CPF: 000.000.000-00, CNPJ: 00.000.000/0000-00"),
  name: z
    .string()
    .min(3, "Deve ter no minimo 3 caracteres")
    .max(50, "No maximo 50 caracteres"),
});
const ChangeRole = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });
  const { userData, changeRole } = userStore();

  const handleChangeRole = async (data = null) => {
    let res;

    if (userData.role == "PROFESSIONAL") {
      res = await changeRole({});
    } else {
      res = await changeRole(data);
    }
    if (res.success) {
      console.log("Role alterado");
      reset()
      return;
    }
    alert(res.message);
    return;
  };
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Tipo de conta
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography>
            Seu tipo de conta é {userData.role}.{" "}
            {userData.role == "COMMON"
              ? "Você não pode criar eventos"
              : "Você pode criar eventos"}
          </Typography>
        </Box>
        <Stack
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={3}
          sx={{
            mt: 3,
          }}
        >
          {userData.role == "COMMON" ? (
            <>
              <Box
                sx={{
                  mx: 5,
                  width: "100%",
                }}
              >
                <TextField
                  label="Nome"
                  sx={{
                    width: "100%",
                  }}
                  {...register("name")}
                  helperText={errors?.name ? `${errors?.name?.message}` : ""}
                  error={errors?.name}
                ></TextField>
              </Box>
              <Box
                sx={{
                  mx: 5,
                  width: "100%",
                }}
              >
                <TextField
                  label="CPF ou CNPJ"
                  sx={{
                    width: "100%",
                  }}
                  {...register("document")}
                  helperText={
                    errors?.document ? `${errors?.document?.message}` : ""
                  }
                  error={errors?.document}
                ></TextField>
              </Box>
            </>
          ) : (
            ""
          )}
          <Button
            variant="contained"
            onClick={
              userData.role == "PROFESSIONAL"
                ? handleChangeRole
                : handleSubmit(handleChangeRole)
            }
            sx={{
              width: "50%",
              height: "50px",
            }}
            disabled={userData.role == "COMMON" && !isValid}
          >
            Mudar para {userData.role == "COMMON" ? "professional" : "common"}
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default ChangeRole;
