import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import UserStatus from "../../appContent/userProfile/UserStatus";
import SearchBar from "../SearchBar";
import DrawerLinksList from "../DrawerLinkList";
import { useLocation } from "react-router-dom";
const TopDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  //Close the drawer when the route changes
  useEffect(() => {
    handleDrawerClose();
  }, [location.pathname]);

  const handleMenuClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#0B0D12" }}>
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <SearchBar />
          <UserStatus />
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={handleDrawerClose}
        // ModalProps={{ onBackdropClick: handleDrawerClose }}
      >
        <DrawerLinksList />
      </Drawer>
    </>
  );
};

export default TopDrawer;
