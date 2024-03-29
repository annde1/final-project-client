import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

const Follower = ({
  url,
  alt,
  username,
  isFollowing,
  userId,
  onUnfollow,
  onFollow,
}) => {
  const handleFollow = (_id) => {
    onFollow(_id);
  };
  const handleUnfollow = (_id) => {
    onUnfollow(_id);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar alt={alt} src={url} sx={{ marginRight: 3 }} />
          <NavLink
            to={`/user/${userId}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Typography
              variant="body1"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {username}
            </Typography>
          </NavLink>
        </Box>

        {isFollowing ? (
          <Button
            variant="text"
            startIcon={<PersonRemoveIcon />}
            style={{
              fontFamily: "Montserrat, sans-serif",
              color: "#0B0D12",
              textTransform: "none",
            }}
            onClick={() => {
              handleUnfollow(userId);
            }}
          ></Button>
        ) : (
          <Button
            variant="text"
            startIcon={<PersonAddAlt1Icon />}
            style={{
              fontFamily: "Montserrat, sans-serif",
              color: "#0B0D12",
              textTransform: "none",
            }}
            onClick={() => {
              handleFollow(userId);
            }}
          ></Button>
        )}
      </Box>
    </>
  );
};
export default Follower;
