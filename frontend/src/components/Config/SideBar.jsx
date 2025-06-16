import {
  Box,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

const SideBar = ({ onChange, selected }) => {
  const handleClick = (event, value) => {
    onChange(event, value);
  };
  return (
    <>
      <Box
        sx={{
          width: "22%",
          height: "100vh",
          minWidth: "150px",
          maxWidth: "200px",
          bgcolor: "#d9d9d9",
          borderRight: "1px solid black",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          pt: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            pl: 2,
            fontSize: { lg: "24px", xs: "20px" },
          }}
        >
          Configurações
        </Typography>
        <ToggleButtonGroup
          value={selected}
          onChange={handleClick}
          exclusive
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            border: "none",
          }}
        >
          <Divider></Divider>
          <ToggleButton
            value={"editProfile"}
            variant="contained"
            sx={{
              border: "none",
              "&.Mui-selected": {
                bgcolor: "#00000017",
              },
              "&.Mui-selected:hover": {
                bgcolor: "#00000038",
              },
            }}
          >
            Editar perfl
          </ToggleButton>
          <Divider></Divider>

          <ToggleButton
            value={"changePass"}
            variant="contained"
            sx={{
              border: "none",
              "&.Mui-selected": {
                bgcolor: "#00000017",
              },
              "&.Mui-selected:hover": {
                bgcolor: "#00000038",
              },
            }}
          >
            Mudar senha
          </ToggleButton>
          <Divider></Divider>
          <ToggleButton
            value={"changeEmail"}
            variant="contained"
            sx={{
              border: "none",
              "&.Mui-selected": {
                bgcolor: "#00000017",
              },
              "&.Mui-selected:hover": {
                bgcolor: "#00000038",
              },
            }}
          >
            Mudar email
          </ToggleButton>
          <Divider></Divider>
          <ToggleButton
            value={"changeRole"}
            variant="contained"
            sx={{
              border: "none",
              "&.Mui-selected": {
                bgcolor: "#00000017",
              },
              "&.Mui-selected:hover": {
                bgcolor: "#00000038",
              },
            }}
          >
            Tipo de conta
          </ToggleButton>
          <Divider></Divider>
          <ToggleButton
            value={"deleteAccount"}
            variant="contained"
            sx={{
              border: "none",
              "&.Mui-selected": {
                bgcolor: "#00000017",
              },
              "&.Mui-selected:hover": {
                bgcolor: "#00000038",
              },
            }}
          >
            Deletar conta
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </>
  );
};

export default SideBar;
