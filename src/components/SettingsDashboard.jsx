import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from "@mui/material/Switch";
import WifiIcon from "@mui/icons-material/Wifi";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BluetoothIcon from "@mui/icons-material/Bluetooth";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const SettingsDashboard = () => {
  const [checked, setChecked] = React.useState(["wifi"]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      subheader={<ListSubheader>Settings</ListSubheader>}
    >
      <ListItem>
        <ListItemIcon>
          <PersonOutlineIcon />
        </ListItemIcon>
        <Typography sx={{ fontFamily: "Montserrat, sans-serif" }}>
          Profile
        </Typography>
        <ArrowForwardIosIcon />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <BluetoothIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-bluetooth" primary="Account" />
        <Switch
          edge="end"
          onChange={handleToggle("bluetooth")}
          checked={checked.indexOf("bluetooth") !== -1}
          inputProps={{
            "aria-labelledby": "switch-list-label-bluetooth",
          }}
        />
      </ListItem>
    </List>
  );
};
export default SettingsDashboard;
