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

import EditEvent from "./EditEvent.jsx";
import GetInscricoes from "./GetInscricoes.jsx";
import { postStore } from "../../../store/postsStore.js";

const EventMenu = ({ id }) => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const open = Boolean(menuAnchor);
  const handleOpenMenu = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };
  const [confirm, setConfirm] = useState(null);
  const { deletePost, fetchData } = postStore();
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
            <EditEvent></EditEvent>
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
          {/*Verificar se pode se inscrever */}

          <Divider></Divider>
          <MenuItem>
            <GetInscricoes id={id}></GetInscricoes>
          </MenuItem>
        </Menu>
      </>
    </>
  );
};

export default EventMenu;
