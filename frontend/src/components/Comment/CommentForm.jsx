import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Stack,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";


import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
const commentSchema = z.object({
  content: z
    .string()
    .nonempty("Minimo de 1 caracter")
    .max(200, "Maximo de 200 caracteres"),
});

const CommentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(commentSchema),
    mode: "all",
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  const [comment, setComment] = useState(false);

  const handleComment = () => {
    event.preventDefault();
    setComment(!comment);
  };
  return (
    <>
      {comment ? (
        <Stack
          direction={"row"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          sx={{ width: "100%", height: "100%", px: 1 }}
        >
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignContent={"center"}
            sx={{
              bgcolor: "#ECEDEE",
              width: "100%",
              height: "75%",
              borderRadius: 3,
            }}
          >
            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignContent={"space-between"}
              sx={{
                flex: 1,
                width: "100%",
                height: "35px",
                alignContent: "center",
              }}
            >
              <TextField
                fullWidth
                type="content"
                name="content"
                id="content"
                {...register("content")}
                helperText={
                  errors?.content ? `${errors?.content?.message}` : ""
                }
                variant="outlined"
                placeholder="Escreva aqui"
                sx={{
                  width: "95%",
                  "& .MuiInputBase-input": {
                    height: "30px",
                    py: 0,
                    px: 1,
                    mt: 1,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              ></TextField>
              <IconButton
                onClick={handleSubmit(onSubmit)}
                type="submit"
                disabled={!isValid}
              >
                <SendRoundedIcon
                  sx={{
                    transform: "rotate(-45deg)",
                    color: !isValid ? "#adaaaa" : "ocean.dark",
                  }}
                ></SendRoundedIcon>
              </IconButton>
            </Stack>
            <IconButton type="button" onClick={handleComment}>
              <CloseRoundedIcon
                sx={{
                  color: "ocean.dark",
                }}
              ></CloseRoundedIcon>
            </IconButton>
          </Stack>
        </Stack>
      ) : (
        <IconButton
          type="button"
          sx={{
            gap: 1,
            alignItems: "center",
            borderRadius: 2,
            flex: 1,
          }}
          onClick={handleComment}
        >
          <AddCommentIcon></AddCommentIcon>
          <Typography
            variant="body"
            component={"span"}
            sx={{
              fontSize: "20px",
            }}
          >
            Comentar
          </Typography>
        </IconButton>
      )}
    </>
  );
};

export default CommentForm;
