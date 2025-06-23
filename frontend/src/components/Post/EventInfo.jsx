import { Box, Stack, Typography, Button, Link, Rating } from "@mui/material";
import RateMenu from "./RateMenu.jsx";
import { useEffect, useState } from "react";
import EventMenu from "./EventMenu.jsx";
import { userStore } from "../../../store/userStore.js";
import { postStore } from "../../../store/postsStore.js";
const EventInfo = ({ content }) => {
  const [inscricao, setInscricao] = useState(false);
  const data = new Date(content.eventDate).toLocaleDateString();
  const needSubscribe = content.registrationStartDate != null;
  let subscribe = false;
  if (needSubscribe) {
    subscribe =
      new Date() >= new Date(content.registrationStartDate) &&
      new Date() <= new Date(content.registrationEndDate);
  }
  const handleSubmit = () => {
    setInscricao(!inscricao);
  };
  const { userData } = userStore();
  const { ratingPost } = postStore();
  let openMenu = false;

  if (userData.logged && userData.userId == content.User.userId) {
    openMenu = true;
  }

  const [rating, setRating] = useState(0);
  useEffect(() => {
    const x = async () => {
      const res = await ratingPost(content.publicationId);
      if (res.success) {
        let rate = +res.rating;
        if (!res.rating) {
          rate = 0;
        }
        setRating(rate);

        return;
      }
      //alert(res.message);
      return;
    };
    x();
  }, []);
  let canSubscribe = false;
  if (userData.logged) {
    canSubscribe = userData;
  }

  return (
    <>
      <Stack spacing={4}>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" color="ocean.dark">
              {content.title}
            </Typography>
            <Typography variant="body2" color="ocean.dark">
              {content.date}
            </Typography>
            <Rating
              name="half-rating-read"
              value={rating}
              precision={0.5}
              readOnly
            />
          </Box>
          {openMenu && <EventMenu id={content.publicationId}></EventMenu>}
        </Box>

        <Box>
          <Typography
            sx={{
              fontFamily: "inter",
              color: "ocean.dark",
              whiteSpace: "pre-line",
              wordBreak: "break-word",
              textAlign: "justify",
              px: 2,
            }}
          >
            {content.text}
          </Typography>
        </Box>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{
            px: 2,
            height: "60px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",

              width: "100%",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography>Data</Typography>
              <Box
                sx={{
                  bgcolor: "#d9d9d9",
                  borderRadius: 2,
                  textAlign: "center",
                  height: "30px",
                  width: "fit-content",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  px: 2,
                }}
              >
                <Typography>{data}</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              {openMenu && (
                <RateMenu publication={content.publicationId}></RateMenu>
              )}
            </Box>
          </Box>
        </Stack>

        {needSubscribe && (
          <Box>
            <Button
              variant="contained"
              sx={{
                width: "100%",
                bgcolor: "ocean.dark",
              }}
              onClick={() => handleSubmit()}
              disabled={inscricao || !subscribe}
            >
              {subscribe
                ? inscricao
                  ? "Inscrito"
                  : "Inscrever"
                : "Finalizada"}
            </Button>
          </Box>
        )}
      </Stack>
    </>
  );
};

export default EventInfo;
