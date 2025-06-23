import {
  DialogTitle,
  DialogContent,
  Dialog,
  DialogActions,
  Button,
  IconButton,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

import { useEffect, useState } from "react";

import iconIdenity from "../../assets/carteira-de-identidade.png";
import { postStore } from "../../../store/postsStore.js";
import { useNavigate } from "react-router-dom";
const GetInscricoes = ({ id }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  const { listSubs } = postStore();
  const [subs, setSubs] = useState([]);
  useEffect(() => {
    const x = async () => {
      const res = await listSubs(id);
      if (res.success) {
        setSubs(res.subs);
        return;
      }
      alert(res.message);
      return;
    };
    x();
  }, []);
  const navigate = useNavigate();

  return (
    <>
      <IconButton
        type="button"
        onClick={handleOpenModal}
        aria-label=""
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          width: "100%",
          height: "100%",
          p: 0,
          borderRadius: 0,
        }}
      >
        <img src={iconIdenity} width={"20px"} height={"20px"}></img>
      </IconButton>
      <Dialog
        open={openModal}
        onClose={handleOpenModal}
        sx={{
          "& .MuiPaper-root": {
            width: "100%",
            height: "auto",
          },
        }}
      >
        <DialogTitle>Inscritos</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <>
            <Stack spacing={2}>
              <List
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {subs.map((value) => (
                  <ListItem
                    key={value.User.userId}
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
                    onClick={() => navigate(`/profile/${value.User.username}`)}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          width: "60px",
                          height: "60px",
                        }}
                        src={value.User.userImage}
                      ></Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={value.User.username}
                      secondary={
                        <>
                          <Typography component={"span"} variant="body2">
                            {value.User.bio}
                          </Typography>
                        </>
                      }
                    ></ListItemText>
                  </ListItem>
                ))}
              </List>
            </Stack>
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenModal}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GetInscricoes;
