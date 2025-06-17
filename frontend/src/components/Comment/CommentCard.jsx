import {
  Box,
  Avatar,
  Typography,
  List,
  ListItem,
} from "@mui/material";

import { useState } from "react";

import { CommentMenu } from "./CommentMenu.jsx";
const CommentCard = ({ comments }) => {
  const [card, setCard] = useState(comments);

  
 
  return (
    <>
      <List>
        {card.map((comment) => (
          <ListItem key={comment.id}>
            <Box
              sx={{
                height: "auto",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  justifyContent: "space-between",
                  alignItems: "center",

                  width: "100%",
                }}
              >
                <Avatar sx={{ width: "40px", height: "40px" }}></Avatar>
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    component={"p"}
                    color="ocean.dark"
                    sx={{
                      fontFamily: "inter",
                    }}
                  >
                    {comment.username}
                  </Typography>
                  <Typography variant="body2" color="ocean.dark">
                    {comment.date}
                  </Typography>
                </Box>
                {comment.canEdit || comment.canDelete ? (
                  <>
                    <CommentMenu
                      canDelete={comment.canDelete}
                      canEdit={comment.canEdit}
                      commentId={comment.id}
                    ></CommentMenu>
                  </>
                ) : (
                  ""
                )}
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
                    px: 1,
                    ml: 6,
                    mt: -1,
                  }}
                >
                  {comment.text}
                </Typography>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default CommentCard;
