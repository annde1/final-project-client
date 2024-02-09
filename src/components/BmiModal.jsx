import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 180,
  bgcolor: "#EAEDF3",
  boxShadow: 20,
  p: 4,
};
const BmiModal = ({ bmi, open, range, onCloseModal }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center", fontFamily: "Montserrat, sans-serif" }}
          >
            {isNaN(bmi)
              ? "You haven't specify weight and height"
              : `Your BMI is ${bmi}`}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              textAlign: "center",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            {isNaN(bmi)
              ? "Add weight and height to your profile details to calculate your bmi"
              : `Which puts you in ${range} range`}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
export default BmiModal;
