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
import AuthGuard from "../Guard/AuthGuard";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NotFound from "../pages/NotFound";
import Test from "../pages/Test";
export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />

      <Route
        path={ROUTES.CREATETEMPLATE}
        element={
          <AuthGuard>
            <CreateTemplatePage />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.EDITPROFILE}
        element={
          <AuthGuard>
            <EditProfilePage />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.MYPROFILE}
        element={
          <AuthGuard>
            <MyProfilePage />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.MYWORKOUTS}
        element={
          <AuthGuard>
            <MyWorkoutsPage />
          </AuthGuard>
        }
      />
      <Route
        path={`${ROUTES.STARTWORKOUT}/:id`}
        element={
          <AuthGuard>
            <NewWorkout />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.MYTEMPLATES}
        element={
          <AuthGuard>
            <MyTemplatesPage />
          </AuthGuard>
        }
      />
      <Route
        path={`${ROUTES.EDITTEMPLATE}/:id`}
        element={
          <AuthGuard>
            <EditTemplatePage />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.SOCIAL}
        element={
          <AuthGuard>
            <SocialPage />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.FEEDS}
        element={
          <AuthGuard>
            <FeedsPage />
          </AuthGuard>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
