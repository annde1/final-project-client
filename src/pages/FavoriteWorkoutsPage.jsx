import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import axios from "axios";
import WorkoutsList from "../components/appContent/workout/WorkoutsList";
import { filterWorkouts } from "../service/workout-service";
import { useSelector } from "react-redux";

const FavoriteWorkoutsPage = () => {
  const user = useSelector((store) => store.authenticationSlice.userData?._id);

  const fetchFavoriteWorkouts = async (userId, query) => {
    const filter = query?.filterBy ? query?.filterBy : "";
    const userName = query?.search ? query?.search : "";

    const { data } = await axios.get(
      `/workouts/feeds?filter=${filter}&userName=${userName}`
    );
    const { data: userData } = await axios.get("/users/following");
    const workouts = filterWorkouts(data.feeds, userData.following, user);

    //Get only the wourkouts where isLiked is true
    const likedWorkouts = workouts.filter((workout) => workout.isLiked);
    return likedWorkouts;
  };

  return (
    <>
      <Box sx={{ pb: 4 }}>
        <Typography
          variant="h4"
          style={{
            fontFamily: "Montserrat, sans-serif",
            marginBottom: "5rem",
          }}
        >
          Favorite Workouts
        </Typography>
        <Container component="main" maxWidth="md" sx={{ marginTop: 5 }}>
          <Grid container spacing={2} justifyContent="center">
            <WorkoutsList
              dataSourceSupplier={fetchFavoriteWorkouts}
              showSearch={true}
              message="favorite workouts"
              showLiked={true}
            />
          </Grid>
        </Container>
      </Box>
    </>
  );
};
export default FavoriteWorkoutsPage;
