
import { Box, Stack, Typography, Button } from "@mui/material";
const EventInfo = ({ content, subscribe }) => {
  return (
    <>
      <Stack spacing={4}>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <Box>
            <Typography variant="h5" color="ocean.dark">
              {content.title}
            </Typography>
            <Typography variant="body2" color="ocean.dark">
              {content.date}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography
            sx={{
              fontFamily: "inter",
              color: "ocean.dark",
              whiteSpace: "pre-line",
              wordBreak: "break-word",
              textAlign: "justify",
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              px: 2,
            }}
          >
            {content.text}
          </Typography>
        </Box>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{
            px: 2,
            height: "60px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography>Data</Typography>
            <Box
              sx={{
                bgcolor: "#d9d9d9",
                borderRadius: 2,
                textAlign: "center",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
              }}
            >
              <Typography>12/12/2025 08:00</Typography>
            </Box>
          </Box>
          {subscribe && (
            <Stack direction={"row"} spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography>Vagas disponiveis</Typography>
                <Box
                  sx={{
                    bgcolor: "#d9d9d9",
                    borderRadius: 2,
                    textAlign: "center",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography>0</Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>Vagas Totais</Typography>
                <Box
                  sx={{
                    bgcolor: "#d9d9d9",
                    borderRadius: 2,
                    textAlign: "center",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography>10</Typography>
                </Box>
              </Box>
            </Stack>
          )}
        </Stack>
        {subscribe && (
          <Box>
            <Button
              variant="contained"
              sx={{
                width: "100%",
                bgcolor: "ocean.dark",
              }}
            >
              Inscrever
            </Button>
          </Box>
        )}
      </Stack>
    </>
  );
};

export default EventInfo;
