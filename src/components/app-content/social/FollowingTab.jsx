import { Typography, Button } from "@mui/material";
import Follower from "./Follower";
import { useEffect, useState } from "react";
import axios from "axios";

const FollowingTab = () => {
  const [following, setFollowing] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [numFollowing, setNumFollowing] = useState(3);
  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const { data } = await axios.get(`/users/following`);
        const updatedData = data.following.map((user) => ({
          ...user,
          isFollowing: true,
        }));
        setFollowing(updatedData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFollowing();
  }, []);

  useEffect(() => {
    console.log(following);
  }, [following]);
  const handleUnfollow = async (_id) => {
    try {
      const { data } = await axios.patch(`/users/follow/${_id}`);
      console.log(data);
      setFollowing((previousFollowing) =>
        previousFollowing.filter((user) => user._id !== _id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleSeeMore = () => {
    if (numFollowing < following.length) {
      setNumFollowing((prev) => Math.min(prev + 3, following.length));
    } else {
      setShowMessage(true);
    }
  };
  return (
    <>
      {following.slice(0, numFollowing).map((user) => (
        <Follower
          url={user.image.url}
          alt={user.image.alt}
          username={user.userName}
          isFollowing={user.isFollowing}
          onUnfollow={handleUnfollow}
          userId={user._id}
          onUnfollowFollowing={handleUnfollow}
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
          No more following to show
        </Typography>
      )}
    </>
  );
};
export default FollowingTab;
