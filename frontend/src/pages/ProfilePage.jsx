import { Box, Typography } from "@mui/material";
import Post from "../components/Post/PostsProfileCard.jsx";
import ProfileInfo from "../components/ProfileInfo.jsx";
import PostCard from "../components/Post/PostCard.jsx";

const imagensEx = [
  "https://i.pinimg.com/236x/9e/41/d3/9e41d39158a0e30da1ab9b25f29b8b9d.jpg",
  "https://images.unsplash.com/photo-1726137570057-2f410417c3ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
  "https://plus.unsplash.com/premium_photo-1664110690525-1fe1da8375a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
  "https://plus.unsplash.com/premium_photo-1664637952509-c2627f44406b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmxvcmVzdHxlbnwwfHwwfHx8MA%3D%3D",
];
const ProfilePage = () => {
  return (
    <>
      <ProfileInfo
        userImage={""}
        followers={"1.900"}
        following={"10"}
        username={"Username"}
        followButton={true}
        bio={
          "Gato curioso, ama sonecas ao sol, caça sombras e busca carinho entre uma aventura e outra."
        }
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
        {imagensEx.map((imagem) => (
          <PostCard imagens={[imagem]} />
        ))}
      </>
    </>
  );
};

export default ProfilePage;
