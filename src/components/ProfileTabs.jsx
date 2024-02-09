import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import SecurityIcon from "@mui/icons-material/Security";
import ImageIcon from "@mui/icons-material/Image";
const ProfileTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="icon label tabs example"
    >
      <Tab
        icon={<SecurityIcon />}
        label="Password"
        sx={{ fontFamily: "Montserrat, sans-serif", color: "#0B0D12" }}
      />
      <Tab
        icon={<ImageIcon />}
        label="Profile Image"
        sx={{ fontFamily: "Montserrat, sans-serif", color: "#0B0D12" }}
      />
      <Tab
        icon={<PersonPinIcon />}
        label="Profile details"
        sx={{ fontFamily: "Montserrat, sans-serif", color: "#0B0D12" }}
      />
    </Tabs>
  );
};
export default ProfileTabs;
