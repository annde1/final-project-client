import { openedMixin, closedMixin } from "../../appContent/ui/MuiMixin";
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";

const drawerWidthOpen = 240; // Width when the drawer is open

export const DrawerStyled = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidthOpen,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
