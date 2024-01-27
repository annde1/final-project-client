import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import FollowersTab from "./app-content/social/FollowersTab";
import FollowingTab from "./app-content/social/FollowingTab";
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
