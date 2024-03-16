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

const TemplateModal = ({
  open,
  onCloseModal,
  onDeleteTemplate,
  selectedTemplate,
}) => {
  const handleDiscard = () => {
    onCloseModal();
  };
  const handleDeleteTemplate = () => {
    onDeleteTemplate(selectedTemplate);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          onCloseModal();
        }}
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
            Are you sure you want to delete this template?
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 3,
              fontFamily: "Montserrat, sans-serif",
              textAlign: "center",
            }}
          >
            Deleting this template will permanently remove the template from the
            database and all associated data. This action cannot be undone.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteTemplate}
              sx={{ mt: 4, mb: 5, fontFamily: "Montserrat, sans-serif" }}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDiscard}
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
export default TemplateModal;
