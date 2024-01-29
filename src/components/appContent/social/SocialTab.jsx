import { Typography, Button, CircularProgress } from "@mui/material";
import Follower from "./Follower";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const SocialTab = ({ isFollowersTab }) => {
  const [socialData, setSocialData] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [numItems, setNumItems] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  const userId = useSelector(
    (store) => store.authenticationSlice.userData?._id
  );

  useEffect(() => {
    const fetchSocialData = async () => {
      try {
        const endpoint = isFollowersTab
          ? "/users/followers"
          : "/users/following";

        const { data } = await axios.get(endpoint);
        const socialDataArr = isFollowersTab ? data.followers : data.following;

        setSocialData(
          socialDataArr.map((item) => ({
            ...item,
            isFollowing: isFollowersTab
              ? item.followers.includes(userId)
              : true,
          }))
        );
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSocialData();
  }, [isFollowersTab, userId]);

  const handleFollow = async (_id) => {
    try {
      const { data } = await axios.patch(`/users/follow/${_id}`);
      console.log(data);

      setSocialData((prevData) =>
        prevData.map((item) =>
          item._id === _id ? { ...item, isFollowing: true } : item
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async (_id) => {
    try {
      console.log("UNFOLLOWING");
      const { data } = await axios.patch(`/users/follow/${_id}`);
      console.log(data);

      setSocialData((prevData) => prevData.filter((user) => user._id !== _id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSeeMore = () => {
    if (numItems < socialData.length) {
      setNumItems((prev) => Math.min(prev + 3, socialData.length));
    } else {
      setShowMessage(true);
    }
  };
  return (
    <>
      {isLoading && (
        <>
          <CircularProgress color="inherit" />
          <Typography variant="body1">Fetching data</Typography>
        </>
      )}
      {!isLoading && socialData.length > 0 && (
        <>
          {socialData.slice(0, numItems).map((item) => (
            <Follower
              key={item._id}
              userId={item._id}
              url={item.image.url}
              alt={item.image.alt}
              username={item.userName}
              isFollowing={item.isFollowing}
              onUnfollow={handleUnfollow}
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
              No more items to show
            </Typography>
          )}
        </>
      )}
      {!isLoading && socialData.length === 0 && (
        <Typography
          variant="body2"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "bold",
            marginTop: "3rem",
          }}
        >
          {isFollowersTab ? "No followers." : "You don't follow anyone."}
        </Typography>
      )}
    </>
  );
};
export default SocialTab;
