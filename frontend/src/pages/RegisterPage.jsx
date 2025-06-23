import { Stack, Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import backgroundImage from "../assets/backgroundImage.png";
import RegisterForm from "../components/forms/RegisterForm.jsx";

const RegisterPage = () => {
  return (
    <>
      <Typography component="h1">
        <Link
          variant="h4"
          underline="none"
          component={RouterLink}
          sx={{
            color: { xs: "white", lg: "ocean.dark" },
            textAlign: "center",
            fontFamily: "inter",
            fontWeight: 900,
            fontStyle: "italic",
            position: "absolute",
            zIndex: 3,
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
          sx={{
            position: { xs: "absolute", lg: "relative" },
            zIndex: 1,
            height: {
              xs: "85vh",
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

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          <RegisterForm></RegisterForm>
          <Link
            underline="hover"
            variant="h6"
            color="ocean.dark"
            sx={{
              ":hover": {
                cursor: "pointer",
                bgcolor: "#d8e5f380",
                borderRadius: 1,
              },
              p: "8px",
              textTransform: "none",
              fontFamily: "Inter",
              fontSize: "16px",
            }}
            href="/login"
          >
            Já tenho conta
          </Link>
        </Box>

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
      </Stack>
    </>
  );
};

export default RegisterPage;
