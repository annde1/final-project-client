import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProfileSkeleton from "../components/appContent/userProfile/ProfileSkeleton";
import { UserProfile } from "../components/appContent/userProfile/UserProfile";
import { useSelector } from "react-redux";
import WorkoutsList from "../components/appContent/workout/WorkoutsList";
import { errorToast } from "../service/toastify-service";

const UserProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
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
        //Get user data
        const { data } = await axios.get(`/users/${_id}`);
        //Get their workouts (feeds)
        const { data: feeds } = await axios.get("/workouts/feeds");
        //Filter out those belonging to he user
        const userWorkouts = feeds.feeds.filter((feed) => feed.userId === _id);
        //Update the userData state
        setUserData(data.userData);
        //Update isFollowing state
        setIsFollowing(data.userData.followers.includes(userId));
        //Update workouts state
        setUserWorkouts(userWorkouts);
        setIsLoading(false);
      } catch (err) {
        // console.log(err);
        errorToast(
          "Something went wrong. Could not fetch the user's profile information."
        );
      }
    };
    fetchUserData();
  }, [_id, userId]);

  return (
    <>
      <Box>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
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
                  isOwner={false}
                />
              ) : (
                <Typography
                  variant="subtitle2"
                  sx={{ fontFamily: "Montserrat", mb: 8 }}
                >
                  Follow the user to see their workouts
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
