import { Link as RouterLink } from "react-router-dom";
import { Avatar, Box, Typography, Link } from "@mui/material";
import PostMenu from "./PostMenu.jsx";
import { userStore } from "../../../store/userStore.js";
const PostInfo = ({ content }) => {
  const { userData } = userStore();
  let openMenu = false;

  if (userData.logged && userData.userId == content.userId) {
    openMenu = true;
  }

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Link
          component={RouterLink}
          to={`/profile/${content.username}`}
          underline="none"
          sx={{ flex: 1 }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <Avatar
              sx={{ width: "54px", height: "54px" }}
              src={content.userImage}
            ></Avatar>
            <Box sx={{ flex: 2 }}>
              <Typography variant="h5" color="ocean.dark">
                {content.username}
              </Typography>
              <Typography variant="body2" color="ocean.dark">
                {content.date}
              </Typography>
            </Box>
          </Box>
        </Link>

        {openMenu && <PostMenu></PostMenu>}
      </Box>
      <Box>
        <Typography
          sx={{
            fontFamily: "inter",
            color: "ocean.dark",
            whiteSpace: "pre-line",
            wordBreak: "break-word",
            textAlign: "justify",
            overflow: "hidden",
            px: 2,
          }}
        >
          {content.text}
        </Typography>
      </Box>
    </>
  );
};

export default PostInfo;
