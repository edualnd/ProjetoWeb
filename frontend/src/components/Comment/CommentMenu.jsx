import {
  Box,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  Dialog,
  DialogActions,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import CommentEditForm from "./CommentEditForm.jsx";

export const CommentMenu = ({ commentId, canEdit, canDelete }) => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const open = Boolean(menuAnchor);
  const handleOpenMenu = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };
  const [confirm, setConfirm] = useState(null);
  const handleClick = () => {
    if (!confirm) {
      setConfirm(true);
    } else {
      setConfirm(false);
    }
  };

  return (
    <>
      {canEdit || canDelete ? (
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
            {canEdit && (
              <MenuItem
                component="div"
                sx={{
                  height: 20,
                  minHeight: 20,
                  py: 0,
                }}
              >
                <CommentEditForm></CommentEditForm>
              </MenuItem>
            )}
            {canEdit && canDelete && <Divider />}
            {canDelete && (
              <MenuItem
                component="div"
                sx={{
                  height: 20,
                  minHeight: 20,
                  py: 0,
                }}
              >
                <IconButton
                  type="button"
                  onClick={() => handleClick(commentId)}
                >
                  <DeleteIcon
                    sx={{
                      fontSize: 20,
                      color: confirm ? "red" : "",
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
    </>
  );
};
