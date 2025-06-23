import { ToggleButtonGroup, ToggleButton } from "@mui/material";

const CustomToggleButton = ({ categories, selected, onChange }) => {
  const handleClick = (event, value) => {
    onChange(event, value);
  };
  return (
    <>
      <ToggleButtonGroup
        value={selected}
        exclusive
        onChange={handleClick}
        sx={{
          display: "flex",
          flexDirection: "row",
          bgcolor: "ocean.light",
          mt: 5,
          height: 40,
          borderRadius: 20,
        }}
      >
        <ToggleButton
          variant="contained"
          value={categories[0]}
          sx={{
            bgcolor: "ocean.light",
            borderRadius: 20,
            border: "none",
            width: categories[1] ? "50%" : "100%",
            color: "white",
            "&.Mui-selected": {
              color: "white",
              bgcolor: "ocean.dark",
              borderRadius: 20,
            },
            "&.Mui-selected:hover": {
              bgcolor: "ocean.dark",
            },
          }}
        >
          {categories[0]}
        </ToggleButton>
        {categories[1] && (
          <ToggleButton
            variant="contained"
            value={categories[1]}
            sx={{
              bgcolor: "ocean.light",
              color: "white",
              borderRadius: 20,
              border: "none",
              width: "50%",
              "&.Mui-selected": {
                color: "white",
                borderRadius: 20,
                bgcolor: "ocean.dark",
              },
              "&.Mui-selected:hover": {
                bgcolor: "ocean.dark",
              },
            }}
          >
            {categories[1]}
          </ToggleButton>
        )}
      </ToggleButtonGroup>
    </>
  );
};

export default CustomToggleButton;
