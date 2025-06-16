import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Stack, TextField, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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

  return (
    <>
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
          helperText={errors?.content ? `${errors?.content?.message}` : ""}
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
    </>
  );
};

export default CommentForm;
