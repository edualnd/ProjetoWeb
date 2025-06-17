import { Stack, Typography, Box, TextField, Button } from "@mui/material";
import { useState } from "react";

const DeleteAccount = () => {
  const [confirm, setConfirm] = useState(null);
  const handleClick = () => {
    if (!confirm) {
      setConfirm(true);
    } else {
      setConfirm(false);
    }
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
          <Button
            variant="contained"
            onClick={handleClick}
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
