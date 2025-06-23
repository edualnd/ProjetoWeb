import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Stack,
  Box,
  Typography,
  Link,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
} from "@mui/material";
import { userStore } from "../../store/userStore.js";

const Navbar = ({ logged, userIamge, username }) => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const open = Boolean(menuAnchor);
  const handleMenuClick = (event) => {
    if (open) setMenuAnchor(null);
    else setMenuAnchor(event.currentTarget);
  };
  const { logoutUser, userData } = userStore();
  const handleLogout = async () => {
    const res = await logoutUser();
    if (res.success) {
      console.log("deslogado");
      return;
    }
    alert(res.message);
    return;
  };

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"row"}
        gap={2}
        justifyContent={"space-between"}
        sx={{ px: 2, bgcolor: "ocean.dark", height: 70, alignItems: "center" }}
      >
        <Link
          variant="h4"
          underline="none"
          component={RouterLink}
          sx={{}}
          to="/"
        >
          <Typography
            variant="h4"
            component={"h1"}
            sx={{
              color: "white",
              alignContent: "center",
              fontFamily: "inter",
              fontWeight: 900,
              fontStyle: "italic",
            }}
          >
            LITSPORT
          </Typography>
        </Link>
        {logged ? (
          <Stack spacing={2} direction="row" alignItems={"center"}>
            <Typography variant="h6" color="white">
              {username}
            </Typography>
            <Box>
              <Tooltip
                title="Configurações"
                sx={{ ":hover": { cursor: "pointer" } }}
              >
                <IconButton
                  onClick={handleMenuClick}
                  sx={{
                    ":hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <Avatar
                    alt="Foto de perfil"
                    src={
                      userData.userImage &&
                      `https://res.cloudinary.com/dzkegljd1/image/upload/v1750689629/${userData.userImage}`
                    }
                  ></Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              open={open}
              anchorEl={menuAnchor}
              onClose={handleMenuClick}
              PaperProps={{
                sx: {
                  height: "auto",
                  py: "1px",
                  mt: "7px",
                },
              }}
            >
              <MenuItem
                sx={{
                  height: 30,
                  minHeight: 30,
                  py: 0,
                }}
              >
                <ListItemIcon>
                  <AccountCircleIcon sx={{ fontSize: 24 }}></AccountCircleIcon>
                </ListItemIcon>
                <Typography component="p">
                  <Link
                    variant="p"
                    underline="none"
                    component={RouterLink}
                    to={`/profile/${userData.username}`}
                    color="ocean.dark"
                  >
                    Meu perfil
                  </Link>
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem
                sx={{
                  height: 30,
                  minHeight: 30,
                  py: 0,
                }}
              >
                <ListItemIcon>
                  <SettingsIcon sx={{ fontSize: 24 }}></SettingsIcon>
                </ListItemIcon>
                <Typography component="p">
                  <Link
                    variant="p"
                    underline="none"
                    component={RouterLink}
                    to="/config"
                    color="ocean.dark"
                  >
                    Configurações
                  </Link>
                </Typography>
              </MenuItem>
              <Divider> </Divider>
              <MenuItem
                sx={{
                  height: 30,
                  minHeight: 30,
                  py: 0,
                }}
                onClick={handleLogout}
              >
                <ListItemIcon>
                  <LogoutIcon sx={{ fontSize: 24 }}></LogoutIcon>
                </ListItemIcon>
                <Typography component="p">Logout</Typography>
              </MenuItem>
            </Menu>
          </Stack>
        ) : (
          <Stack spacing={2} direction="row" alignItems={"center"}>
            <Button
              variant="outlined"
              color=""
              disableRipple
              sx={{
                height: 40,
                borderWidth: 2,
                borderColor: "#ffffffb4",
                color: "#ffffff",
                fontWeight: "bold",
                borderRadius: 2,
                ":hover": {
                  borderColor: "#fff",
                },
              }}
              href="/login"
            >
              Entrar
            </Button>

            <Button
              variant="contained"
              color=""
              href="/register"
              disableRipple
              sx={{
                bgcolor: "ocean.light",
                height: 40,
                color: "white",
                fontWeight: "bold",
                borderRadius: 2,
                ":hover": {
                  bgcolor: "ocean.main",
                },
              }}
            >
              Cadastrar
            </Button>
          </Stack>
        )}
      </Box>
    </>
  );
};

export default Navbar;
