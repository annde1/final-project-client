import { UserProfile } from "../components/UserProfile";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Grid, Container, Button } from "@mui/material";
import { calculateBMI } from "../service/user-profile";
import BmiModal from "../components/BmiModal";
import ProfileSkeleton from "../components/ProfileSkeleton";
const MyProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bmiModal, setShowBmiModal] = useState(false);
  const [bmi, setBmi] = useState(null);
  const userId = useSelector(
    (store) => store.authenticationSlice.userData?._id
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        //Fetch user profile information
        const { data } = await axios.get(`/users/${userId}`);
        console.log(data);
        setUserData(data.userData);
        //Fetch user's workouts
        const { data: userWorkouts } = await axios.get("/workouts/my-workouts");
        setWorkouts(userWorkouts.workouts);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleCalculateBmi = () => {
    const bmi = calculateBMI(userData.height, userData.weight);
    setBmi(bmi);
    setShowBmiModal(true);
  };

  const handleCloseModal = () => {
    setShowBmiModal(false);
  };
  return (
    <>
      <Typography variant="h4" style={{ fontFamily: "Montserrat, sans-serif" }}>
        My Profile
      </Typography>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            <Grid item xs={12} sm={12}>
              <UserProfile userData={userData} workouts={workouts} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                size="small"
                variant="contained"
                sx={{
                  marginTop: 3,
                  fontFamily: "Montserrat, sans-serif",
                  // color: "#0B0D12",
                  fontWeight: "bold",
                  backgroundColor: "#0B0D12",
                }}
                onClick={handleCalculateBmi}
              >
                Calculate BMI
              </Button>
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
    </>
  );
};
export default MyProfilePage;
