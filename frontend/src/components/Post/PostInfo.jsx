import { Link as RouterLink } from "react-router-dom";
import { Avatar, Box, Typography, Link } from "@mui/material";
import PostMenu from "./PostMenu.jsx";
const PostInfo = ({ content }) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Link
          component={RouterLink}
          to="/profile/a"
          underline="none"
          sx={{ flex: 1 }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <Avatar sx={{ width: "54px", height: "54px" }}></Avatar>
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

        <PostMenu></PostMenu>
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
/*
Interface Iproduto -> Produtos comprados

Interface IProdutosFabricados filho de Iproduto ->(Produto Fabricado)


IProdutosFabricados p -> ProdutoComrado e ProdutoFabricado

Gerente
*/