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
  ToggleButton,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { useRef, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CustomToggleButton from "../CustomToggleButton.jsx";
const CreatePostModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(!openModal);
    if (!openModal) {
      fileInput.current = null;
      setFileUrl([]);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    //const token = document.getElementById("tokenOTP");
    //const email = document.getElementById("novoEmail");

    handleOpenModal();
  };

  const fileInput = useRef(null);
  const [fileUrl, setFileUrl] = useState([]);

  const handleIconClick = () => {
    fileInput.current.click();
  };

  const handleFileChange = (event) => {
    const file = Array.from(event.target.files);

    if (file) {
      const url = file.map((f) => URL.createObjectURL(f));

      if (fileUrl.length == 2) {
        setFileUrl((prev) => [prev[0], url[0]]);
      } else if (fileUrl.length == 1) {
        setFileUrl((prev) => [...prev, url[0]]);
      } else {
        setFileUrl([url[0], url[1]]);
      }
    }
  };

  const [categoryView, setCategoryView] = useState("Publicação");

  const [inscritos, setInscritos] = useState(false);
  const handleCheckboxChange = (event) => {
    setInscritos(event.target.checked);
  };
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
            categories={["Publicação", "Evento"]}
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
                ></TextField>
                <TextField
                  aria-label="Texto"
                  placeholder="Digite aqui"
                  multiline
                  rows={5}
                  sx={{ width: "100%", fontSize: "16px" }}
                  inputProps={{ maxLength: 255 }}
                ></TextField>
                <Typography>Dia do evento</Typography>
                <TextField type="date"></TextField>
                <FormControlLabel
                  control={<Checkbox></Checkbox>}
                  label="Precisa se inscrever"
                  checked={inscritos}
                  onChange={handleCheckboxChange}
                ></FormControlLabel>

                {inscritos && (
                  <>
                    <Typography>Inicio das inscrições </Typography>
                    <TextField type="date"></TextField>
                    <Typography>Fim das inscrições</Typography>
                    <TextField type="date"></TextField>
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
                      />
                      <IconButton
                        onClick={handleIconClick}
                        sx={{ borderRadius: 0 }}
                      >
                        <Typography>Maximo 2 imagens</Typography>
                        <FileUploadIcon
                          sx={{ width: "25px", height: "25px" }}
                        />
                      </IconButton>
                    </Box>
                  </>
                )}
                <ImageList>
                  {fileUrl.map((img, index) => (
                    <>
                      <img
                        src={img}
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
                        src={img}
                        alt=""
                        key={index}
                        style={{ maxWidth: "100%" }}
                      />
                    </>
                  ))}
                </ImageList>
              </Stack>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenModal}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
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
