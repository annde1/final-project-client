import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import ProfileSkeleton from "../components/ProfileSkeleton";
import { UserProfile } from "../components/UserProfile";
import { useSelector } from "react-redux";
import WorkoutsList from "../components/appContent/workout/WorkoutsList";
const UserProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingWorkouts, setIsLoadingWorkouts] = useState(true);
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [updatedWorkouts, setUpdatedWorkouts] = useState([]);
  const { id: _id } = useParams();
  const userId = useSelector(
    (store) => store.authenticationSlice.userData?._id
  );

  const fetchWorkoutsData = async (userId, filter) => {
    const orderBy = filter?.filterBy;

    const { data } = await axios.get(`/workouts/${_id}?filter=${orderBy}`);

    const { data: userData } = await axios.get(`/users/${_id}`);
    const updatedWorkouts = data.workouts.map((workout) => ({
      ...workout,
      isLiked: workout.likes.includes(userId),
      userData: userData.userData,
    }));
    return updatedWorkouts;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(`/users/${_id}`);
        console.log(data);

        const { data: feeds } = await axios.get("/workouts/feeds");
        const userWorkouts = feeds.feeds.filter((feed) => feed.userId === _id);
        console.log("before setting", data.userData);
        setUserData(data.userData);
        console.log(data.userData.followers.includes(userId));
        setIsFollowing(data.userData.followers.includes(userId));
        setUserWorkouts(userWorkouts);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, [_id, userId]);
  return (
    <>
      <Box sx={{ height: isFollowing ? "100%" : "100vh" }}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2}>
              {isLoading ? (
                <Grid item xs={12} sm={12}>
                  {" "}
                  <ProfileSkeleton />
                </Grid>
              ) : (
                <>
                  <Grid item xs={12} sm={12}>
                    <UserProfile
                      userData={userData}
                      workouts={userWorkouts}
                      following={userData.following?.length}
                      followers={userData.followers?.length}
                      isUser={false}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}></Grid>
                </>
              )}
            </Grid>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
              }}
            >
              {isFollowing ? (
                <WorkoutsList
                  dataSourceSupplier={fetchWorkoutsData}
                  message="workouts"
                />
              ) : (
                <Typography
                  variant="subtitle2"
                  sx={{ fontFamily: "Montserrat" }}
                >
                  Follow the user to see theit workouts
                </Typography>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default UserProfilePage;
