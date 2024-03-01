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
import FavoriteIcon from "@mui/icons-material/Favorite";

export const getIcon = (to, isActive) => {
  switch (to) {
    case ROUTES.MYPROFILE:
      return (
        <>
          <PersonIcon sx={{ color: isActive ? "#ADE32B" : "#EAEDF3" }} />;
        </>
      );
    case ROUTES.EDITPROFILE:
      return <SettingsIcon sx={{ color: isActive ? "#ADE32B" : "#EAEDF3" }} />;
    case ROUTES.MYTEMPLATES:
      return <WysiwygIcon sx={{ color: isActive ? "#ADE32B" : "#EAEDF3" }} />;
    case ROUTES.CREATETEMPLATE:
      return <AddBoxIcon sx={{ color: isActive ? "#ADE32B" : "#EAEDF3" }} />;
    case ROUTES.MYWORKOUTS:
      return (
        <FitnessCenterIcon sx={{ color: isActive ? "#ADE32B" : "#EAEDF3" }} />
      );
    case ROUTES.ABOUT:
      return <InfoIcon sx={{ color: isActive ? "#ADE32B" : "#EAEDF3" }} />;
    case ROUTES.LOGIN:
      return <LoginIcon sx={{ color: isActive ? "#ADE32B" : "#EAEDF3" }} />;
    case ROUTES.REGISTER:
      return <HowToRegIcon sx={{ color: isActive ? "#ADE32B" : "#EAEDF3" }} />;
    case ROUTES.SOCIAL:
      return <GroupsIcon sx={{ color: isActive ? "#ADE32B" : "#EAEDF3" }} />;
    case ROUTES.FEEDS:
      return <FeedIcon sx={{ color: isActive ? "#ADE32B" : "#EAEDF3" }} />;
    case ROUTES.MODERATOR:
      return (
        <AdminPanelSettingsIcon
          sx={{ color: isActive ? "#ADE32B" : "#EAEDF3" }}
        />
      );
    case ROUTES.FAVORITEWORKOUTS:
      return <FavoriteIcon sx={{ color: isActive ? "#ADE32B" : "#EAEDF3" }} />;
    default:
      return null;
  }
};
