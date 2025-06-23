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
import { useEffect, useRef, useState } from "react";
import { userStore } from "../../../store/userStore.js";
import { isValid, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const registerSchema = z.object({
  newUsername: z
    .string()
    .nonempty("O username é obrigatório")
    .min(3, "Username muito curto")
    .max(30, "Username muito longo"),
  bio: z.string().max(100),
});

const EditProfile = () => {
  const { userData, changeProfile } = userStore();
  const fileInput = useRef(null);
  const [fileUrl, setFileUrl] = useState(
    `https://res.cloudinary.com/dzkegljd1/image/upload/v1750689629/${userData.userImage}`
  );
  const [file, setFile] = useState(null);

  const handleIconClick = () => {
    fileInput.current.click();
  };

  const handleFileChange = (event) => {
    const fileC = event.target.files[0];
    setFile(fileC);
    if (fileC) {
      const url = URL.createObjectURL(fileC);
      setFileUrl(url);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
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
      data = { ...data, avatar: file };
    } else {
      data = { ...data, deletePhoto };
    }
    const sendFormData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      sendFormData.append(key, value);
    });
    const res = await changeProfile(sendFormData);
    if (res.success) {
      console.log("Postado");
      return;
    }
    alert(res.message);
    return;
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
              accept="image/*"
              onChange={handleFileChange}
            />
            <IconButton onClick={handleIconClick}>
              <Avatar src={fileUrl} sx={{ width: "120px", height: "120px" }} />
            </IconButton>
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
            {deletePhoto && (
              <Typography
                variant="body2"
                component={"span"}
                sx={{
                  fontFamily: "inter",
                  fontSize: "10px",
                }}
              >
                Sua foto será deletada
              </Typography>
            )}
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
              {...register("newUsername")}
              error={errors?.newUsername}
              helperText={
                errors?.newUsername ? `${errors?.newUsername?.message}` : ""
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
