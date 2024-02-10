import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PersonIcon from "@mui/icons-material/Person";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import FeedIcon from "@mui/icons-material/Feed";
import GroupsIcon from "@mui/icons-material/Groups";
import { ROUTES } from "../routes/routes";
import SettingsIcon from "@mui/icons-material/Settings";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export const getIcon = (to) => {
  switch (to) {
    case ROUTES.MYPROFILE:
      return <PersonIcon sx={{ color: "#EAEDF3" }} />;
    case ROUTES.EDITPROFILE:
      return <SettingsIcon sx={{ color: "#EAEDF3" }} />;
    case ROUTES.MYTEMPLATES:
      return <WysiwygIcon sx={{ color: "#EAEDF3" }} />;
    case ROUTES.CREATETEMPLATE:
      return <AddBoxIcon sx={{ color: "#EAEDF3" }} />;
    case ROUTES.MYWORKOUTS:
      return <FitnessCenterIcon sx={{ color: "#EAEDF3" }} />;
    case ROUTES.ABOUT:
      return <InfoIcon sx={{ color: "#EAEDF3" }} />;
    case ROUTES.LOGIN:
      return <LoginIcon sx={{ color: "#EAEDF3" }} />;
    case ROUTES.REGISTER:
      return <HowToRegIcon sx={{ color: "#EAEDF3" }} />;
    case ROUTES.SOCIAL:
      return <GroupsIcon sx={{ color: "#EAEDF3" }} />;
    case ROUTES.FEEDS:
      return <FeedIcon sx={{ color: "#EAEDF3" }} />;
    case ROUTES.MODERATOR:
      return <AdminPanelSettingsIcon sx={{ color: "#EAEDF3" }} />;
    default:
      return null;
  }
};
