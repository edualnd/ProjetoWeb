import {
  ImageList,
  ImageListItem,
  Box,
  Stack,
  Divider,
  ToggleButton,
  Link,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import CommentCard from "../Comment/CommentCard.jsx";

import PostInfo from "./PostInfo.jsx";
import CommentForm from "../Comment/CommentForm.jsx";
import { postStore } from "../../../store/postsStore.js";
import { userStore } from "../../../store/userStore.js";

const PostCard = ({ post }) => {
  const image = [post.video, post.image].filter((item) => item != null);
  const tam = image.length > 1 ? 2 : 1;
  const data = new Date(post.createdAt).toLocaleDateString();
  const { getComments } = postStore();
  const { userData } = userStore();
  const [openComments, setOpenComments] = useState(false);

  const handleOpenComments = async () => {
    if (!post.comments || post.comments?.length == 0) {
      await getComments(post.publicationId);
    }
    setOpenComments(!openComments);
  };

  return (
    <>
      <Box
        id={post.publicationId}
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
          {image.map((img, index) => (
            <>
              {img && (
                <ImageListItem key={index}>
                  <img
                    src={img || null}
                    alt=""
                    style={{
                      maxHeight: "500px",
                      height: "500px",
                      width: "100%",
                    }}
                  />
                </ImageListItem>
              )}
            </>
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
              username: post.User.username,
              userId: post.User.userId,
              date: data,
              text: post.text,
              userImage: post.User.userImage,
              publicationId: post.publicationId,
            }}
          ></PostInfo>
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

export default PostCard;
