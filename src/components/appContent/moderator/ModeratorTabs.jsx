import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UserManagmentTab from "./UserManagmentTab";
import TemplateManagmentTab from "./TemplatesManagmentTab";
import WorkoutsManagmentTab from "./WorkoutsManagmentTab";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const ModeratorTabs = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "#EAEDF3", width: "100%" }}>
      <AppBar position="static" sx={{ bgcolor: "#0B0D12" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#EAEDF3",
            },
          }}
        >
          <Tab
            label="User Managment"
            sx={{ fontFamily: "Montserrat, sans-serif" }}
          />
          <Tab
            label="Templates Managment"
            sx={{ fontFamily: "Montserrat, sans-serif" }}
          />
          <Tab
            label="Workouts Managment"
            sx={{ fontFamily: "Montserrat, sans-serif" }}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <UserManagmentTab />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <TemplateManagmentTab />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <WorkoutsManagmentTab />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
};
export default ModeratorTabs;
