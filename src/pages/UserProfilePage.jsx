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

  const fetchWorkoutsData = async (userId) => {
    const { data } = await axios.get("/workouts/my-workouts"); // TODO: Fetch fields
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
      <Box sx={{ height: "100%" }}>
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
                  <Grid item xs={12} sm={12}>
                    <WorkoutsList
                      dataSourceSupplier={fetchWorkoutsData}
                      message="workouts"
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default UserProfilePage;
