import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TextField from "@mui/material/TextField";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Grid, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import ProfileSettingsTab from "./ProfileSetting";
import IconButton from "@mui/material/IconButton";
import ChangePasswordTab from "./ChangePasswordTab";
import FollowersTab from "./FollowersTab";
import FollowingTab from "./FollowingTab";
const SocialTabs = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{
              borderColor: "text.primary",
              "& .MuiTabs-indicator": {
                backgroundColor: "#545558",
              },
            }}
          >
            <Tab
              label="Followers"
              value="1"
              sx={{ fontFamily: "Montserrat, sans-serif", color: "#0B0D12" }}
            />
            <Tab
              label="Following"
              value="2"
              sx={{ fontFamily: "Montserrat, sans-serif", color: "#0B0D12" }}
            />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ fontFamily: "Montserrat, sans-serif" }}>
          <FollowersTab />
        </TabPanel>
        <TabPanel value="2">
          <FollowingTab />
        </TabPanel>
      </TabContext>
    </Box>
  );
};
export default SocialTabs;
