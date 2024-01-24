import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import { getIcon } from "../service/icon-service";
import { useSelector } from "react-redux";
import { loggedInLinks, loggedOutLinks } from "../service/links";
import SearchIcon from "@mui/icons-material/Search";
import "../styles/styles.css";
import InputBase from "@mui/material/InputBase";
import axios from "axios";
import Popover from "@mui/material/Popover";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { alpha } from "@mui/material/styles";
import { useRef } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerStyled = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const MiniDrawer = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchInputRef = useRef(null);
  const [userName, setUserName] = useState("");
  const isLoggedIn = useSelector(
    (store) => store.authenticationSlice.isLoggedIn
  );
  const userId = useSelector(
    (store) => store.authenticationSlice.userData?._id
  );

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const { data } = await axios.get(`/users/${userId}`);
        setUserName(data.userData.userName);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserName();
  }, [userId]);
  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);
  useEffect(() => {
    console.log(userId);
  }, [userId]);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleInputChange = async (e) => {
    setQuery(e.target.value);

    try {
      const { data } = await axios.get(`/users?query=${query}`);
      console.log(query);
      console.log(data);
      const updatedUsers = data.users.map((user) => ({
        ...user,
        isFollowed: user.followers.includes(userId),
      }));
      setSearchResults(updatedUsers || []);
      setShowDropdown(true);
    } catch (err) {
      console.log(err);
    }
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleFollow = async (_id) => {
    try {
      const { data } = await axios.patch(`/users/follow/${_id}`);
      console.log(data);
      ///Update the search result isFollowed
      setSearchResults((previous) => {
        //loop on the searchResults array and if the user's id matches the _id then toggle isFollowed else return unchanged user
        return previous.map((user) =>
          user._id === _id ? { ...user, isFollowed: !user.isFollowed } : user
        );
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarStyled
        position="fixed"
        open={open}
        sx={{ backgroundColor: "#0B0D13" }}
      >
        <Toolbar sx={{ display: "flex", flexDirection: "row" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* <img
            src="/assets/images/logo-no-background.png"
            alt="logo"
            style={{ height: "3rem", width: "2.5rem" }}
          ></img> */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ fontFamily: "Montserrat" }}
          >
            Zen Fit
          </Typography>

          {isLoggedIn && (
            <Search
              sx={{
                marginLeft: "auto",
                [theme.breakpoints.up("md")]: {
                  marginLeft: 28,
                  width: "25rem",
                },
                [theme.breakpoints.up("lg")]: {
                  marginLeft: 38,
                  width: "25rem",
                },
                [theme.breakpoints.up("xl")]: {
                  marginLeft: 52,
                  width: "25rem",
                },
              }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={query}
                onChange={handleInputChange}
                ref={searchInputRef}
              />
              {searchResults.length > 0 && (
                <Popover
                  id="user-dropdown"
                  open={showDropdown}
                  anchorEl={searchInputRef.current}
                  onClose={toggleDropdown}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  disableRestoreFocus
                  disableAutoFocus={true}
                  sx={{
                    // "& .MuiPaper-root": {
                    //   width: "25rem", // Set your desired width
                    //   // maxWidth: "100%", // Ensure it doesn't exceed the search bar width
                    // },
                    // marginLeft: "auto",
                    [theme.breakpoints.up("md")]: {
                      marginRight: 38,
                    },
                    [theme.breakpoints.up("lg")]: {
                      marginRight: 28,
                    },
                    [theme.breakpoints.up("xl")]: {
                      marginLeft: 52,
                    },
                  }}
                >
                  <List
                    sx={{
                      maxHeight: "200px", // Set your desired maxHeight
                      overflowY: "auto",
                    }}
                  >
                    {searchResults.map((result, index) => (
                      <ListItem key={index} alignItems="center">
                        <ListItemAvatar>
                          <Avatar alt={result.userName} src={result.avatar} />
                        </ListItemAvatar>

                        <Typography variant="subtitle2">
                          {result.name.firstName} {result.name.lastName}
                        </Typography>
                        {result.isFollowed ? (
                          <IconButton
                            size="small"
                            onClick={() => {
                              handleFollow(result._id);
                            }}
                          >
                            <PersonRemoveIcon />
                          </IconButton>
                        ) : (
                          <IconButton
                            size="small"
                            onClick={() => {
                              handleFollow(result._id);
                            }}
                          >
                            <PersonAddIcon />
                          </IconButton>
                        )}
                      </ListItem>
                    ))}
                  </List>
                </Popover>
              )}
            </Search>
          )}
          {isLoggedIn && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifySelf: "flex-end",
                [theme.breakpoints.up("sm")]: {
                  marginLeft: "auto",
                },
              }}
            >
              {" "}
              <FiberManualRecordIcon
                sx={{ height: "10px", width: "10px", color: "#37B213" }}
              />
              <Typography
                variant="subtitle2"
                sx={{ fontFamily: "Montserrat", marginLeft: 1 }}
              >
                {userName}
              </Typography>
              <IconButton>
                <LogoutIcon
                  sx={{ color: "#B3B3B5", height: "20px", width: "15px" }}
                />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBarStyled>

      <DrawerStyled variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {isLoggedIn &&
            loggedInLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <ListItem
                  disablePadding
                  sx={{ display: "block", marginTop: "1rem" }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {getIcon(link.to)}
                    </ListItemIcon>
                    <ListItemText
                      primary={link.children}
                      sx={{ opacity: open ? 1 : 0 }}
                      className="customFont"
                    />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))}
          {!isLoggedIn &&
            loggedOutLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <ListItem
                  disablePadding
                  sx={{ display: "block", marginTop: "1rem" }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {getIcon(link.to)}
                    </ListItemIcon>
                    <ListItemText
                      primary={link.children}
                      sx={{ opacity: open ? 1 : 0 }}
                      className="customFont"
                    />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))}
        </List>
      </DrawerStyled>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
};
export default MiniDrawer;
