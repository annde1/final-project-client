import Typography from "@mui/material/Typography";
import { Grid, Container } from "@mui/material";
import Workout from "../components/Workout";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

const MyWorkoutsPage = () => {
  const [userData, setUserData] = useState({});
  const [workoutsData, setWorkoutsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector(
    (store) => store.authenticationSlice.userData?._id
  );

  useEffect(() => {
    const fetchUserWorkoutsAndData = async () => {
      try {
        const { data } = await axios.get("/workouts/my-workouts");
        const { data: userData } = await axios.get(`/users/${userId}`);
        const updatedWorkouts = data.workouts.map((workout) => ({
          ...workout,
          isLiked: workout.likes.includes(userId),
        }));
        setWorkoutsData(updatedWorkouts);
        setUserData(userData.userData);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserWorkoutsAndData();
  }, [userId]);

  const handleDeleteWorkout = async (_id) => {
    try {
      await axios.delete(`/workouts/${_id}`);
      setWorkoutsData((prevWorkouts) =>
        prevWorkouts.filter((workout) => workout._id !== _id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleLikeWorkout = async (_id) => {
    try {
      const { data } = await axios.patch(`/workouts/${_id}`);
      console.log(data);
      setWorkoutsData((prevWorkouts) =>
        prevWorkouts.map((workout) =>
          workout._id === _id ? { ...workout, ...data.workoutDetails } : workout
        )
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Typography variant="h4" style={{ fontFamily: "Montserrat, sans-serif" }}>
        My Workouts
      </Typography>
      <Container component="main" maxWidth="md" sx={{ marginTop: "3rem" }}>
        <Grid container spacing={2} justifyContent="center">
          {isLoading && (
            <Grid item xs={8} md={8}>
              {" "}
              <CircularProgress color="inherit" />
              <Typography
                variant="body2"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Fetching workouts
              </Typography>
            </Grid>
          )}
          {workoutsData.map((workout) => (
            <Grid item xs={8} md={8} key={workout._id}>
              <Workout
                workout={workout}
                userData={userData}
                onDeleteWorkout={handleDeleteWorkout}
                onLikeWorkout={handleLikeWorkout}
                isLiked={workout.isLiked}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
export default MyWorkoutsPage;
