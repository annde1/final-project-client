import { Typography, Button, CircularProgress } from "@mui/material";
import Follower from "./Follower";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { errorToast, infoToast } from "../../../service/toastify-service";

const SocialTab = ({ isFollowersTab }) => {
  const [socialData, setSocialData] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [numItems, setNumItems] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector(
    (store) => store.authenticationSlice.userData?._id
  );

  //Fetching social data when the component mounts
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
        // console.log(err);
        errorToast("Something went wrong. Could not fetch the social data.");
      }
    };
    fetchSocialData();
  }, [isFollowersTab, userId]);

  const handleFollow = async (_id) => {
    try {
      await axios.patch(`/users/follow/${_id}`);
      setSocialData((prevData) =>
        prevData.map((item) =>
          item._id === _id ? { ...item, isFollowing: true } : item
        )
      );
      infoToast("User followed");
    } catch (err) {
      // console.log(err);
      errorToast("Sonething went wrong. Could not follow.");
    }
  };

  const handleUnfollow = async (_id) => {
    try {
      await axios.patch(`/users/follow/${_id}`);
      if (isFollowersTab) {
        setSocialData((prevData) =>
          prevData.map((user) =>
            user._id === _id
              ? { ...user, isFollowing: !user.isFollowing }
              : user
          )
        );
        infoToast("User unfollowed");
        return;
      }
      setSocialData((prevData) => prevData.filter((user) => user._id !== _id));
      infoToast("User unfollowed");
    } catch (err) {
      // console.log(err);
      errorToast("Something went wrong. Could not unfollow.");
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
              url={item.file}
              alt={item.alt}
              username={item.userName}
              isFollowing={item.isFollowing}
              onUnfollow={handleUnfollow}
              onFollow={handleFollow}
            />
          ))}
          {!showMessage ? (
            <Button
              variant="contained"
              onClick={handleSeeMore}
              sx={{
                bgcolor: "#0B0D12",
                fontFamily: "Montserrat, sans-serif",
                "&:hover": {
                  bgcolor: "#393A3E",
                },
              }}
            >
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
