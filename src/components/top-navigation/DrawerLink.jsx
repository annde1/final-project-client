import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import { getIcon } from "../../service/icon-service";

const DrawerLink = ({ to, children, open, isSideDrawer }) => {
  return (
    <>
      <NavLink
        key={to}
        to={to}
        style={{
          textDecoration: "none",
          color: "#EAEDF3",
          fontFamily: "Montserrat",
        }}
      >
        <ListItem
          disablePadding
          sx={{
            display: "block",
            marginTop: "1rem",
            fontFamily: "Montserrat",
          }}
        >
          <ListItemButton
            component="div"
            sx={{
              minHeight: 48,
              justifyContent: isSideDrawer ? (open ? "initial" : "center") : "",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 3,
                justifyContent: "center",
              }}
            >
              {getIcon(to)}
            </ListItemIcon>

            <ListItemText
              primary={children}
              primaryTypographyProps={{
                fontFamily: "Montserrat",
                fontWeight: "bold",
              }}
              sx={{ opacity: isSideDrawer ? (open ? 1 : 0) : 1 }}
              className="customFont"
            />
          </ListItemButton>
        </ListItem>
      </NavLink>
    </>
  );
};
export default DrawerLink;
