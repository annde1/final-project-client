import * as React from "react";

import Box from "@mui/material/Box";
import MiniDrawer from "./Drawer";

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MiniDrawer />
    </Box>
  );
};
export default NavBar;
