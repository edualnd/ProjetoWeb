import { Stack, Typography, Box, TextField, Button } from "@mui/material";
import { useState } from "react";

const ChangeRole = () => {
  const [role, setRole] = useState("commom");
  const handleChangeRole = () => {
    setRole((prev) => (prev === "commom" ? "professional" : "commom"));
  };
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Tipo de conta
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography>
            Seu tipo de conta é {role}.{" "}
            {role == "commom"
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
          <Box
            sx={{
              mx: 5,
              width: "100%",
            }}
          >
            <TextField
              label="Senha atual"
              sx={{
                width: "100%",
              }}
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
              sx={{
                width: "100%",
              }}
            ></TextField>
          </Box>
          <Button
            variant="contained"
            onClick={handleChangeRole}
            sx={{
              width: "50%",
              height: "50px",
            }}
          >
            Mudar para {role == "commom" ? "professional" : "common"}
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default ChangeRole;
