import { Box, Stack, Typography, Button, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
const EventInfo = ({ content, subscribe }) => {
  const [inscricao, setInscricao] = useState(false);
  
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
        </Stack>
        {subscribe && (
          <Box>
            <Button
              variant="contained"
              sx={{
                width: "100%",
                bgcolor: "ocean.dark",
              }}
              onClick={(e) => setInscricao(!inscricao)}
              disabled={inscricao}
            >
              {inscricao ? "Inscrito" : "Inscrever"}
            </Button>
          </Box>
        )}
      </Stack>
    </>
  );
};

export default EventInfo;
