import CustomToggleButton from "../components/CustomToggleButton.jsx";
import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  IconButton,
  Stack,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import FollowsCard from "../components/Follow/FollowsCard.jsx";
const imagens = [
  { id: 1, title: "Card 1" },
  { id: 2, title: "Card 2" },
  { id: 3, title: "Card 3" },
];
const FollowsPage = () => {
  const { category } = useParams();
  const [categoryView, setCategoryView] = useState(category);

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{
          alignItems: "center",
          mt: 8,
        }}
      >
        <IconButton component={RouterLink} to={"../"}>
          <ArrowBackIosIcon></ArrowBackIosIcon>
        </IconButton>
        <Typography variant="h4" color="initial">
          Username
        </Typography>
      </Stack>

      <CustomToggleButton
        categories={["Seguindo", "Seguidores"]}
        selected={categoryView}
        onChange={(event, category) =>
          setCategoryView((prev) => category || prev)
        }
      ></CustomToggleButton>
      <Stack>
        {categoryView == "Seguindo" ? (
          <FollowsCard perfis={imagens} canEdit={false}></FollowsCard>
        ) : (
          <FollowsCard perfis={imagens} canEdit={false}></FollowsCard>
        )}
      </Stack>
    </>
  );
};

export default FollowsPage;
