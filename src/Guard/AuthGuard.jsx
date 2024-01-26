import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../routes/routes";

const AuthGuard = ({ children }) => {
  const isLoggedIn = useSelector(
    (store) => store.authenticationSlice.isLoggedIn
  );
  console.log("auth guard is logged in: ", isLoggedIn);
  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to={ROUTES.LOGIN} replace={true} />;
  }
};
export default AuthGuard;
