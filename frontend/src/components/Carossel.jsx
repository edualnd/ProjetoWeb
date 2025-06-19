import Carousel from "react-material-ui-carousel";
import { Paper, Button, Typography, Box } from "@mui/material";
import { useState } from "react";
const Carossel = () => {
  const items = [
    {
      name: "Primeiro Item",
      description: "Descrição do primeiro item",
      color: "#64b5f6",
    },
    {
      name: "Segundo Item",
      description: "Descrição do segundo item",
      color: "#81c784",
    },
    {
      name: "Terceiro Item",
      description: "Descrição do terceiro item",
      color: "#ffb74d",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="carousel">
      <div className="carousel-inner">
        {items.map((item, index) => (
          <div
            key={index}
            className={`carousel-item ${
              index === currentIndex ? "active" : ""
            }`}
          >
            {item.content}
          </div>
        ))}
      </div>

      <button
        className="carousel-control prev"
        onClick={() =>
          setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
        }
      >
        &lt;
      </button>

      <button
        className="carousel-control next"
        onClick={() => setCurrentIndex((prev) => (prev + 1) % items.length)}
      >
        &gt;
      </button>
    </div>
  );
};

function Item({ item }) {
  return (
    <Paper
      sx={{
        backgroundColor: item.color,
        height: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        borderRadius: 2,
      }}
    >
      <Typography variant="h3">{item.name}</Typography>
      <Typography variant="subtitle1">{item.description}</Typography>

      <Button sx={{ mt: 2 }} variant="contained" color="primary">
        Ver Mais
      </Button>
    </Paper>
  );
}

export default Carossel;
