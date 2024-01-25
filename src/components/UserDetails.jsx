import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import { useSelector } from "react-redux";
const UserDetails = ({ userName, createdAt, image }) => {
  const isPremium = useSelector(
    (store) => store.authenticationSlice.userData?.isPremium
  );
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Avatar
          sx={{ width: "60px", height: "60px", marginRight: "2rem" }}
          src={image.url}
          alt={image.alt}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {userName}
            </Typography>
          </Box>

          <Typography
            variant="subtitle2"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {createdAt}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
export default UserDetails;
