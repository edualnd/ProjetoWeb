import { Button } from "@mui/material";
import MainContent from "../components/MainContent.jsx";

import { useEffect } from "react";

import { userStore } from "../../store/userStore.js";
import { postStore } from "../../store/postsStore.js";
const HomePage = () => {
  const { loginUser } = userStore();

  const handleClick = async () => {
    await loginUser({ data: "profi", password: "Duda2006." });
  };

  return (
    <>
      <Button onClick={handleClick}>CLiquea aqui</Button>

      <MainContent></MainContent>
    </>
  );
};

export default HomePage;
