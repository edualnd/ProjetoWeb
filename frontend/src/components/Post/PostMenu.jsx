import {
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
import { EditPost } from "./EditPost.jsx";
import { postStore } from "../../../store/postsStore.js";

export const PostMenu = ({ id, post }) => {
  const { deletePost } = userStore();
  const { fetchData } = postStore();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const open = Boolean(menuAnchor);
  const handleOpenMenu = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };
  const [confirm, setConfirm] = useState(null);
  const handleClick = async () => {
    if (!confirm) {
      setConfirm(true);
    } else {
      const res = await deletePost(id);
      if (res.success) {
        console.log("Deletado");
        await fetchData();
        setConfirm(false);
        return;
      }
      alert(res.message);
      return;
    }
  };

  return (
    <>
      <>
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
            <EditPost id={id}></EditPost>
          </MenuItem>

          <Divider />

          <MenuItem
            component="div"
            sx={{
              height: 20,
              minHeight: 20,
              py: 0,
            }}
          >
            <IconButton type="button" onClick={() => handleClick()}>
              <DeleteIcon
                sx={{
                  fontSize: 20,
                  color: confirm ? "red" : "",
                }}
              ></DeleteIcon>
            </IconButton>
          </MenuItem>
        </Menu>
      </>
    </>
  );
};

export default PostMenu;
