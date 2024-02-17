import { useSelector } from "react-redux";
import {
  loggedInLinks,
  loggedOutLinks,
  moderatorLinks,
} from "../../service/links";
import DrawerLink from "./DrawerLink";
import { List } from "@mui/material";
import { useLocation } from "react-router-dom";

const DrawerLinksList = ({ open, isSideDrawer }) => {
  const isLoggedIn = useSelector(
    (store) => store.authenticationSlice.isLoggedIn
  );
  const isModerator = useSelector(
    (store) => store.authenticationSlice.userData?.isModerator
  );
  const location = useLocation();

  return (
    <List
      sx={{
        backgroundColor: "#0B0D12",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        height: "100%",
      }}
    >
      {isLoggedIn &&
        loggedInLinks.map((link) => (
          <DrawerLink
            key={link.to}
            to={link.to}
            children={link.children}
            open={open}
            isSideDrawer={isSideDrawer}
            isActive={location.pathname === link.to}
          />
        ))}
      {isLoggedIn &&
        isModerator &&
        moderatorLinks.map((link) => (
          <DrawerLink
            key={link.to}
            to={link.to}
            children={link.children}
            open={open}
            isSideDrawer={isSideDrawer}
          />
        ))}
      {!isLoggedIn &&
        loggedOutLinks.map((link) => (
          <DrawerLink
            key={link.to}
            to={link.to}
            children={link.children}
            open={open}
            isSideDrawer={isSideDrawer}
          />
        ))}
    </List>
  );
};
export default DrawerLinksList;
