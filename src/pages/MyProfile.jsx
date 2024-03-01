import { UserProfile } from "../components/UserProfile";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Grid, Container } from "@mui/material";
import { calculateBMI } from "../service/user-profile";
import BmiModal from "../components/BmiModal";
import ProfileSkeleton from "../components/ProfileSkeleton";
import { errorToast } from "../service/toastify-service";
import UserProfileModal from "../components/UserProfileModal";
import { useLogout } from "../hooks/useLogout";
import { infoToast } from "../service/toastify-service";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routes";
const MyProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bmiModal, setShowBmiModal] = useState(false);
  const [bmi, setBmi] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const userId = useSelector(
    (store) => store.authenticationSlice.userData?._id
  );
  const logout = useLogout();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        //Fetch user profile information
        const { data } = await axios.get(`/users/${userId}`);
        setUserData(data.userData);
        //Fetch user's workouts
        const { data: userWorkouts } = await axios.get("/workouts/my-workouts");
        setWorkouts(userWorkouts.workouts);
        setIsLoading(false);
      } catch (err) {
        // console.log(err);
        errorToast("Something went wrong. Could not fetch profile data.");
      }
    };
    fetchUserData();
  }, [userId]);

  const handleShowProfileModal = () => {
    setShowProfileModal(true);
  };
  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };
  const handleCalculateBmi = (height, weight) => {
    const bmi = calculateBMI(userData.height, userData.weight);
    setBmi(bmi);
    setShowBmiModal(true);
  };

  const handleCloseModal = () => {
    setShowBmiModal(false);
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`/users/${userId}`);
      logout();
      navigate(ROUTES.REGISTER);
      infoToast("Account deleted");
    } catch (err) {
      // console.log(err);
      errorToast("Something went wrong. Could not delete the account.");
    }
  };
  return (
    <Box sx={{ height: "100%", pb: 6 }}>
      <Typography variant="h4" style={{ fontFamily: "Montserrat, sans-serif" }}>
        My Profile
      </Typography>

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            {isLoading && (
              <Grid item xs={12} sm={12}>
                {" "}
                <ProfileSkeleton />
              </Grid>
            )}
            {showProfileModal && (
              <UserProfileModal
                open={showProfileModal}
                onClose={handleCloseProfileModal}
                onDeleteProfile={handleDeleteAccount}
              />
            )}
            <Grid item xs={12} sm={12}>
              <UserProfile
                userData={userData}
                workouts={workouts}
                following={userData?.following?.length}
                followers={userData?.followers?.length}
                onCalculateBmi={handleCalculateBmi}
                onShowModal={handleShowProfileModal}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              {bmiModal && (
                <BmiModal
                  bmi={bmi.bmiValue}
                  range={bmi.range}
                  open={bmiModal}
                  onCloseModal={handleCloseModal}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
export default MyProfilePage;
