import {
  Stack,
  Box,
  Typography,
  ImageList,
  ImageListItem,
} from "@mui/material";

const InscriçoesCard = ({ imagens }) => {
  return (
    <>
      <Box
        sx={{
          ":hover": {
            cursor: "pointer",
          },
          height: "100%",
        }}
      >
        <Stack direction={"row"} sx={{ borderRadius: 2, overflow: "hidden" }}>
          {imagens && (
            <ImageListItem
              sx={{
                width: "40%",
              }}
            >
              <img
                src={imagens}
                alt="tez"
                style={{
                  height: "150px",
                  width: "100%",
                }}
              />
            </ImageListItem>
          )}
          <Box
            sx={{
              width: "100%",
              bgcolor: "#D9d9d9",
              height: "102px",
              maxHeight: "102px",
              p: 3,
            }}
          >
            <Typography variant="h6" component={"p"} color="ocean.dark">
              Titulo
            </Typography>
            <Typography variant="p" component={"p"} color="ocean.dark">
              26/06
            </Typography>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default InscriçoesCard;
