import { useDispatch } from "react-redux";
import { getToken } from "../service/login-service";
import { jwtDecode } from "jwt-decode";
import { authActions } from "../store/authentication-slice";
import axios from "axios";
const useAutoLogin = () => {
  const dispatch = useDispatch();
  return async (skipTokenTest = false) => {
    try {
      const token = getToken();
      console.log(token);
      if (!token) {
        return;
      }
      const userData = jwtDecode(token);
      const id = userData._id;
      if (skipTokenTest) await axios.get(`/users/${id}`);
      dispatch(authActions.login(userData));
      //userData = payload
    } catch (err) {
      console.log("ERR FROM AUTO LOGIN", err);
    }
  };
};
export default useAutoLogin;
