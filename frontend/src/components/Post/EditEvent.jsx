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
  Checkbox,
  FormControlLabel,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import { useEffect, useRef, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { userStore } from "../../../store/userStore.js";
import { postStore } from "../../../store/postsStore.js";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const eventSchema = z
  .object({
    text: z
      .string()
      .min(1, "Deve ter no minimo 1 caracteres.")
      .max(255, "Deve ter no máximo 255 caracteress."),
    title: z
      .string()
      .min(10, "Deve ter no minimo 10 caracteres.")
      .max(100, "Deve ter no máximo 100 caracteress."),
    eventDate: z.coerce.date().refine((date) => {
      return date > new Date();
    }, "A data deve ser no futuro."),
    subs: z.boolean(),
    registrationStartDate: z.coerce.date("Deve ser data").optional(),
    registrationEndDate: z.coerce.date("Deve ser data").optional(),
  })
  .superRefine((data, ctx) => {
    const now = new Date();

    if (data.subs) {
      if (!data.registrationStartDate) {
        ctx.addIssue({
          path: ["registrationStartDate"],
          message: "Campo obrigatório quando inscrições estão ativadas",
        });
      } else {
        if (data.registrationStartDate < now) {
          ctx.addIssue({
            path: ["registrationStartDate"],
            message: "Não pode ser no passado",
          });
        }
        if (data.eventDate && data.registrationStartDate > data.eventDate) {
          ctx.addIssue({
            path: ["registrationStartDate"],
            message: "Não pode ser depois da data do evento",
          });
        }
      }

      if (!data.registrationEndDate) {
        ctx.addIssue({
          path: ["registrationEndDate"],
          message: "Campo obrigatório quando inscrições estão ativadas",
        });
      } else {
        if (
          data.registrationStartDate &&
          data.registrationEndDate < data.registrationStartDate
        ) {
          ctx.addIssue({
            path: ["registrationEndDate"],
            message: "Não pode ser antes da data de início",
          });
        }

        if (data.eventDate && data.registrationEndDate > data.eventDate) {
          ctx.addIssue({
            path: ["registrationEndDate"],
            message: "Não pode ser depois da data do evento",
          });
        }
      }
    }
  });
const EditEvent = ({ id }) => {
  const { postsData, fetchData } = postStore();
  const post = postsData.posts.filter((p) => p.publicationId == id)[0];
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(eventSchema),
    mode: "all",
    defaultValues: { subs: post.registrationStartDate != null },
  });
  const { editEvent } = userStore();

  const [openModal, setOpenModal] = useState(false);
  const [deletePhoto1, setDeletePhoto1] = useState(false);
  const [deletePhoto2, setDeletePhoto2] = useState(false);
  const subsValue = watch("subs", false);

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

      files.forEach((f) => {
        const newFile = {
          url: URL.createObjectURL(f),
          type: f.type,
          size: f.size,
          file: f,
        };

        if (deletePhoto1) {
          updated[0] = newFile;
          
        } else if (deletePhoto2) {
          updated[1] = newFile;
          
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
    delete data.subs;
    data = Object.fromEntries(
      Object.entries(data)
        .map(([key, value]) => {
          if (value instanceof Date) {
            return [key, value.toISOString()];
          }
          if (value === undefined || value === null) {
            return null;
          }
          return [key, value];
        })
        .filter(Boolean)
    );

    const sendFormData = new FormData();

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
    sendFormData.append("isEvent", "true");

    let res;
    
    res = await editEvent(id, sendFormData);

    if (res.success) {
      console.log("Postado", res.post);
      await fetchData();
      handleOpenModal();
      return;
    }
    alert(res.message);
    return;
  };
  useEffect(() => {
    if (!subsValue) {
      setValue("registrationStartDate", undefined);
      setValue("registrationEndDate", undefined);
    }
  }, [subsValue, setValue, trigger]);
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
        <DialogTitle>Editar</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <>
            <Stack spacing={2}>
              <TextField
                aria-label="Titulo"
                placeholder="Titulo"
                multiline
                defaultValue={post.title}
                rows={2}
                sx={{ width: "100%", fontSize: "16px" }}
                inputProps={{ maxLength: 50 }}
                error={errors?.title}
                {...register("title")}
                helperText={errors?.title ? `${errors?.title?.message}` : ""}
              ></TextField>
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
              <Typography>Dia do evento</Typography>
              <TextField
                type="datetime-local"
                defaultValue={post.eventDate ? post.eventDate.slice(0, 16) : ""}
                error={errors?.eventDate}
                {...register("eventDate")}
                helperText={
                  errors?.eventDate ? `${errors?.eventDate?.message}` : ""
                }
              ></TextField>
              <FormControlLabel
                control={
                  <Checkbox
                    {...register("subs", {
                      onClick: async () => await trigger(),
                    })}
                    checked={subsValue}
                  ></Checkbox>
                }
                label="Precisa se inscrever"
                error={errors?.subs}
              >
                {errors?.subs && (
                  <FormHelperText error>{errors.subs.message}</FormHelperText>
                )}
              </FormControlLabel>
              {subsValue && (
                <>
                  <Typography>Inicio das inscrições </Typography>
                  <TextField
                    type="datetime-local"
                    defaultValue={
                      post.registrationStartDate
                        ? post.registrationStartDate.slice(0, 16)
                        : ""
                    }
                    error={errors?.registrationStartDate}
                    {...register("registrationStartDate")}
                    helperText={
                      errors?.registrationStartDate
                        ? `${errors?.registrationStartDate?.message}`
                        : ""
                    }
                  ></TextField>
                  <Typography>Fim das inscrições</Typography>
                  <TextField
                    type="datetime-local"
                    defaultValue={
                      post.registrationEndDate
                        ? post.registrationEndDate.slice(0, 16)
                        : ""
                    }
                    error={errors?.registrationEndDate}
                    {...register("registrationEndDate")}
                    helperText={
                      errors?.registrationEndDate
                        ? `${errors?.registrationEndDate?.message}`
                        : ""
                    }
                  ></TextField>
                </>
              )}
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
          <Button onClick={handleOpenModal}>Cancel</Button>
          <Button
            type="submit"
            disabled={!isValid}
            onClick={handleSubmit(handleSubmitClick)}
          >
            Postar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditEvent;
