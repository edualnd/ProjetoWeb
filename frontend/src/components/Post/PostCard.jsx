import {
  ImageList,
  ImageListItem,
  Box,
  Stack,
  Divider,
  ToggleButton,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import { useState } from "react";
import CommentCard from "../Comment/CommentCard.jsx";

import PostInfo from "./PostInfo.jsx";
import CommentForm from "../Comment/CommentForm.jsx";
const comments = [
  {
    id: 1,
    username: "joao_silva",
    date: "2025-06-16",
    text: "Muito bom esse post! Parabéns pelo conteúdo.",
    canEdit: true,
    canDelete: false,
  },
  {
    id: 2,
    username: "ana_pereira",
    date: "2025-06-15",
    text: "Achei muito interessante, obrigado por compartilhar!",
    canEdit: true,
    canDelete: true,
  },
  {
    id: 3,
    username: "carlos_oliveira",
    date: "2025-06-14",
    text: "Tenho uma dúvida sobre o tema, poderia explicar mais?",
    canEdit: false,
    canDelete: true,
  },
];

const PostCard = ({ imagens }) => {
  const tam = imagens.length > 1 ? 2 : 1;
  const [openComments, setOpenComments] = useState(false);

  const handleOpenComments = () => {
    setOpenComments(!openComments);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          borderRadius: 4,
          overflow: "hidden",
          my: 2,
          pb: 2,
          border: "1px solid #ECEDEE",
        }}
      >
        <ImageList
          cols={tam}
          sx={{
            mt: 0,
            borderRadius: "16px 16px 0 0",
          }}
        >
          {imagens.map((img, index) => (
            <ImageListItem key={index}>
              <img
                src={img}
                alt=""
                style={{
                  maxHeight: "250px",
                  height: "250px",
                  width: "100%",
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Stack
          direction={"column"}
          sx={{
            px: 2,
          }}
          spacing={1}
        >
          <PostInfo
            content={{
              username: "User",
              date: "12/12/2012",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, sunt?",
            }}
          ></PostInfo>
          <Divider></Divider>
          {openComments && <CommentCard comments={comments}></CommentCard>}
          <Box
            sx={{
              m: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "50px",
            }}
          >
            <CommentForm></CommentForm>

            <ToggleButton
              selected={openComments}
              onClick={handleOpenComments}
              sx={{
                borderRadius: 1,
                border: "none",
              }}
            >
              {openComments ? (
                <ArrowDropUpIcon></ArrowDropUpIcon>
              ) : (
                <ArrowDropDownIcon></ArrowDropDownIcon>
              )}
            </ToggleButton>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default PostCard;
