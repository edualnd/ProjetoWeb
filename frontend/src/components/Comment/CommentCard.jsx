import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  Link,
  Menu,
  MenuItem,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const CommentCard = ({ comments }) => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const handleMenuClick = (event, id) => {
    if (selectedCommentId === id) {
      setMenuAnchor(null);
      setSelectedCommentId(null);
    } else {
      setMenuAnchor(event.currentTarget);
      setSelectedCommentId(id);
    }
  };
  const [card, setCard] = useState(comments);
  const [confirm, setConfirm] = useState([]);
  const handleClick = (id) => {
    if (confirm.includes(id)) {
      setCard((prev) => prev.filter((c) => c.id !== id));
      setConfirm((prev) => prev.filter((c) => c !== id) || []);
    } else {
      setConfirm((prev) => [...prev, id]);
      setTimeout(() => {
        setConfirm((prev) => prev.filter((c) => c !== id) || []);
      }, 3000);
    }
  };
  card.map((comment) => console.log(comment));
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
                    <Box>
                      <Tooltip title="more">
                        <IconButton
                          onClick={(event) =>
                            handleMenuClick(event, comment.id)
                          }
                          sx={{
                            ":hover": {
                              cursor: "pointer",
                            },
                          }}
                        >
                          <MoreVertIcon></MoreVertIcon>
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Menu
                      open={selectedCommentId === comment.id}
                      anchorEl={menuAnchor}
                      onClose={handleMenuClick}
                      PaperProps={{
                        sx: {
                          height: "auto",
                          py: 0,
                          mt: "1px",
                        },
                      }}
                    >
                      {comment.canEdit && (
                        <MenuItem
                          sx={{
                            height: 20,
                            minHeight: 20,
                            py: 0,
                          }}
                        >
                          <IconButton>
                            <EditIcon sx={{ fontSize: 20 }}></EditIcon>
                          </IconButton>
                        </MenuItem>
                      )}
                      {comment.canEdit && comment.canDelete && <Divider />}
                      {comment.canDelete && (
                        <MenuItem
                          sx={{
                            height: 20,
                            minHeight: 20,
                            py: 0,
                          }}
                        >
                          <IconButton onClick={() => handleClick(comment.id)}>
                            <DeleteIcon
                              sx={{
                                fontSize: 20,
                                color: confirm.includes(comment.id)
                                  ? "red"
                                  : "",
                              }}
                            ></DeleteIcon>
                          </IconButton>
                        </MenuItem>
                      )}
                    </Menu>
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
