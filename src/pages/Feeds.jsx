import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import WorkoutCard from "../components/app-content/workout/WorkoutCard";
const FeedsPage = () => {
  const [feeds, setFeeds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector(
    (store) => store.authenticationSlice.userData?._id
  );

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const { data } = await axios.get("/workouts/feeds");
        const { data: users } = await axios.get("/users/following");
        const feedsAndUsers = data.feeds.map((feed) => ({
          ...feed,
          isLiked: feed.likes.includes(userId),
          userData: users.following.find((user) => user._id === feed.userId),
        }));
        setFeeds(feedsAndUsers);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFeeds();
  }, [userId]);

  const handleLikeWorkout = async (_id) => {
    try {
      const { data } = await axios.patch(`/workouts/${_id}`);
      setFeeds((prevFeeds) =>
        prevFeeds.map((feed) =>
          feed._id === _id ? { ...feed, ...data.workoutDetails } : feed
        )
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Typography variant="h4" style={{ fontFamily: "Montserrat, sans-serif" }}>
        Feeds
      </Typography>
      <Container component="main" maxWidth="md" sx={{ marginTop: 5 }}>
        {isLoading && (
          <Box>
            <CircularProgress color="inherit" sx={{ mb: 2 }} />
            <Typography
              variant="body1"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Fetching Feeds
            </Typography>
          </Box>
        )}
        {feeds.length === 0 && !isLoading && (
          <Typography
            variant="boudy1"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            No feeds to display
          </Typography>
        )}
        <Grid container spacing={2} justifyContent="center">
          {feeds.map((feed) => (
            <Grid item xs={8} md={8} key={feed._id}>
              <WorkoutCard
                workout={feed}
                userData={feed.userData}
                isLiked={feed.isLiked}
                onLikeWorkout={handleLikeWorkout}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
export default FeedsPage;
