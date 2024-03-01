import Typography from "@mui/material/Typography";
import { Grid, Box } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import WorkoutCard from "./WorkoutCard";
import Pagination from "@mui/material/Pagination";
import ContentFilter from "../ContentFilter";
import { errorToast, successToast } from "../../../service/toastify-service";

const WorkoutsList = ({
  showSearch,
  dataSourceSupplier,
  message,
  showLiked,
  onFeedsChange,
}) => {
  const [workoutsData, setWorkoutsData] = useState([]);
  const [filter, setFilter] = useState({ search: "", filterBy: "" });
  const userId = useSelector(
    (store) => store.authenticationSlice.userData?._id
  );
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const workoutsPerPage = 6;
  const indexOfLastWorkout = currentPage * workoutsPerPage;
  const indexOfFirstWorkout = indexOfLastWorkout - workoutsPerPage;

  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        const workouts = await dataSourceSupplier(userId, filter);
        setWorkoutsData(workouts);
        onFeedsChange(workouts.length);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        errorToast("Something went wrong. Could not fetch the workouts.");
      }
    };
    fetchWorkoutData();
  }, [dataSourceSupplier, userId, filter, onFeedsChange]);

  const handleDeleteWorkout = async (_id) => {
    try {
      await axios.delete(`/workouts/${_id}`);
      setWorkoutsData((prevWorkouts) =>
        prevWorkouts.filter((workout) => workout._id !== _id)
      );
      successToast("Workout deleted successfully!");
    } catch (err) {
      // console.log(err);
      errorToast("Something went wrong. Could not delete workout.");
    }
  };

  const handleLikeWorkout = async (_id) => {
    try {
      const { data } = await axios.patch(`/workouts/${_id}`);
      if (showLiked) {
        setWorkoutsData((prev) =>
          prev.filter((workout) => workout._id !== _id)
        );
      } else {
        setWorkoutsData((prevWorkouts) =>
          prevWorkouts.map((workout) =>
            workout._id === _id
              ? { ...workout, ...data.workoutDetails }
              : workout
          )
        );
      }
    } catch (err) {
      // console.log(err);
      errorToast("Something went wrong. Could not like the workout.");
    }
  };

  const paginate = (event, page) => {
    setCurrentPage(page);
  };

  const updateWorkouts = (newWorkouts, userData) => {
    setWorkoutsData(newWorkouts);
  };

  const updateFilter = (filter) => {
    setFilter(filter);
  };

  return (
    <>
      {isLoading && (
        <Grid item xs={8} md={8}>
          {" "}
          <CircularProgress color="inherit" />
          <Typography
            variant="body2"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Fetching {message}
          </Typography>
        </Grid>
      )}
      {!isLoading && workoutsData.length <= 0 && (
        <Grid item xs={8} md={8}>
          <Typography
            variant="body1"
            style={{
              fontFamily: "Montserrat, sans-serif",
              textAlign: "center",
            }}
          >
            You don't have any {message}
          </Typography>
        </Grid>
      )}
      {!isLoading && workoutsData.length > 0 && (
        <ContentFilter
          onUpdateWorkouts={updateWorkouts}
          onUpdateFilter={updateFilter}
          showSearch={showSearch}
        />
      )}
      {workoutsData
        .slice(indexOfFirstWorkout, indexOfLastWorkout)
        .map((workout) => (
          <Grid item xs={8} md={8} key={workout._id}>
            <WorkoutCard
              workout={workout}
              userData={workout.userData}
              onDeleteWorkout={handleDeleteWorkout}
              onLikeWorkout={handleLikeWorkout}
              isLiked={workout.isLiked}
            />
          </Grid>
        ))}
      {!isLoading && workoutsData.length > 0 && (
        <Grid
          item
          xs={8}
          md={8}
          style={{ display: "flex", justifyContent: "center", marginTop: 2 }}
        >
          <Pagination
            count={Math.ceil(workoutsData.length / workoutsPerPage)}
            onChange={paginate}
          />
        </Grid>
      )}
    </>
  );
};
export default WorkoutsList;
