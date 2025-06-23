import {
  Stack,
  Typography,
  Box,
  Avatar,
  TextField,
  Button,
  IconButton,
  FormControlLabel,
  FormControl,
  Checkbox,
  ToggleButton,
} from "@mui/material";
import { useRef, useState } from "react";
import { userStore } from "../../../store/userStore.js";
import { isValid, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const registerSchema = z.object({
  username: z
    .string()
    .nonempty("O username é obrigatório")
    .min(3, "Username muito curto")
    .max(30, "Username muito longo"),
  bio: z.string().max(100),
});
const EditProfile = () => {
  const fileInput = useRef(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);

  const handleIconClick = () => {
    fileInput.current.click();
  };

  const handleFileChange = (event) => {
    const fileC = event.target.files[0];
    setFile(fileC);
    if (fileC) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    }
  };

  const { userData, changeProfile } = userStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });
  const [deletePhoto, setDeletePhoto] = useState(false);

  const handleDeletePhoto = () => {
    setDeletePhoto(!deletePhoto);
  };
  const handleChange = async (data) => {
    if (data.username == userData.username) {
      delete data.username;
    } else if (data.bio == userData.bio) {
      delete data.bio;
    }
    if (!deletePhoto) {
      data = { ...data, file };
    } else {
      data = { ...data, deletePhoto };
    }
    //const res = await changeProfile(data)
    console.log(data);
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
          <Stack direction={"column"}>
            <input
              type="file"
              ref={fileInput}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <IconButton onClick={handleIconClick}>
              <Avatar src={fileUrl} sx={{ width: "120px", height: "120px" }} />
            </IconButton>
            {/* <FormControl>
              <FormControlLabel
                control={<Checkbox />}
                label="Deletar foto"
                componentsProps={{
                  typography: {
                    sx: {
                      fontFamily: "inter",
                      width: "100px",
                    },
                  },
                }}
              />
            </FormControl> */}
            <ToggleButton
              selected={deletePhoto}
              onClick={handleDeletePhoto}
              sx={{
                width: "130px",
                fontSize: "12px",
                p: 1,
                color: "ocean.dark",
                "&.Mui-selected": {
                  color: "white",
                  bgcolor: "ocean.dark",
                },
                "&.Mui-selected:hover": {
                  bgcolor: "ocean.dark",
                },
              }}
            >
              Deletar foto
            </ToggleButton>
          </Stack>
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
              defaultValue={userData.username}
              {...register("username")}
              error={errors?.username}
              helperText={
                errors?.username ? `${errors?.username?.message}` : ""
              }
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
            defaultValue={userData.bio}
            {...register("bio")}
          ></TextField>
        </Box>
        <Button
          variant="contained"
          sx={{
            width: "50%",
            height: "50px",
          }}
          onClick={handleSubmit(handleChange)}
          disabled={!isValid}
        >
          Mudar
        </Button>
      </Stack>
    </Box>
  );
};

export default EditProfile;
