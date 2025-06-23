import { Box, Typography, Link } from "@mui/material";
import EventCard from "../components/Post/EventCard.jsx";
import ProfileInfo from "../components/ProfileInfo.jsx";
import PostCard from "../components/Post/PostCard.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { userStore } from "../../store/userStore.js";
import { Link as RouterLink } from "react-router-dom";
import UserProfilePage from "./UserProfilePage.jsx";

const ProfilePage = () => {
  const { username } = useParams();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const { getProfileByUsername } = userStore();
  const { userData } = userStore();
  const [follows, setFollows] = useState(false);
  useEffect(() => {
    const x = async () => {
      const res = await getProfileByUsername(username);
      if (res.success) {
        console.log("Dados pegos");
        setProfile({ ...res.perfil });
        setPosts([...res.perfil.Publication]);
        let isFollows;
        if (userData.logged) {
          isFollows = userData.following.some(
            (follow) => follow.followerBy.username === res.perfil.username
          );
        }
        setFollows(isFollows);
        return;
      } else if (res.status == 404) {
        console.log("Perfil nao encontrado");
        return;
      }
      alert(res.message);
      return;
    };
    x();
  }, []);
  const isProfileFromUser = username == userData.username;
  return (
    <>
      {isProfileFromUser ? (
        <UserProfilePage></UserProfilePage>
      ) : profile ? (
        <>
          <ProfileInfo
            userImage={profile.userImage}
            followers={profile._count?.followerBy}
            following={profile._count?.following}
            username={profile.username}
            followButton={userData.logged}
            follow={follows}
            bio={profile.bio}
            userId={profile.userId}
          ></ProfileInfo>
          <Box
            sx={{
              mt: 5,
              height: 40,
              bgcolor: "ocean.light",
              borderRadius: 20,
              border: "none",
              width: "100%",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "inter",
            }}
          >
            <Typography variant="p" color="white">
              PUBLICAÇÕES
            </Typography>
          </Box>
          <>
            {posts.map((post) => {
              if (post.isEvent) {
                return <EventCard key={post.publicationId} post={post} />;
              }
              return <PostCard key={post.publicationId} post={post} />;
            })}
          </>
        </>
      ) : (
        <>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 7,
              flexDirection: "column",
            }}
          >
            <Typography
              component={"h3"}
              variant="h3"
              sx={{
                fontFamily: "inter",
                color: "ocean.dark",
              }}
            >
              Não encontrado
            </Typography>
            <Link
              variant="h4"
              component={RouterLink}
              to="/"
              underline="none"
              sx={{
                fontSize: "20px",
                p: 1,
                borderRadius: 2,
                border: "1px solid #ECECEC",
                ":hover": {
                  color: "ocean.light",
                },
              }}
            >
              Voltar
            </Link>
          </Box>
        </>
      )}
    </>
  );
};

export default ProfilePage;
