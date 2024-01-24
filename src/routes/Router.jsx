import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";
import RegisterPage from "../pages/RegisterPage"; // Adjust the path if needed
import CreateTemplatePage from "../pages/CreateTemplate";
import LoginPage from "../pages/Login";
import MyProfilePage from "../pages/MyProfile";
import MyWorkoutsPage from "../pages/MyWorkouts";
import MyTemplatesPage from "../pages/MyTemplates";
import AboutPage from "../pages/About";
import EditProfilePage from "../pages/EditProfile";
import EditTemplatePage from "../pages/EditTemplate";
import NewWorkout from "../pages/NewWorkout";
import FeedsPage from "../pages/Feeds";
import SocialPage from "../pages/SocialPage";

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.CREATETEMPLATE} element={<CreateTemplatePage />} />
      <Route path={ROUTES.EDITPROFILE} element={<EditProfilePage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.MYPROFILE} element={<MyProfilePage />} />
      <Route path={ROUTES.MYWORKOUTS} element={<MyWorkoutsPage />} />
      <Route path={`${ROUTES.STARTWORKOUT}/:id`} element={<NewWorkout />} />
      <Route path={ROUTES.MYTEMPLATES} element={<MyTemplatesPage />} />
      <Route
        path={`${ROUTES.EDITTEMPLATE}/:id`}
        element={<EditTemplatePage />}
      />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.SOCIAL} element={<SocialPage />} />
      <Route path={ROUTES.FEEDS} element={<FeedsPage />} />
    </Routes>
  );
};
