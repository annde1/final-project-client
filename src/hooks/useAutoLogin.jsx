import { useDispatch } from "react-redux";
import { getToken } from "../service/login-service";
import { jwtDecode } from "jwt-decode";
import { authActions } from "../store/authentication-slice";

const useAutoLogin = () => {
  const dispatch = useDispatch();
  return async (skipTokenTest = false) => {
    try {
      const token = getToken();
      if (!token) {
        return;
      }
      const userData = jwtDecode(token);

      dispatch(authActions.login(userData));
    } catch (err) {
      // console.log("ERR FROM AUTO LOGIN", err);
    }
  };
};
export default useAutoLogin;
