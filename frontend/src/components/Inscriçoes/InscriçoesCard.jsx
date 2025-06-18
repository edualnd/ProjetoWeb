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

const InscriçoesCard = ({ imagens }) => {
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
      <Box
        sx={{
          ":hover": {
            cursor: "pointer",
          },
          height: "100%",
        }}
      >
        <Stack direction={"row"} sx={{ borderRadius: 2, overflow: "hidden" }}>
          {imagens && (
            <ImageListItem
              sx={{
                width: "40%",
              }}
            >
              <img
                src={imagens}
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
                Titulo
              </Typography>
              <Typography variant="p" component={"p"} color="ocean.dark">
                26/06
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
