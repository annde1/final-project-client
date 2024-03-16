import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "../../../styles/styles.css";
import { AppBarStyled } from "../AppBarStyled";
import { DrawerHeader } from "./DrawerHeader";
import { DrawerStyled } from "./DrawerStyled";
import UserStatus from "../../appContent/userProfile/UserStatus";
import SearchBar from "../SearchBar";
import DrawerLinksList from "../DrawerLinkList";

const SideDrawer = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarStyled
        position="fixed"
        open={open}
        sx={{ backgroundColor: "#0B0D13" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            style={{
              fontFamily: "Montserrat",
              position: "absolute",
              left: !open && 60,
              display: open && "none",
            }}
          >
            Zen Fit
          </Typography>
          <SearchBar />
          <UserStatus />
        </Toolbar>
      </AppBarStyled>

      <DrawerStyled variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon sx={{ color: "#EAEDF3" }} />
            ) : (
              <ChevronLeftIcon sx={{ color: "#EAEDF3" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <DrawerLinksList open={open} isSideDrawer={true} />
      </DrawerStyled>
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
};
export default SideDrawer;
