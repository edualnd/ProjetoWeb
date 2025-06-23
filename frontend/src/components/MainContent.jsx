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
import { postStore } from "../../store/postsStore.js";
import { useEffect } from "react";

const MainContent = () => {
  const { postsData } = postStore();

  const posts = postsData.posts || null;
  const { fetchData } = postStore();

  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "400px",
          mt: 8,
          display: "flex",
          flexDirection: "column",
          gap: 3,
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

        <Carossel />
        <Divider></Divider>
      </Box>
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

      <>
        {posts &&
          posts?.map((post) => {
            if (post.isEvent) {
              return <EventCard key={post.publicationId} post={post} />;
            }
            return <PostCard key={post.publicationId} post={post} />;
          })}
      </>
      {/* 
      <PostCard imagens={[imgEx]}></PostCard>
      <EventCard imagens={[imgEx, imgEx2]} subscribe={true}></EventCard>
      <EventCard
        id="ijk"
        imagens={[imgEx, imgEx2]}
        subscribe={false}
      ></EventCard> */}
    </>
  );
};

export default MainContent;
