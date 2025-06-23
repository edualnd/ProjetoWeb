import {
  Stack,
  Typography,
  ImageListItem,
  Box,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { userStore } from "../../../store/userStore.js";

const InscriçoesCard = ({ post }) => {
  const imagens = [post.Publication.image, post.Publication.video].filter(
    (item) => item !== null
  );
  const [menuAnchor, setMenuAnchor] = useState(null);
  const open = Boolean(menuAnchor);
  const handleOpenMenu = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };
  const [confirm, setConfirm] = useState(null);
  const { deleteSubscribeEvent } = userStore();
  
  const handleClick = async () => {
    if (confirm) {
      const res = await deleteSubscribeEvent(post.Publication.publicationId);
      if (res.success) {
        setConfirm(false);
        handleCloseMenu();
        console.log("Deletado");
        return;
      }
      alert(res.message);
      return;
    } else {
      setConfirm(true);
      setTimeout(() => {
        setConfirm(false);
      }, 3000);
    }
  };
  const dataEvento = new Date(post.Publication.eventDate).toLocaleDateString();
  return (
    <>
      <Box
        sx={{
          ":hover": {
            cursor: "pointer",
          },
          height: "100%",
        }}
        key={post.Publication.publicationId}
      >
        <Stack direction={"row"} sx={{ borderRadius: 2, overflow: "hidden" }}>
          {imagens.length != 0 && (
            <ImageListItem
              sx={{
                width: "40%",
              }}
            >
              <img
                src={imagens[0]}
                alt="tez"
                style={{
                  height: "150px",
                  width: "100%",
                }}
              />
            </ImageListItem>
          )}
          <Stack direction={"row"}></Stack>
          <Stack
            sx={{
              width: "100%",
              bgcolor: "#D9d9d9",
              height: "102px",
              maxHeight: "102px",
              p: 3,
            }}
            direction={"row"}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" component={"p"} color="ocean.dark">
                {post.Publication.title}
              </Typography>
              <Typography
                variant="p"
                component={"p"}
                color="ocean.dark"
                sx={{ fontFamily: "inter" }}
              >
                {dataEvento}
              </Typography>
            </Box>
            <Box>
              <Box>
                <Tooltip title="more" aria-hidden="false">
                  <IconButton
                    type="button"
                    onClick={(event) => handleOpenMenu(event)}
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
                open={open}
                anchorEl={menuAnchor}
                onClose={handleCloseMenu}
                PaperProps={{
                  sx: {
                    height: "auto",
                    py: 0,
                    mt: "1px",
                  },
                }}
              >
                <MenuItem
                  component="div"
                  sx={{
                    height: 20,
                    minHeight: 20,
                    py: 0,
                  }}
                >
                  <IconButton type="button" onClick={handleClick}>
                    <DeleteIcon
                      sx={{
                        fontSize: 20,
                        color: confirm ? "red" : "",
                      }}
                    ></DeleteIcon>
                  </IconButton>
                </MenuItem>
              </Menu>
            </Box>
          </Stack>
        </Stack>
        <></>
      </Box>
    </>
  );
};

export default InscriçoesCard;
