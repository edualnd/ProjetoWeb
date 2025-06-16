import { Stack, Box, Typography, Link } from "@mui/material";
import backgroundImage from "../assets/backgroundImage.png";
import { Link as RouterLink } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm.jsx";

const LoginPage = () => {
  return (
    <>
      <Typography component="h1">
        <Link
          variant="h4"
          underline="none"
          component={RouterLink}
          sx={{
            color: "white",
            textAlign: "center",
            fontFamily: "inter",
            fontWeight: 900,
            fontStyle: "italic",
            position: "absolute",
            zIndex: 1,
            p: 2,
            ":hover": {
              cursor: "pointer",
            },
          }}
          to="/"
        >
          LITSPORT
        </Link>
      </Typography>
      <Stack
        direction={"row"}
        spacing={0}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component={"img"}
          src={backgroundImage}
          sx={{
            height: "100vh",
            width: {
              xs: "100vw",
              lg: "50%",
            },
            position: "relative",
            zIndex: -1,
            overflow: "hidden",
            objectFit: "cover",
          }}
        ></Box>
        <Box
          sx={{
            position: { xs: "absolute", lg: "relative" },
            zIndex: 1,
            height: {
              xs: "80vh",
              lg: "100vh",
            },
            width: {
              xs: "70vw",
              lg: "50vw",
            },
            bgcolor: "#E6EFF2",
            borderRadius: {
              xs: 5,
              lg: 0,
            },
            justifyItems: "center",
            alignContent: "center",
          }}
        >
          <LoginForm></LoginForm>
          <Stack spacing={3} direction={"row"}>
            <Link
              underline="hover"
              variant="h6"
              color="ocean.dark"
              sx={{
                ":hover": {
                  color: "ocean.main",
                  cursor: "pointer",
                },
              }}
              href="/"
            >
              Esqueci a senha
            </Link>
            <Link
              underline="hover"
              variant="h6"
              color="ocean.dark"
              sx={{
                ":hover": {
                  color: "ocean.main",
                  cursor: "pointer",
                },
              }}
              href="/register"
            >
              Não tenho conta
            </Link>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default LoginPage;
