import { Box, Typography } from "@mui/material";
import PostCard from "./Post/PostCard.jsx";
import EventCard from "./Post/EventCard.jsx";
const imgEx = "https://abre.ai/mXzv";
const imgEx2 = "https://abre.ai/mXzz";
const MainContent = () => {
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
      <EventCard imagens={[imgEx, imgEx2]} subscribe={false}></EventCard>
    </>
  );
};

export default MainContent;
