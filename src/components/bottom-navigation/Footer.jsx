import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Footer = () => {
  const [value, setValue] = React.useState(0);

  return (
    <Box>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ backgroundColor: "#0B0D12", height: "6rem" }}
      >
        <BottomNavigationAction
          icon={<RestoreIcon sx={{ color: "#EAEDF3" }} />}
        />
        <BottomNavigationAction
          icon={<FavoriteIcon sx={{ color: "#EAEDF3" }} />}
        />
        <BottomNavigationAction
          icon={<LocationOnIcon sx={{ color: "#EAEDF3" }} />}
        />
      </BottomNavigation>
    </Box>
  );
};
export default Footer;
