import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PersonIcon from "@mui/icons-material/Person";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import EditIcon from "@mui/icons-material/Edit";
import { ROUTES } from "../routes/routes";
export const getIcon = (to) => {
  switch (to) {
    case ROUTES.MYPROFILE:
      return <PersonIcon />;
    case ROUTES.EDITPROFILE:
      return <EditIcon />;
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
    default:
      return null;
  }
};
