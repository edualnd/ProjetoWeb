import {
  ImageList,
  ImageListItem,
  Box,
  Stack,
  Divider,
  ToggleButton,
} from "@mui/material";
import PostInfo from "../Post/PostInfo.jsx";
import { useState } from "react";
import CommentForm from "../Comment/CommentForm.jsx";
const PostsProfileCard = ({ imagens }) => {
  const tam = 0;
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
        {/* <ImageList
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
        </ImageList> */}
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
        </Stack>
      </Box>
    </>
  );
};

export default PostsProfileCard;
