import { Stack, Typography, Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../../store/userStore.js";
const registerSchema = z.object({
  password: z
    .string()
    .nonempty("A senha é obrigatório")
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .max(100, "Senha muito longa"),
});

const DeleteAccount = () => {
  const [confirm, setConfirm] = useState(null);
  const handleClick = () => {
    console.log("a");
    if (!confirm) {
      setConfirm(true);
    } else {
      handleDelete();
      setConfirm(false);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });
  const navigate = useNavigate();
  const { deleteUser } = userStore();
  const handleDelete = async (data) => {
    const res = await deleteUser(data);
    if (res.success) {
      console.log("Deletado");
      navigate("/");
      return;
    }
    alert(res.message);
    return;
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Deletar conta
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
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {!confirm ? "" : "Tem certeza?"}
          </Typography>
          {confirm && (
            <>
              <TextField
                error={errors?.password}
                label="Senha"
                sx={{ width: "50%" }}
                {...register("password")}
                helperText={
                  errors?.password ? `${errors?.password?.message}` : ""
                }
              ></TextField>
            </>
          )}
          <Button
            variant="contained"
            onClick={confirm ? handleSubmit(handleDelete) : handleClick}
            sx={{
              width: "50%",
              height: "50px",
              bgcolor: !confirm ? "#d9d9d9" : "error.main",
              color: !confirm ? "ocean.dark" : "white",
            }}
          >
            Deletar
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default DeleteAccount;
