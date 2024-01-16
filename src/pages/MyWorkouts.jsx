import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import Workout from "../components/Workout";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const MyWorkoutsPage = () => {
  const [userData, setUserData] = useState({});
  const [workoutsData, setWorkoutsData] = useState([]);

  const userId = useSelector(
    (store) => store.authenticationSlice.userData?._id
  );

  useEffect(() => {
    const fetchUserWorkouts = async () => {
      try {
        const { data } = await axios.get("/workouts/my-workouts");
        console.log(data);
        const updatedWorkouts = data.workouts.map((workout) => ({
          ...workout,
          isLiked: workout.likes.includes(userId),
        }));
        setWorkoutsData(updatedWorkouts);
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
        // console.log(data);
        setUserData(data.userData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, [userId]);

  useEffect(() => {
    console.log(userData);
    console.log(workoutsData);
    // console.log()
  }, [userData, workoutsData]);

  const handleDeleteWorkout = async (_id) => {
    try {
      const { data } = await axios.delete(`/workouts/${_id}`);
      console.log(data);
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
