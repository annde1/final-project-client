import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Follower from "../components/Follower";
const SocialPage = () => {
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [numFollowing, setNumFollowing] = useState(3);
  const [numFollowers, setNumFollowers] = useState(3);
  const [showMessageFollowers, setShowMessageFollowers] = useState(false);
  const [showMessageFollowing, setShowMessageFollowing] = useState(false);
  const userId = useSelector(
    (store) => store.authenticationSlice.userData?._id
  );

  useEffect(() => {
    const fetchFollowingData = async () => {
      try {
        //Fetch following users
        const { data } = await axios.get(`/users/following`);
        const updatedData = data.following.map((user) => ({
          ...user,
          isFollowing: true,
        }));
        setFollowing(updatedData);

        //Fetch followers
        const { data: followersData } = await axios.get(`/users/followers`);
        setFollowers(
          followersData.followers.map((user) => ({
            ...user,
            isFollowing: user.followers.includes(userId),
          }))
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchFollowingData();
  }, [userId]);

  const handleFollow = async (_id) => {
    try {
      const { data } = await axios.patch(`/users/follow/${_id}`);
      console.log("Handle Follow Data: ", data);
      const newFollowerDetails = {
        ...data.followerDetails,
        isFollowing: true,
      };
      setFollowing((prevFollowing) => [...prevFollowing, newFollowerDetails]);
      setFollowers((prevFollowers) =>
        prevFollowers.map((follower) =>
          follower._id === _id ? { ...follower, isFollowing: true } : follower
        )
      );
    } catch (err) {
      console.log(err);
    }
  };
  const handleUnfollow = async (_id) => {
    try {
      await axios.patch(`/users/follow/${_id}`);
      setFollowing((previousFollowing) =>
        previousFollowing.filter((user) => user._id !== _id)
      );
      setFollowers((prevFollowers) =>
        prevFollowers.map((follower) =>
          follower._id === _id ? { ...follower, isFollowing: false } : follower
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleSeeMoreFollowing = () => {
    if (numFollowing < following.length) {
      setNumFollowing((prev) => Math.min(prev + 3, following.length));
    } else {
      setShowMessageFollowing(true);
    }
  };

  const handleSeeMoreFollowers = () => {
    if (numFollowers < followers.length) {
      setNumFollowers((prev) => Math.min(prev + 3, followers.length));
    } else {
      setShowMessageFollowers(true);
    }
  };
  return (
    <>
      <Typography variant="h4" style={{ fontFamily: "Montserrat, sans-serif" }}>
        Social
      </Typography>
      <Container component="main" maxWidth="md" sx={{ marginTop: 8 }}>
        <Typography
          variant="h6"
          style={{ fontFamily: "Montserrat, sans-serif", marginBottom: "2rem" }}
        >
          Following
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {following.slice(0, numFollowing).map((user) => (
            <Grid item xs={12} md={8} key={user._id}>
              <Follower
                url={user.image.url}
                alt={user.image.alt}
                username={user.userName}
                isFollowing={user.isFollowing}
                onUnfollow={handleUnfollow}
                userId={user._id}
              />
            </Grid>
          ))}
        </Grid>
        {!showMessageFollowing ? (
          <Button
            variant="text"
            style={{
              fontFamily: "Montserrat, sans-serif",
              marginTop: "2rem",
              color: "#0B0D12",
              fontWeight: "bold",
            }}
            onClick={handleSeeMoreFollowing}
          >
            {" "}
            See more
          </Button>
        ) : (
          <Typography
            variant="body2"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: "bold",
              marginTop: "3rem",
            }}
          >
            No more following to show!
          </Typography>
        )}

        <Typography
          variant="h6"
          style={{
            fontFamily: "Montserrat, sans-serif",
            marginTop: "3rem",
            marginBottom: "2rem",
          }}
        >
          Followers
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {followers.slice(0, numFollowers).map((user) => (
            <Grid item xs={12} md={8} key={user._id}>
              <Follower
                url={user.image.url}
                alt={user.image.alt}
                username={user.userName}
                isFollowing={user.isFollowing}
                onUnfollow={handleUnfollow}
                onFollow={handleFollow}
                userId={user._id}
              />
            </Grid>
          ))}
        </Grid>
        {!showMessageFollowers ? (
          <Button
            variant="text"
            style={{
              fontFamily: "Montserrat, sans-serif",
              marginTop: "2rem",
              color: "#0B0D12",
              fontWeight: "bold",
            }}
            onClick={handleSeeMoreFollowers}
          >
            {" "}
            See more
          </Button>
        ) : (
          <Typography
            variant="body2"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: "bold",
              marginTop: "3rem",
            }}
          >
            No more followers to show
          </Typography>
        )}
      </Container>
    </>
  );
};
export default SocialPage;
