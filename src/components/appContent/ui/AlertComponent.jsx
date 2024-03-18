import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

export default function AlertComponent({ userNameError, onCloseAlert }) {
  let bool;
  if (userNameError === "") {
    bool = false;
  } else {
    bool = true;
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={bool}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                onCloseAlert();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          severity="info"
          sx={{ fontFamily: "Montserrat" }}
        >
          {userNameError}
        </Alert>
      </Collapse>
    </Box>
  );
}
