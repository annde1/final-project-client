import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../routes/routes";

export const ModeratorGuard = ({ children }) => {
  const isModerator = useSelector(
    (store) => store.authenticationSlice.userData?.isModerator
  );
  if (isModerator) {
    return children;
  } else {
    return <Navigate to={ROUTES.LOGIN} replace={true} />;
  }
};
