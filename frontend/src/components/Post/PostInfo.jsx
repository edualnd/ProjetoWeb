import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
const PostInfo = ({ content }) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Avatar sx={{ width: "54px", height: "54px" }}></Avatar>
        <Box>
          <Typography variant="h5" color="ocean.dark">
            {content.username}
          </Typography>
          <Typography variant="body2" color="ocean.dark">
            {content.date}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{
            fontFamily: "inter",
            color: "ocean.dark",
            whiteSpace: "pre-line",
            wordBreak: "break-word",
            textAlign: "justify",
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            px: 2,
          }}
        >
          {content.text}
        </Typography>
      </Box>
    </>
  );
};

export default PostInfo;
