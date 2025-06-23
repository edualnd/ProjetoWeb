import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemIcon,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userStore } from "../../../store/userStore.js";
const FollowsCard = ({ perfis, canEdit, follow, category }) => {
  const [confirm, setConfirm] = useState([]);
  const { stopFollowingProfile, blockFollower } = userStore();
  let res;
  const handleClick = async (id) => {
    if (confirm.includes(id)) {
      if (follow != "following") {
        res = await stopFollowingProfile({ daUnfollow: id });
      } else {
        res = await blockFollower({ bloqueia: id });
      }

      if (res.success) {
        setConfirm((prev) => prev.filter((c) => c !== id) || []);
        console.log("Deletado");
        return;
      }
      alert(res.message);
      return;
    } else {
      setConfirm((prev) => [...prev, id]);
      setTimeout(() => {
        setConfirm((prev) => prev.filter((c) => c !== id) || []);
      }, 3000);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {perfis == 0 ? (
          <Typography>{category}</Typography>
        ) : (
          perfis.map((value) => (
            <ListItem
              key={value.id}
              sx={{
                bgcolor: "#d9d9d9a1",
                my: 1,
                height: "90px",
                width: "95%",
                borderRadius: 2,
                gap: 2,
                ":hover": {
                  cursor: "pointer",
                },
              }}
              alignItems="flex-start"
            >
              <Box
                onClick={() => navigate(`/profile/${value[follow].username}`)}
                sx={{
                  display: "flex",
                  flex: 1,
                  gap: 2,
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      width: "60px",
                      height: "60px",
                    }}
                    src={value[follow].userImage}
                  ></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={value[follow].username}
                  secondary={
                    <>
                      <Typography component={"span"} variant="body2">
                        {value[follow].bio}
                      </Typography>
                    </>
                  }
                ></ListItemText>
              </Box>
              {canEdit ? (
                <ListItemIcon
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "80%",
                  }}
                >
                  <IconButton onClick={() => handleClick(value[follow].userId)}>
                    <DeleteIcon
                      sx={{
                        color: confirm.includes(value[follow].userId)
                          ? "red"
                          : "",
                      }}
                    ></DeleteIcon>
                  </IconButton>
                </ListItemIcon>
              ) : (
                ""
              )}
            </ListItem>
          ))
        )}
      </List>
    </>
  );
};

export default FollowsCard;
