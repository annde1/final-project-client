import { clearToken } from "../service/login-service";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authentication-slice";
export const useLogout = () => {
  const dispatch = useDispatch();
  const logout = () => {
    clearToken();
    dispatch(authActions.logout());
  };
  return logout;
};
