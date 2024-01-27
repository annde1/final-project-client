import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useSelector } from "react-redux";
import { Box, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routes";
import { useLogout } from "../hooks/useLogout";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
const UserStatus = () => {
  const [userName, setUserName] = useState("");
  const isLoggedIn = useSelector(
    (store) => store.authenticationSlice.isLoggedIn
  );
  const userId = useSelector(
    (store) => store.authenticationSlice.userData?._id
  );
  const theme = useTheme();
  const navigate = useNavigate();
  const logout = useLogout();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const { data } = await axios.get(`/users/${userId}`);
        setUserName(data.userData.userName);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserName();
  }, [userId]);

  const handleLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {" "}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {" "}
        <FiberManualRecordIcon
          sx={{
            height: "10px",
            width: "10px",
            color: isLoggedIn ? "#37B213" : "#2392FF",
          }}
        />
        <Typography
          variant="subtitle2"
          sx={{ fontFamily: "Montserrat", marginLeft: 1 }}
        >
          {isLoggedIn ? userName : "login"}
        </Typography>
        {isLoggedIn ? (
          <IconButton onClick={handleLogout}>
            <LogoutIcon
              sx={{ color: "#B3B3B5", height: "20px", width: "15px" }}
            />
          </IconButton>
        ) : (
          <IconButton onClick={handleLogin}>
            <LoginIcon
              sx={{
                color: "#B3B3B5",
                height: "25px",
                width: "18px",
                marginLeft: 0.5,
              }}
            />
          </IconButton>
        )}
      </Box>
    </>
  );
};
export default UserStatus;
