import * as React from "react";
import { useTheme } from "@mui/material/styles";
import TopDrawer from "./top-drawer/TopDrawer";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import SideDrawer from "./side-drawer/SideDrawer";
const NavBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box sx={{ flexGrow: 1 }}>{isMobile ? <TopDrawer /> : <SideDrawer />}</Box>
  );
};
export default NavBar;
