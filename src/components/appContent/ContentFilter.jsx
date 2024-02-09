import * as React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ListSubheader from "@mui/material/ListSubheader";
import Search from "../top-navigation/Search";
import SearchIconWrapper from "../SearchIconWrapper";
import StyledInputBase from "../StyledInputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Grid, Container } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const ContentFilter = ({ isFeeds, onUpdateWorkouts }) => {
  const [selectedFilter, setSelectedFilter] = React.useState("");
  const [userName, setUserName] = React.useState("");

  const userId = useSelector(
    (store) => store.authenticationSlice.userData?._id
  );

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handleSelectFilterChange = async (e) => {
    try {
      e.preventDefault();
      const query = selectedFilter.replace(/\s/g, "");
      //FETCHING
      const { data } = await axios.get(
        `/workouts/feeds?userName=${userName}&filter=${query}`
      );

      let userDataEndpoint = isFeeds ? "/users/following" : `/users/${userId}`;
      const { data: userData } = await axios.get(userDataEndpoint);

      const feedsAndUser = data.feeds.map((feed) => {
        const feedUserData = isFeeds
          ? userData.following.find((user) => user._id === feed.userId)
          : userData.userData;

        return {
          ...feed,
          isLiked: feed.likes.includes(feedUserData._id),
          userData: feedUserData,
        };
      });
      onUpdateWorkouts(feedsAndUser);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(userName);
  }, [userName]);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "80%" }}>
      {" "}
      {isFeeds && (
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Username…"
            inputProps={{ "aria-label": "search" }}
            onChange={handleUserNameChange}
            value={userName}
          />
        </Search>
      )}
      <FormControl sx={{ mt: 3 }}>
        <InputLabel id="grouped-select-label" sx={{ fontFamily: "Montserrat" }}>
          Filter
        </InputLabel>
        <Select
          labelId="grouped-select-label"
          id="grouped-select"
          value={selectedFilter}
          onChange={handleFilterChange}
          label="Grouping"
          sx={{ fontFamily: "Montserrat" }}
        >
          <MenuItem value="">
            <em style={{ fontFamily: "Montserrat" }}>None</em>
          </MenuItem>
          <ListSubheader sx={{ fontFamily: "Montserrat" }}>
            Number of Likes
          </ListSubheader>
          <MenuItem value="Lowest To Highest" sx={{ fontFamily: "Montserrat" }}>
            Lowest to Highest
          </MenuItem>
          <MenuItem value="Highest To Lowest" sx={{ fontFamily: "Montserrat" }}>
            Highest to Lowest
          </MenuItem>
          <ListSubheader sx={{ fontFamily: "Montserrat" }}>
            Created
          </ListSubheader>
          <MenuItem value="Oldest To Newest" sx={{ fontFamily: "Montserrat" }}>
            Oldest to Newest
          </MenuItem>
          <MenuItem value="Newest To Oldest" sx={{ fontFamily: "Montserrat" }}>
            Newest to Oldest
          </MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        sx={{
          fontFamily: "Montserrat",
          width: "5rem",
          alignSelf: "flex-end",
          mt: 3,
          backgroundColor: "#0B0D12",
        }}
        onClick={handleSelectFilterChange}
      >
        Filter
      </Button>
    </Box>
  );
};
export default ContentFilter;
