import { Stack, TextField, Typography, Button, Box } from "@mui/material";
const ForgotPassword = () => {
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
          />
          <TextField
            variant="standard"
            id="confirmPass"
            label="Confirme a senha"
            sx={{
              width: "100%",
            }}
          />
          <Button>Trocar</Button>
        </Stack>
      </Box>
    </>
  );
};

export default ForgotPassword;
