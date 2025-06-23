import {
  Paper,
  Button,
  Typography,
  Box,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
import backgroundImage from "../assets/backgroundImage.png";
import "../keen-slider.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useKeenSlider } from "keen-slider/react.js";
import { postStore } from "../../store/postsStore.js";
const Carossel = () => {
  const { postsData } = postStore();
  const cards = postsData.carousel || [];
  const tam = cards.length >= 4 ? 4 : cards.length;
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",

    slides: {
      perView: tam,
      spacing: 10,
    },
  });
  return (
    <>
      <Stack>
        <Stack ref={sliderRef} className="keen-slider" direction={"row"}>
          {cards.map((i) => (
            <Item key={i.publicationId + "card"} item={i}></Item>
          ))}
        </Stack>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <IconButton onClick={() => instanceRef.current?.prev()}>
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton onClick={() => instanceRef.current?.next()}>
            <KeyboardArrowRightIcon />
          </IconButton>
        </Box>
      </Stack>
    </>
  );
};

function Item({ item }) {
  const date = new Date(item.eventDate).toLocaleDateString();
  const scrollToPost = () => {
    const element = document.getElementById(`${item.publicationId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <Stack
        direction={"column"}
        sx={{
          width: "70px",
          height: "250px",
          borderRadius: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid #ECEDEE",
        }}
        className="keen-slider__slide"
        onClick={scrollToPost}
      >
        <Box
          sx={{
            width: "100%",
            height: "15%",
            bgcolor: "ocean.dark",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          {date}
        </Box>
        <Box sx={{ bgcolor: "blue", width: "100%", height: "70%" }}>
          <img
            src={backgroundImage}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          ></img>
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "15%",
            borderTop: "1px solid black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "ocean.dark",
          }}
        >
          {item.title}
        </Box>
      </Stack>
    </>
  );
}

export default Carossel;
