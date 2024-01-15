import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import Workout from "../components/Workout";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const MyWorkoutsPage = () => {
  //TODO: display the fetched workout data and user details (workout -map)
  const userId = useSelector(
    (store) => store.authenticationSlice.userData?._id
  );

  useEffect(() => {
    const fetchUserWorkouts = async () => {
      try {
        const { data } = await axios.get("/workouts/my-workouts");
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserWorkouts();
  }, [userId]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(`/users/${userId}`);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, [userId]);
  return (
    <>
      <Typography variant="h4" style={{ fontFamily: "Montserrat, sans-serif" }}>
        My Workouts
      </Typography>
      <Container component="main" maxWidth="md" sx={{ marginTop: "3rem" }}>
        <Grid container spacing={2} justifyContent="center">
          {/*map*/}
          <Grid item xs={8} md={8}>
            <Workout />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default MyWorkoutsPage;
