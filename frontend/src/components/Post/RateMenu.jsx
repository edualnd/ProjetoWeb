import {
  DialogTitle,
  DialogContent,
  Dialog,
  DialogActions,
  Button,
  Rating,
  ToggleButton,
  Box,
} from "@mui/material";

import { useState } from "react";
import { userStore } from "../../../store/userStore.js";
import { postStore } from "../../../store/postsStore.js";
import DeleteIcon from "@mui/icons-material/Delete";

const RateMenu = ({ publication }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  const { userData } = userStore();
  const { ratePost, editRatePost, deleteRate, fetchData } = postStore();
  const [rateValue, setRateValue] = useState(2.5);
  const [deleteRating, setDeleteRating] = useState(false);

  const handleDeleteRating = () => {
    setRateValue(0);
    setDeleteRating(!deleteRating);
  };
  const rates = userData.Rating || [0];
  const alreadyRate =
    rates.filter((r) => r.publicationId == publication).length > 0;
  const handleSubmit = async () => {
    let res;

    if (alreadyRate && !deleteRating) {
      res = await editRatePost(publication, { rating: rateValue });
    } else if (!alreadyRate && !deleteRating) {
      res = await ratePost(publication, { rating: rateValue });
    } else {
      res = await deleteRate(publication);
    }
    if (res.success) {
      console.log(res.message);
      await fetchData();
      setOpenModal(!openModal);
      return;
    }
    alert(res.message);
    return;
  };

  return (
    <>
      <Button onClick={handleOpenModal}>Avaliar</Button>
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
        <DialogTitle>Avaliar</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Rating
              name="half-rating"
              id="rating"
              precision={0.5}
              onChange={(e, newValue) => setRateValue(newValue)}
              value={rateValue}
            />
            {!alreadyRate && (
              <ToggleButton
                selected={deleteRating}
                onClick={handleDeleteRating}
                sx={{
                  width: "auto",
                  fontSize: "12px",
                  p: 1,
                  color: "ocean.dark",
                  "&.Mui-selected": {
                    color: "white",
                    bgcolor: "error.main",
                  },
                  "&.Mui-selected:hover": {
                    bgcolor: "error.main",
                  },
                }}
              >
                <DeleteIcon></DeleteIcon>
              </ToggleButton>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenModal}>Cancel</Button>
          <Button onClick={handleSubmit} type="submit">
            Avaliar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RateMenu;
