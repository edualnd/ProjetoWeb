import CustomToggleButton from "../components/CustomToggleButton.jsx";
import { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import FollowsCard from "../components/Follow/FollowsCard.jsx";
import { userStore } from "../../store/userStore.js";

const FollowsPage = () => {
  const { category, username } = useParams();
  const [categoryView, setCategoryView] = useState(category);
  const [follows, setFollows] = useState({
    follower: [],
    following: [],
  });
  const { listFollowing, listFollower } = userStore();

  const followingFun = async () => {
    const following = await listFollowing(username);

    if (following.success) {
      setFollows((prev) => ({ ...prev, following: following.following }));
      return;
    }
    alert(following.message);
    return;
  };
  const followerFun = async () => {
    const follower = await listFollower(username);

    if (follower.success) {
      setFollows((prev) => ({ ...prev, follower: follower.follower }));
      return;
    }
    alert(follower.message);
    return;
  };
  const handleClick = (category) => {
    setCategoryView((prev) => category || prev);
    if (categoryView == "Seguindo") {
      followingFun();
    } else {
      followerFun();
    }
  };
  useEffect(() => {
    console.log("aaaa");
    if (category == "Seguindo") {
      followerFun();
    } else {
      followingFun();
    }
  }, []);
  const { userData } = userStore();
  let canEdit = false;
  if (userData.logged) {
    canEdit = userData.username == username;
  }

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
        <IconButton component={RouterLink} to={`../${username}`}>
          <ArrowBackIosIcon></ArrowBackIosIcon>
        </IconButton>
        <Typography variant="h4" color="initial">
          {username}
        </Typography>
      </Stack>

      <CustomToggleButton
        categories={["Seguindo", "Seguidores"]}
        selected={categoryView}
        onChange={(event, category) => handleClick(category)}
      ></CustomToggleButton>
      <Stack>
        {categoryView == "Seguindo" ? (
          <FollowsCard
            perfis={follows.following || []}
            canEdit={canEdit}
            follow="followerBy"
            category="Não segue ninguem"
          ></FollowsCard>
        ) : (
          <FollowsCard
            perfis={follows.follower || []}
            canEdit={canEdit}
            follow="following"
            category="Não tem seguidores"
          ></FollowsCard>
        )}
      </Stack>
    </>
  );
};

export default FollowsPage;
