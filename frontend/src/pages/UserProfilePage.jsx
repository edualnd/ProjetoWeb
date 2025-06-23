import ProfileInfo from "../components/ProfileInfo.jsx";
import CustomToggleButton from "../components/CustomToggleButton.jsx";
import { useEffect, useState } from "react";
import PostCard from "../components/Post/PostCard.jsx";
import EventCard from "../components/Post/EventCard.jsx";
import InscriçoesCard from "../components/Inscriçoes/InscriçoesCard.jsx";
import { ImageList } from "@mui/material";
import { userStore } from "../../store/userStore.js";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const { userData, getProfile } = userStore();
  const [categoryView, setCategoryView] = useState("Publicações");
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const get = async () => {
      const res = await getProfile();
      if (res.success) {
        setData(res.perfil);
      } else {
        navigate("/");
        alert("Erro ao carregar o perfil");
      }
    };
    get();
  }, []);
  console.log(data);
  const posts = data.Publication || [];

  return (
    <>
      <ProfileInfo
        userImage={userData.userImage}
        followers={data._count?.followerBy}
        following={data._count?.following}
        username={userData.username}
        followButton={false}
        bio={userData.bio}
      ></ProfileInfo>
      <CustomToggleButton
        categories={["Publicações", "Inscrições"]}
        selected={categoryView}
        onChange={(event, category) =>
          setCategoryView((prev) => category || prev)
        }
      ></CustomToggleButton>

      {categoryView == "Publicações" ? (
        <>
          {posts.map((post) => {
            if (post.isEvent) {
              return <EventCard post={post} />;
            }
            return <PostCard post={post} />;
          })}
        </>
      ) : (
        <>
          <ImageList cols={2} rowHeight={150}>
            {data.EventSubscription.map((e) => (
              <InscriçoesCard post={e} />
            ))}
          </ImageList>
        </>
      )}
    </>
  );
};

export default UserProfilePage;
