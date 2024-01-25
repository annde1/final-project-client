import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
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
import axios from "axios";
import Popover from "@mui/material/Popover";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useRef } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import Search from "./Search";
import SearchIconWrapper from "./SearchIconWrapper";
import StyledInputBase from "./StyledInputBase";
import { AppBarStyled } from "./AppBarStyled";
import { DrawerHeader } from "./DrawerHeader";
import { DrawerStyled } from "./DrawerStyled";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routes";
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
  const logout = useLogout();
  const navigate = useNavigate();
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

  const handleLogout = () => {
    logout();
  };

  const handleLogin = () => {
    navigate(ROUTES.LOGIN);
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
                      maxHeight: "200px",
                      overflowY: "auto",
                    }}
                  >
                    {searchResults.map((result, index) => (
                      <ListItem key={index} alignItems="center">
                        <ListItemAvatar>
                          <Avatar
                            alt={result.userName}
                            src={result.image?.url}
                          />
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
              <IconButton onClick={handleLogout}>
                <LogoutIcon
                  sx={{ color: "#B3B3B5", height: "20px", width: "15px" }}
                />
              </IconButton>
            </Box>
          )}
          {!isLoggedIn && (
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
              <FiberManualRecordIcon
                sx={{ height: "10px", width: "10px", color: "#2392FF" }}
              />
              <Typography
                variant="subtitle2"
                sx={{ fontFamily: "Montserrat", marginLeft: 1 }}
              >
                Login
              </Typography>
              <IconButton onClick={handleLogin}>
                <LoginIcon
                  sx={{
                    color: "#B3B3B5",
                    height: "25px",
                    width: "18px",
                    marginLeft: 0.5,
                  }}
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
