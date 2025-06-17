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

const ChangeEmail = ({ openModal }) => {
  console.log("aqui");

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
              id="novoEmail"
              sx={{
                width: "100%",
              }}
            ></TextField>
          </Box>
          <OTPModal open={openModal}></OTPModal>
        </Stack>
      </Box>
    </>
  );
};

export default ChangeEmail;
