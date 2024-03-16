import * as React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ListSubheader from "@mui/material/ListSubheader";
import Search from "../../top-navigation/Search";
import SearchIconWrapper from "./SearchIconWrapper";
import StyledInputBase from "./StyledInputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import AlertComponent from "./AlertComponent";

const ContentFilter = ({
  showSearch,
  onUpdateFilter,
  userNameError,
  onCloseAlert,
}) => {
  const [selectedFilter, setSelectedFilter] = React.useState("");
  const [userNameSearch, setUserNameSearch] = React.useState("");

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handleuserNameSearchChange = (event) => {
    setUserNameSearch(event.target.value);
  };

  const handleSelectFilterChange = async (e) => {
    e.preventDefault();
    const query = selectedFilter.replace(/\s/g, "");
    const filterData = { search: userNameSearch, filterBy: query };
    onUpdateFilter(filterData);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "80%" }}>
      {" "}
      {showSearch && (
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Username…"
            inputProps={{ "aria-label": "search" }}
            onChange={handleuserNameSearchChange}
            value={userNameSearch}
          />
        </Search>
      )}
      {/* {userNameError && <Alert severity="info">{userNameError}</Alert>} */}
      {userNameError && (
        <AlertComponent
          userNameError={userNameError}
          onCloseAlert={onCloseAlert}
        />
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
