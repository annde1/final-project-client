import { Typography, Button } from "@mui/material";
import Follower from "./Follower";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const FollowersTab = () => {
  const [followers, setFollowers] = useState([]);
  const [numFollowers, setNumFollowers] = useState(3);
  const [showMessage, setShowMessage] = useState(false);
  const userId = useSelector(
    (store) => store.authenticationSlice.userData?._id
  );
  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const { data } = await axios.get(`/users/followers`);
        setFollowers(
          data.followers.map((user) => ({
            ...user,
            isFollowing: user.followers.includes(userId),
          }))
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchFollowers();
  }, [userId]);

  const handleFollow = async (_id) => {
    try {
      const { data } = await axios.patch(`/users/follow/${_id}`);
      console.log(data);

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
      const { data } = await axios.patch(`/users/follow/${_id}`);
      console.log(data);
      setFollowers((prevFollowers) =>
        prevFollowers.map((follower) =>
          follower._id === _id ? { ...follower, isFollowing: false } : follower
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleSeeMore = () => {
    if (numFollowers < followers.length) {
      setNumFollowers((prev) => Math.min(prev + 3, followers.length));
    } else {
      setShowMessage(true);
    }
  };
  return (
    <>
      {followers.slice(0, numFollowers).map((follower) => (
        <Follower
          userId={follower._id}
          url={follower.image.url}
          alt={follower.image.alt}
          username={follower.userName}
          isFollowing={follower.isFollowing}
          isFollowersTab={true}
          onUnfollowFollower={handleUnfollow}
          onFollow={handleFollow}
        />
      ))}
      {!showMessage ? (
        <Button variant="outlined" onClick={handleSeeMore}>
          See More
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
    </>
  );
};
export default FollowersTab;
