import { Stack, Typography, Box, TextField, Button } from "@mui/material";
const ChangeEmail = () => {
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
            sx={{
              width: "50%",
              height: "50px",
            }}
          >
            Mudar
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default ChangeEmail;
