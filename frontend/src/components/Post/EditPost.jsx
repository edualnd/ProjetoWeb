import {
  DialogTitle,
  DialogContent,
  TextField,
  Dialog,
  DialogActions,
  Button,
  IconButton,
  Stack,
  Box,
  ImageList,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import { useRef, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { postStore } from "../../../store/postsStore.js";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userStore } from "../../../store/userStore.js";

const postSchema = z.object({
  text: z
    .string()
    .min(1, "Deve ter no minimo 1 caracteres.")
    .max(255, "Deve ter no máximo 255 caracteress."),
});
export const EditPost = ({ id }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(postSchema),
    mode: "all",
    defaultValues: { subs: false },
  });

  const { userData } = userStore();
  const { postsData } = postStore();
  const post = postsData.posts.filter((p) => p.publicationId == id)[0];

  const [openModal, setOpenModal] = useState(false);
  const [deletePhoto1, setDeletePhoto1] = useState(false);
  const [deletePhoto2, setDeletePhoto2] = useState(false);

  const handleDeletePhoto1 = () => {
    setDeletePhoto1((prev) => !prev);
  };

  const handleDeletePhoto2 = () => {
    setDeletePhoto2((prev) => !prev);
  };
  const fileInput = useRef(null);
  const [fileUrl, setFileUrl] = useState([]);

  const handleOpenModal = () => {
    if (!openModal) {
      const imagens = [post.image, post.video]
        .filter((p) => p != null)
        .map((p) => `https://res.cloudinary.com/dzkegljd1/image/upload/${p}`);

      setFileUrl(imagens);
      fileInput.current = null;
    }
    setDeletePhoto1(false);
    setDeletePhoto2(false);
    setOpenModal(!openModal);
  };

  const handleIconClick = () => {
    fileInput.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    if (!files || files.length === 0) return;

    setFileUrl((prev) => {
      let updated = [...prev];

      files.forEach((f, i) => {
        const newFile = {
          url: URL.createObjectURL(f),
          type: f.type,
          size: f.size,
          file: f,
        };

        if (deletePhoto1) {
          updated[0] = newFile;
          setDeletePhoto1(false);
        } else if (deletePhoto2) {
          updated[1] = newFile;
          setDeletePhoto2(false);
        } else if (updated.length < 2) {
          updated.push(newFile);
        } else {
          updated[0] = newFile;
        }
      });

      return updated.slice(0, 2);
    });
  };
  const handleSubmitClick = async (data) => {
    data = Object.fromEntries(
      Object.entries(data)
        .map(([key, value]) => {
          if (value === undefined || value === null) {
            return null;
          }
          return [key, value];
        })
        .filter(Boolean),
    );

    const sendFormData = new FormData();

    // Append campos do formulário (ex: text)
    Object.entries(data).forEach(([key, value]) => {
      sendFormData.append(key, value);
    });

    let deleteAll = deletePhoto1 && deletePhoto2;
    let newPhotos = fileUrl.filter((p) => p?.file != undefined);

    if (deleteAll) {
      sendFormData.append("deleteAll", true);
    } else if (deletePhoto1 && !deletePhoto2) {
      sendFormData.append("deleteX", "image");
    } else if (deletePhoto2 && !deletePhoto1) {
      sendFormData.append("deleteX", "video");
    }

    newPhotos.forEach((f) => {
      sendFormData.append("photos", f.file);
    });

    // Só pra debug
    for (const pair of sendFormData.entries()) {
      console.log(pair[0], pair[1]);
    }

    //   let res;
    //   res = await createPost(sendFormData);

    // if (res.success) {
    //   console.log("Postado", res.post);
    //   await fetchData();
    //   handleOpenModal();
    //   return;
    // }
    // alert(res.message);
    // return;
  };

  return (
    <>
      <IconButton type="button" onClick={handleOpenModal}>
        <EditIcon sx={{ fontSize: 20 }}></EditIcon>
      </IconButton>
      <Dialog
        open={openModal}
        onClose={handleOpenModal}
        sx={{
          "& .MuiPaper-root": {
            width: "100%",
            height: "auto",
          },
        }}
      >
        <DialogTitle>Postar</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <>
            <Stack spacing={2}>
              <TextField
                aria-label="Texto"
                placeholder="Digite aqui"
                defaultValue={post.text}
                multiline
                rows={5}
                sx={{ width: "100%", fontSize: "16px" }}
                inputProps={{ maxLength: 255 }}
                error={errors?.text}
                {...register("text")}
                helperText={errors?.text ? `${errors?.text?.message}` : ""}
              ></TextField>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <input
                  type="file"
                  ref={fileInput}
                  multiple
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  accept="image/*, video/*"
                />
                <ToggleButtonGroup>
                  <ToggleButton
                    selected={deletePhoto1}
                    onClick={handleDeletePhoto1}
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
                    Deletar foto 1
                  </ToggleButton>
                  <ToggleButton
                    selected={deletePhoto2}
                    onClick={handleDeletePhoto2}
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
                    Deletar foto 2
                  </ToggleButton>
                </ToggleButtonGroup>
                <IconButton onClick={handleIconClick} sx={{ borderRadius: 0 }}>
                  <Typography>Maximo 2 imagens</Typography>
                  <FileUploadIcon sx={{ width: "25px", height: "25px" }} />
                </IconButton>
              </Box>
              <ImageList>
                {fileUrl.map((img, index) => (
                  <>
                    <img
                      src={img?.url != undefined ? img.url : img}
                      alt=""
                      key={index}
                      style={{ maxWidth: "100%", height: "150px" }}
                    />
                  </>
                ))}
              </ImageList>
            </Stack>
          </>
        </DialogContent>
        <DialogActions>
          <Typography sx={{ color: "#BDBDBD" }}>
            Para apagar alguma foto deixe o campo ativo
          </Typography>
          <Button onClick={handleOpenModal}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit(handleSubmitClick)}>
            Postar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
