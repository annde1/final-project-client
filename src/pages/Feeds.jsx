import Typography from "@mui/material/Typography";
import { Grid, Container, Box } from "@mui/material";
import WorkoutsList from "../components/appContent/workout/WorkoutsList";
import ContentFilter from "../components/appContent/ContentFilter";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const FeedsPage = () => {
  const userId = useSelector(
    (store) => store.authenticationSlice.userData?._id
  );
  const [feedsAndUsers, setFeedsAndUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFeedWorkoutsData = async (userId) => {
    const { data } = await axios.get("/workouts/feeds");
    const { data: users } = await axios.get("/users/following");
    const dataSource = data.feeds.map((feed) => ({
      ...feed,
      isLiked: feed.likes.includes(userId),
      userData: users.following.find((user) => user._id === feed.userId),
    }));
    return dataSource;
  };

  // useEffect(() => {

  //     setIsLoading(false);
  //     setFeedsAndUsers(dataSource);
  //   };

  //   fetchFeedWorkoutsData();
  // }, [userId]);

  return (
    <>
      <Box sx={{ pb: 5 }}>
        <Typography
          variant="h4"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Feeds
        </Typography>
        <Container component="main" maxWidth="md" sx={{ marginTop: 5 }}>
          <Grid container spacing={2} justifyContent="center">
            <WorkoutsList
              message="feeds"
              dataSourceSupplier={fetchFeedWorkoutsData}
            />
          </Grid>
        </Container>
      </Box>
    </>
  );
};
export default FeedsPage;
