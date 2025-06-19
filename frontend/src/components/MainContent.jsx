import {
  Box,
  Button,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import PostCard from "./Post/PostCard.jsx";
import EventCard from "./Post/EventCard.jsx";

import CreatePostModal from "./Post/CreatePostModal.jsx";
import Carossel from "./Carossel.jsx";
const imgEx = "https://abre.ai/mXzv";
const imgEx2 = "https://abre.ai/mXzz";
const MainContent = () => {
  /**
   * const scrollToPost = (postId) => {
    const element = document.getElementById(`ijk`);
    console.log(element);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
   */
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "250px",
          my: 8,
        }}
      >
        <Typography
          component={"h3"}
          variant="h4"
          sx={{
            color: "ocean.dark",
            fontFamily: "inter",
            fontSize: { xs: "32px", lg: "36px" },
          }}
        >
          Próximos eventos
        </Typography>
        <div style={{ padding: "20px" }}>
          <h1>Meu Primeiro Carrossel</h1>
          <Carossel />
        </div>
      </Box>
      <Divider></Divider>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "60px",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Tooltip title="Criar Post">
          <CreatePostModal></CreatePostModal>
        </Tooltip>
      </Box>

      <Typography
        component={"h3"}
        variant="h5"
        sx={{
          color: "ocean.dark",
          fontFamily: "inter",
        }}
      >
        Últimas postagens
      </Typography>

      <PostCard imagens={[imgEx]}></PostCard>
      <EventCard imagens={[imgEx, imgEx2]} subscribe={true}></EventCard>
      <EventCard
        id="ijk"
        imagens={[imgEx, imgEx2]}
        subscribe={false}
      ></EventCard>
    </>
  );
};

export default MainContent;
