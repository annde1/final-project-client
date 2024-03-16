import Search from "./Search";
import SearchIconWrapper from "../appContent/ui/SearchIconWrapper";
import StyledInputBase from "../appContent/ui/StyledInputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import axios from "axios";
import ListItem from "@mui/material/ListItem";
import Popover from "@mui/material/Popover";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import { NavLink } from "react-router-dom";
import { errorToast, infoToast } from "../../service/toastify-service";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");
  const isLoggedIn = useSelector(
    (store) => store.authenticationSlice.isLoggedIn
  );
  const userId = useSelector(
    (store) => store.authenticationSlice.userData?._id
  );
  const searchInputRef = useRef(null);
  const theme = useTheme();

  const handleInputChange = (e) => {
    const searchboxValue = e.target.value;
    setQuery(searchboxValue);

    axios
      .get(`/users?query=${searchboxValue}`)
      .then(({ data }) => {
        const updatedUsers = data.users.map((user) => ({
          ...user,
          isFollowed: user.followers.includes(userId),
        }));
        setSearchResults(updatedUsers || []);
        setShowDropdown(true);
        setError("");
      })

      .catch((err) => {
        if (err.request.status === 404) {
          setError("No users found");
        }
      });
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleFollow = async (_id) => {
    try {
      await axios.patch(`/users/follow/${_id}`);
      setSearchResults((previous) => {
        return previous.map((user) =>
          user._id === _id ? { ...user, isFollowed: !user.isFollowed } : user
        );
      });
      const action = !searchResults.find((user) => user._id === _id).isFollowed
        ? "followed"
        : "unfollowed";
      infoToast(
        `You have ${action} ${
          searchResults.find((user) => user._id === _id).name.firstName
        }`
      );
    } catch (err) {
      // console.log(err);
      errorToast("Something went wrong. Could not perform the action.");
    }
  };
  return (
    <>
      {isLoggedIn && (
        <Search sx={{ width: "50%", ml: 2 }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search User…"
            inputProps={{ "aria-label": "search" }}
            ref={searchInputRef}
            value={query}
            onChange={(e) => {
              handleInputChange(e);
            }}
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
              PaperProps={{
                sx: {
                  width: searchInputRef.current
                    ? searchInputRef.current.clientWidth
                    : "auto",
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
                      <Avatar alt={result.userName} src={result.file} />
                    </ListItemAvatar>
                    <NavLink
                      to={`/user/${result._id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ fontFamily: "Montserrat" }}
                      >
                        {result.firstName} {result.lastName}
                      </Typography>
                    </NavLink>
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
              {error && (
                <Alert severity="info">
                  {error} "{query}"
                </Alert>
              )}
            </Popover>
          )}
        </Search>
      )}
    </>
  );
};
export default SearchBar;
