import Search from "./Search";
import SearchIconWrapper from "../SearchIconWrapper";
import StyledInputBase from "../StyledInputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import axios from "axios";
import ListItem from "@mui/material/ListItem";
import Popover from "@mui/material/Popover";
import { Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const isLoggedIn = useSelector(
    (store) => store.authenticationSlice.isLoggedIn
  );
  const userId = useSelector(
    (store) => store.authenticationSlice.userData?._id
  );
  const searchInputRef = useRef(null);
  const theme = useTheme();

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

      setSearchResults((previous) => {
        return previous.map((user) =>
          user._id === _id ? { ...user, isFollowed: !user.isFollowed } : user
        );
      });
    } catch (err) {
      console.log(err);
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
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            ref={searchInputRef}
            value={query}
            onChange={handleInputChange}
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
                      <Avatar alt={result.userName} src={result.image?.url} />
                    </ListItemAvatar>

                    <Typography
                      variant="subtitle2"
                      sx={{ fontFamily: "Montserrat" }}
                    >
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
    </>
  );
};
export default SearchBar;
