import { Box, Avatar, Typography, List, ListItem } from "@mui/material";

import { useState } from "react";

import { CommentMenu } from "./CommentMenu.jsx";
import { userStore } from "../../../store/userStore.js";
const CommentCard = ({ comments, postAuthor }) => {
  const isComments = comments.length != 0;

  const { userData } = userStore();

  const updatedComments = comments.map((comment) => {
    let isOwnerComment = false;
    let isOwnerPost = false;

    if (userData.logged) {
      isOwnerComment = comment.User.userId === userData.userId;
      isOwnerPost = postAuthor == userData.userId;
    }

    return {
      ...comment,
      canEdit: isOwnerComment,
      canDelete: isOwnerComment || isOwnerPost,
    };
  });

  const [card] = useState(updatedComments);
  console.log(card);
  return (
    <>
      {isComments ? (
        <List>
          {card.map((comment) => (
            <ListItem key={comment.commentId}>
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
                  <Avatar
                    src={`https://res.cloudinary.com/dzkegljd1/image/upload/v1750800404/${comment.User.userImage}`}
                    sx={{ width: "40px", height: "40px" }}
                  ></Avatar>
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
                      {comment.User.username}
                    </Typography>
                    <Typography variant="body2" color="ocean.dark">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                  {comment.canEdit || comment.canDelete ? (
                    <>
                      <CommentMenu
                        canDelete={comment.canDelete}
                        canEdit={comment.canEdit}
                        commentId={comment.commentId}
                        text={comment.comment}
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
                    {comment.comment}
                  </Typography>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography color="#CBCBCB" align="center">
          Seja o primeiro a comentar
        </Typography>
      )}
    </>
  );
};

export default CommentCard;
