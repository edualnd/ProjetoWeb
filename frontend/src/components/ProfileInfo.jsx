import {
  Stack,
  Box,
  Avatar,
  Typography,
  Button,
  ToggleButton,
  Divider,
  Link,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
const ProfileInfo = ({
  followButton,
  userImage,
  username,
  followers,
  following,
  bio,
}) => {
  const [followState, setFollowState] = useState(false);

  const handleClick = () => {
    setFollowState(!followState);
  };

  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignContent: "center",
          width: "95%",
          mt: 8,
          px: 3,
        }}
        spacing={1}
      >
        <Box
          sx={{
            mx: 4,
          }}
        >
          <Avatar
            src={userImage}
            alt="Foto de perfil"
            sx={{
              width: 240,
              height: 240,
            }}
          ></Avatar>
        </Box>

        <Stack
          direction={"column"}
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              width: "94%",
              justifyContent: "space-between",
              alignContent: "center",
              py: 3,
              pr: { xs: 3, lg: 8 },
              pl: 3,
            }}
          >
            <Typography
              variant="h3"
              component={"h2"}
              color="ocean.dark"
              sx={{
                maxWidth: "50%",
                width: "50%",
                fontWeight: 600,
                whiteSpace: "normal",
                wordWrap: "break-word",
                overflowWrap: "break-word",
              }}
            >
              {username}
            </Typography>
            <Stack
              direction={"row"}
              spacing={4}
              sx={{
                height: "30%",
              }}
            >
              <Link
                component={RouterLink}
                to={"follows/Seguindo"}
                underline="none"
              >
                <Box>
                  <Typography variant="h5" component={"p"} color="ocean.dark">
                    {followers}
                  </Typography>
                  <Typography
                    variant="h5"
                    component={"p"}
                    color="ocean.dark"
                    sx={{
                      fontWeight: 900,
                    }}
                  >
                    Seguidores
                  </Typography>
                </Box>
              </Link>
              <Link
                component={RouterLink}
                to={"follows/Seguidores"}
                underline="none"
              >
                <Box>
                  <Typography variant="h5" component={"p"} color="ocean.dark">
                    {following}
                  </Typography>
                  <Typography
                    variant="h5"
                    component={"p"}
                    color="ocean.dark"
                    sx={{
                      fontWeight: 900,
                    }}
                  >
                    Seguindo
                  </Typography>
                </Box>
              </Link>
            </Stack>
          </Stack>
          {followButton && (
            <Box sx={{ mt: 5 }}>
              <ToggleButton
                selected={followState}
                onClick={handleClick}
                sx={{
                  width: "100%",
                  bgcolor: "ocean.light",
                  color: "white",
                  height: 40,
                  borderRadius: 20,
                  ":hover": {
                    bgcolor: "ocean.main",
                    color: "white",
                  },
                  "&.Mui-selected": {
                    color: "white",
                    bgcolor: "error.dark",
                    borderRadius: 20,
                  },
                  "&.Mui-selected:hover": {
                    bgcolor: "error.main",
                  },
                }}
              >
                {followState ? "Deixar de seguir" : "Seguir"}
              </ToggleButton>
            </Box>
          )}
        </Stack>
      </Stack>
      <Box
        sx={{
          mx: 5,
          my: 5,
        }}
      >
        <Typography
          variant="p"
          color="ocean.dark"
          sx={{
            fontSize: 24,
            fontFamily: "inter",
          }}
        >
          {bio}
        </Typography>
      </Box>
      <Divider
        sx={{
          border: 2,
          borderRadius: 10,
          borderColor: "#d9d9d9",
          opacity: 0.2,
        }}
      ></Divider>
    </>
  );
};

export default ProfileInfo;
