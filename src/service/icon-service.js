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

export const getIcon = (to) => {
  switch (to) {
    case ROUTES.MYPROFILE:
      return <PersonIcon />;
    case ROUTES.EDITPROFILE:
      return <SettingsIcon />;
    case ROUTES.MYTEMPLATES:
      return <WysiwygIcon />;
    case ROUTES.CREATETEMPLATE:
      return <AddBoxIcon />;
    case ROUTES.MYWORKOUTS:
      return <FitnessCenterIcon />;
    case ROUTES.ABOUT:
      return <InfoIcon />;
    case ROUTES.LOGIN:
      return <LoginIcon />;
    case ROUTES.REGISTER:
      return <HowToRegIcon />;
    case ROUTES.SOCIAL:
      return <GroupsIcon />;
    case ROUTES.FEEDS:
      return <FeedIcon />;
    default:
      return null;
  }
};
