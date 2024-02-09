import Typography from "@mui/material/Typography";
import { Grid, Container, Box } from "@mui/material";
import WorkoutsList from "../components/appContent/workout/WorkoutsList";
import axios from "axios";
import { useSelector } from "react-redux";
const MyWorkoutsPage = () => {
  const userId = useSelector(
    (store) => store.authenticationSlice.userData?._id
  );

  const fetchMyWorkoutsData = async (userId) => {
    const { data } = await axios.get("/workouts/my-workouts");
    const { data: userData } = await axios.get(`/users/${userId}`);
    const updatedWorkouts = data.workouts.map((workout) => ({
      ...workout,
      isLiked: workout.likes.includes(userId),
      userData: userData.userData,
    }));
    return updatedWorkouts;
  };

  return (
    <>
      <Box sx={{ pb: 5 }}>
        <Typography
          variant="h4"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          My Workouts
        </Typography>
        <Container component="main" maxWidth="md" sx={{ marginTop: "3rem" }}>
          <Grid container spacing={2} justifyContent="center">
            <WorkoutsList
              dataSourceSupplier={fetchMyWorkoutsData}
              message="workouts"
            />
          </Grid>
        </Container>
      </Box>
    </>
  );
};
export default MyWorkoutsPage;
