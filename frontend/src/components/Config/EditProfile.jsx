import {
  Stack,
  Typography,
  Box,
  Divider,
  Avatar,
  TextField,
  Button,
  IconButton,
  Input,
  InputAdornment,
} from "@mui/material";
import { useRef, useState } from "react";

const EditProfile = () => {
  console.log("render EditProfile");
  const fileInput = useRef(null);
  const [fileUrl, setFileUrl] = useState(null);
  
  const handleIconClick = () => {
    fileInput.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file)
      setFileUrl(url);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Editar perfil
      </Typography>

      <Stack
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack
          direction={"row"}
          sx={{
            justifyContent: "space-between",
            alignContent: "center",
            width: "95%",
            mt: 8,
            px: 3,
          }}
          spacing={1}
        >
          <input
            type="file"
            ref={fileInput}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <IconButton onClick={handleIconClick}>
            <Avatar src={fileUrl} sx={{ width: "120px", height: "120px" }} />
          </IconButton>

          <Stack
            direction={"row"}
            sx={{
              width: "94%",
              justifyContent: "space-between",
              alignContent: "center",
              py: 3,
              pr: { xs: 3, lg: 8 },
              pl: 3,
            }}
          >
            <TextField
              sx={{
                width: "100%",
              }}
              placeholder="Username"
              defaultValue={"username"}
            ></TextField>
          </Stack>
        </Stack>
        <Box
          sx={{
            mx: 5,
            my: 5,
            width: "100%",
          }}
        >
          <TextField
            sx={{
              width: "100%",
            }}
            placeholder="Bio"
            defaultValue={"Bio"}
          ></TextField>
        </Box>
        <Button
          variant="contained"
          sx={{
            width: "50%",
            height: "50px",
          }}
        >
          Mudar
        </Button>
      </Stack>
    </Box>
  );
};

export default EditProfile;
