import Typography from "@mui/material/Typography";
import { Grid, Container, Box } from "@mui/material";
import WorkoutsList from "../components/appContent/workout/WorkoutsList";

import axios from "axios";

const FeedsPage = () => {
  const fetchFeedWorkoutsData = async (userId, filter) => {
    const orderBy = filter?.filterBy;
    const userName = filter?.search ? filter?.search : "";

    console.log(filter);
    // This is an input data
    const { data } = await axios.get(
      `/workouts/feeds?filter=${orderBy}&userName=${userName}`
    );

    // This is enrichment data
    const { data: users } = await axios.get("/users/following");
    const dataSource = data.feeds.map((feed) => ({
      ...feed,
      isLiked: feed.likes.includes(userId),
      userData: users.following.find((user) => user._id === feed.userId),
    }));
    return dataSource;
  };

  return (
    <>
      <Box sx={{ pb: 5, height: "100vh" }}>
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
              showSearch={true}
            />
          </Grid>
        </Container>
      </Box>
    </>
  );
};
export default FeedsPage;
