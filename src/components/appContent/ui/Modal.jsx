import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#EAEDF3",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};
const ModalComponent = ({ open, onCloseModal, templateName }) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => {
          onCloseModal();
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontFamily: "Montserrat, sans-serif", textAlign: "center" }}
            >
              {templateName}
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{
                mt: 2,
                fontFamily: "Montserrat, sans-serif",
                textAlign: "center",
              }}
            >
              Your workout has no set values
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
export default ModalComponent;
