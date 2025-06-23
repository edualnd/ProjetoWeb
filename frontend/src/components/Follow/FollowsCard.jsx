import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const FollowsCard = ({ perfis, canEdit, follow }) => {
  const [confirm, setConfirm] = useState([]);
  const handleClick = (id) => {
    if (confirm.includes(id)) {
      setConfirm((prev) => prev.filter((c) => c !== id) || []);
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
        {perfis.map((value) => (
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
            onClick={() => navigate(`/profile/${value[follow].username}`)}
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
            {canEdit ? (
              <ListItemIcon
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "80%",
                }}
              >
                <IconButton onClick={() => handleClick(value.id)}>
                  <DeleteIcon
                    sx={{
                      color: confirm.includes(value.id) ? "red" : "",
                    }}
                  ></DeleteIcon>
                </IconButton>
              </ListItemIcon>
            ) : (
              ""
            )}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default FollowsCard;
