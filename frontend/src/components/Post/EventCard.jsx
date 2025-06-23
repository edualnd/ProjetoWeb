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
import { postStore } from "../../../store/postsStore.js";
import { userStore } from "../../../store/userStore.js";

const EventCard = ({ post }) => {
  const image = [post.video, post.image].filter((item) => item != null);
  const tam = image.length > 1 ? 2 : 1;
  const [openComments, setOpenComments] = useState(false);

  const { getComments } = postStore();
  const { userData } = userStore();
  const handleOpenComments = async () => {
    if (!post.comments || post.comments?.length == 0) {
      await getComments(post.publicationId);
    }
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
        id={post.publicationId}
      >
        <ImageList
          cols={tam}
          sx={{
            mt: 0,
            borderRadius: "16px 16px 0 0",
          }}
        >
          {image.map((img, index) => (
            <ImageListItem key={index}>
              <img
                src={`https://res.cloudinary.com/dzkegljd1/image/upload/v1750689629/${img}`}
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
          <EventInfo content={post}></EventInfo>

          <Divider></Divider>
          {openComments && (
            <CommentCard
              comments={post.comments || []}
              postAuthor={post.authorId}
            ></CommentCard>
          )}
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
            {userData.logged && (
              <CommentForm id={post.publicationId}></CommentForm>
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
