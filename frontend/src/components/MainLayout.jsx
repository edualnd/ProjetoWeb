import { Container } from "@mui/material";
import { userStore } from "../../store/userStore.js";
import Navbar from "./Navbar.jsx";

const MainLayout = ({ children }) => {
  const { userData } = userStore();
  
  return (
    <>
      <Navbar
        logged={userData.logged}
        userIamge={userData.userImage}
        username={userData.username}
      ></Navbar>
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
