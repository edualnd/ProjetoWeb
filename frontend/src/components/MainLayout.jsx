import { Container } from "@mui/material";

import Navbar from "./Navbar.jsx";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar logged={true}></Navbar>
      <Container
        sx={{
          maxWidth: { lg: "800px" },
        }}
      >
        {children}
      </Container>
    </>
  );
};

export default MainLayout;
