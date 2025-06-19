import {
  ImageList,
  ImageListItem,
  Box,
  Stack,
  Typography,
  Divider,
  IconButton,
  ToggleButton,
  ListItem,
  List,
  Button,
} from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState } from "react";
import CommentCard from "../Comment/CommentCard.jsx";

import EventInfo from "./EventInfo.jsx";
import CommentForm from "../Comment/CommentForm.jsx";
const commentsEx = [
  {
    id: 1,
    username: "joao_silva",
    date: "2025-06-16",
    text: "Muito bom esse post! Parabéns pelo conteúdo.",
  },
  {
    id: 2,
    username: "ana_pereira",
    date: "2025-06-15",
    text: "Achei muito interessante, obrigado por compartilhar!",
  },
  {
    id: 3,
    username: "carlos_oliveira",
    date: "2025-06-14",
    text: "Tenho uma dúvida sobre o tema, poderia explicar mais?",
  },
];

const EventCard = ({ id, imagens, subscribe }) => {
  const tam = imagens.length > 1 ? 2 : 1;
  const [openComments, setOpenComments] = useState(false);
  const [comment, setComment] = useState(false);

  const handleOpenComments = () => {
    setOpenComments(!openComments);
  };
  const handleComment = () => {
    setComment(!comment);
  };

  return (
    <>
      <Box
        id={id}
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
          <EventInfo
            content={{
              title: "Cachoeira .....",
              date: "12/12/2012",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, sunt?",
            }}
            subscribe={subscribe}
          ></EventInfo>

          <Divider></Divider>
          {openComments && <CommentCard comments={commentsEx}></CommentCard>}
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
            {/*  */}

            {comment ? (
              <Stack
                direction={"row"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                sx={{ width: "100%", height: "100%", px: 1 }}
              >
                <Stack
                  direction={"row"}
                  justifyContent={"center"}
                  alignContent={"center"}
                  sx={{
                    bgcolor: "#ECEDEE",
                    width: "100%",
                    height: "75%",
                    borderRadius: 3,
                  }}
                >
                  <CommentForm></CommentForm>
                  <IconButton onClick={handleComment}>
                    <CloseRoundedIcon
                      sx={{
                        color: "ocean.dark",
                      }}
                    ></CloseRoundedIcon>
                  </IconButton>
                </Stack>
              </Stack>
            ) : (
              <IconButton
                sx={{
                  gap: 1,
                  alignItems: "center",
                  borderRadius: 2,
                  flex: 1,
                }}
                onClick={handleComment}
              >
                <AddCommentIcon></AddCommentIcon>
                <Typography
                  variant="body"
                  component={"span"}
                  sx={{
                    fontSize: "20px",
                  }}
                >
                  Comentar
                </Typography>
              </IconButton>
            )}
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

export default EventCard;
