import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Stack,
  Box,
  ImageList,
  Typography,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { useEffect, useRef, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CustomToggleButton from "../CustomToggleButton.jsx";
import { userStore } from "../../../store/userStore.js";
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

const postSchema = z.object({
  text: z
    .string()
    .min(1, "Deve ter no minimo 1 caracteres.")
    .max(255, "Deve ter no máximo 255 caracteress."),
});

const CreatePostModal = () => {
  const {
    register: eventRegister,
    handleSubmit: handleSubmitEvent,
    reset: resetE,
    watch,
    setValue,
    trigger,
    formState: { errors: eventErrors, isValid: isValidEvent },
  } = useForm({
    resolver: zodResolver(eventSchema),
    mode: "all",
    reValidateMode: "onChange",
  });
  const {
    register: postRegister,
    handleSubmit: handleSubmitPost,
    reset: resetP,
    formState: { errors: postError, isValid: isValidPost },
  } = useForm({
    resolver: zodResolver(postSchema),
    mode: "all",
    defaultValues: { subs: false },
  });

  const { userData } = userStore();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(!openModal);
    resetE();
    resetP();
    if (!openModal) {
      fileInput.current = null;
      setFileUrl([]);
    }
  };
  const { createPost, createEvent } = userStore();
  const handleSubmitClick = async (data) => {
    delete data.subs;
    data = Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (value instanceof Date) {
          return [key, value.toISOString()];
        }
        return [key, value];
      })
    );
    const sendFormData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      sendFormData.append(key, value);
    });
    fileUrl.forEach((f) => {
      sendFormData.append("photos", f.file);
    });
    let res;
    if (categoryView == "Evento") {
      sendFormData.append("isEvent", "true");
      res = await createEvent(sendFormData);
    } else {
      res = await createPost(sendFormData);
    }
    if (res.success) {
      console.log("Postado");
      handleOpenModal();
      return;
    }
    alert(res.message);
    return;
  };

  const fileInput = useRef(null);
  const [fileUrl, setFileUrl] = useState([]);

  const handleIconClick = () => {
    fileInput.current.click();
  };

  const handleFileChange = (event) => {
    const file = Array.from(event.target.files);
    let newFiles;
    if (file && file.length > 0) {
      newFiles = file.slice(0, 2).map((f) => ({
        url: URL.createObjectURL(f),
        type: f.type,
        size: f.size,
        file: f,
      }));

      setFileUrl((prev) => {
        let files;

        if (file.length === 2) {
          files = newFiles;
        } else {
          files = [...prev, ...newFiles].slice(0, 2);
        }

        return files;
      });
    }
  };

  const [categoryView, setCategoryView] = useState("Publicação");

  const subsValue = watch("subs", false);

  useEffect(() => {
    if (!subsValue) {
      setValue("registrationStartDate", undefined);
      setValue("registrationEndDate", undefined);
    }
    trigger();
  }, [subsValue, setValue, trigger]);
  return (
    <>
      <IconButton onClick={handleOpenModal}>
        <AddBoxRoundedIcon
          sx={{ width: "40px", height: "40px", color: "ocean.dark" }}
        ></AddBoxRoundedIcon>
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
          <CustomToggleButton
            categories={
              userData.role == "COMMON"
                ? ["Publicação"]
                : ["Publicação", "Evento"]
            }
            selected={categoryView}
            onChange={(e, category) =>
              setCategoryView((prev) => category || prev)
            }
          ></CustomToggleButton>

          {categoryView == "Evento" ? (
            <>
              <Stack spacing={2}>
                <TextField
                  aria-label="Titulo"
                  placeholder="Titulo"
                  multiline
                  rows={2}
                  sx={{ width: "100%", fontSize: "16px" }}
                  inputProps={{ maxLength: 50 }}
                  error={eventErrors?.title}
                  {...eventRegister("title")}
                  helperText={
                    eventErrors?.title ? `${eventErrors?.title?.message}` : ""
                  }
                ></TextField>
                <TextField
                  aria-label="Texto"
                  placeholder="Digite aqui"
                  multiline
                  rows={5}
                  sx={{ width: "100%", fontSize: "16px" }}
                  inputProps={{ maxLength: 255 }}
                  error={eventErrors?.text}
                  {...eventRegister("text")}
                  helperText={
                    eventErrors?.text ? `${eventErrors?.text?.message}` : ""
                  }
                ></TextField>
                <Typography>Dia do evento</Typography>
                <TextField
                  type="datetime-local"
                  error={eventErrors?.eventDate}
                  {...eventRegister("eventDate")}
                  helperText={
                    eventErrors?.eventDate
                      ? `${eventErrors?.eventDate?.message}`
                      : ""
                  }
                ></TextField>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...eventRegister("subs", {
                        onClick: async () => await trigger(),
                      })}
                      checked={subsValue}
                    ></Checkbox>
                  }
                  label="Precisa se inscrever"
                  error={eventErrors?.subs}
                >
                  {eventErrors?.subs && (
                    <FormHelperText error>
                      {eventErrors.subs.message}
                    </FormHelperText>
                  )}
                </FormControlLabel>

                {subsValue && (
                  <>
                    <Typography>Inicio das inscrições </Typography>
                    <TextField
                      type="datetime-local"
                      error={eventErrors?.registrationStartDate}
                      {...eventRegister("registrationStartDate")}
                      helperText={
                        eventErrors?.registrationStartDate
                          ? `${eventErrors?.registrationStartDate?.message}`
                          : ""
                      }
                    ></TextField>
                    <Typography>Fim das inscrições</Typography>
                    <TextField
                      type="datetime-local"
                      error={eventErrors?.registrationEndDate}
                      {...eventRegister("registrationEndDate")}
                      helperText={
                        eventErrors?.registrationEndDate
                          ? `${eventErrors?.registrationEndDate?.message}`
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
                  <IconButton
                    onClick={handleIconClick}
                    sx={{ borderRadius: 0 }}
                  >
                    <Typography>Maximo 2 imagens</Typography>
                    <FileUploadIcon sx={{ width: "25px", height: "25px" }} />
                  </IconButton>
                </Box>
                <ImageList>
                  {fileUrl.map((img, index) => (
                    <>
                      <img
                        src={img.url}
                        alt=""
                        key={index}
                        style={{ maxWidth: "100%" }}
                      />
                    </>
                  ))}
                </ImageList>
              </Stack>
            </>
          ) : (
            <>
              <Stack spacing={2}>
                <TextField
                  aria-label="Texto"
                  placeholder="Digite aqui"
                  multiline
                  rows={5}
                  sx={{ width: "100%", fontSize: "16px" }}
                  inputProps={{ maxLength: 255 }}
                  error={postError?.text}
                  {...postRegister("text")}
                  helperText={
                    postError?.text ? `${postError?.text?.message}` : ""
                  }
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
                  <IconButton
                    onClick={handleIconClick}
                    sx={{ borderRadius: 0 }}
                  >
                    <Typography>Maximo 2 imagens</Typography>
                    <FileUploadIcon sx={{ width: "25px", height: "25px" }} />
                  </IconButton>
                </Box>
                <ImageList>
                  {fileUrl.map((img, index) =>
                    img.type.startsWith("image") ? (
                      <img
                        src={img.url}
                        alt=""
                        key={index}
                        style={{ maxWidth: "100%" }}
                      />
                    ) : (
                      <video
                        src={img.url}
                        alt=""
                        key={index}
                        style={{ maxWidth: "100%" }}
                        controls
                      ></video>
                    )
                  )}
                </ImageList>
              </Stack>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenModal}>Cancel</Button>
          <Button
            type="submit"
            disabled={categoryView == "Evento" ? !isValidEvent : !isValidPost}
            onClick={
              categoryView == "Evento"
                ? handleSubmitEvent(handleSubmitClick)
                : handleSubmitPost(handleSubmitClick)
            }
          >
            Postar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
/*

 */
/**
 *
 */

export default CreatePostModal;
