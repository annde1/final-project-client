import Typography from "@mui/material/Typography";
import { Grid, Container, Box } from "@mui/material";
import WorkoutsList from "../components/appContent/workout/WorkoutsList";
import axios from "axios";
import { useState } from "react";
const MyWorkoutsPage = () => {
  const [feedsLength, setFeedsLength] = useState(0);
  const fetchMyWorkoutsData = async (userId, filter) => {
    const orderBy = filter?.filterBy;
    const { data } = await axios.get(`/workouts/${userId}?filter=${orderBy}`);
    // Enrichment with userData
    const { data: userData } = await axios.get(`/users/${userId}`);
    const updatedWorkouts = data.workouts.map((workout) => ({
      ...workout,
      isLiked: workout.likes.includes(userId),
      userData: userData.userData,
    }));
    return updatedWorkouts;
  };
  const handleFeedsLength = (value) => {
    setFeedsLength(value);
  };
  return (
    <>
      <Box sx={{ pb: 5, height: feedsLength > 0 ? "auto" : "100vh" }}>
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
              onFeedsChange={handleFeedsLength}
            />
          </Grid>
        </Container>
      </Box>
    </>
  );
};
export default MyWorkoutsPage;
