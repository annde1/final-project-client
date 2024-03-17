import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const PremiumStatusModal = ({
  open,
  onClose,
  onChangePremiumStatus,
  isPremium,
}) => {
  const handleClose = () => {
    onClose();
  };
  const handleChangePremiumStatus = () => {
    onChangePremiumStatus();
    onClose();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontFamily: "Montserrat, sans-serif", textAlign: "center" }}
          >
            Are you sure you want to change your premium status?
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              fontFamily: "Montserrat, sans-serif",
              textAlign: "center",
              mt: 2,
            }}
          >
            You are currently {isPremium ? "premium" : "non-premium"} user.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 4, mb: 5, fontFamily: "Montserrat, sans-serif" }}
              onClick={handleChangePremiumStatus}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleClose}
              sx={{ mt: 4, mb: 5, fontFamily: "Montserrat, sans-serif" }}
            >
              Discard
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default PremiumStatusModal;
