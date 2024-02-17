import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import "../../styles/styles.css";
const Footer = () => {
  return (
    <Box>
      <BottomNavigation
        showLabels
        sx={{ backgroundColor: "#0B0D12", height: "8rem" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="app-logo"
            src="assets/images/logo-color.png"
            sx={{ height: "70px", width: "70px" }}
          />
          <Typography sx={{ color: "#EAEDF3" }} className="customFont">
            © 2024 ZenFit. All rights reserved.
          </Typography>
        </Box>
      </BottomNavigation>
    </Box>
  );
};
export default Footer;
