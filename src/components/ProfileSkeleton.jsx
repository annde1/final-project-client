import Typography from "@mui/material/Typography";
import { Box, Grid, Container, Button } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const ProfileSkeleton = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack spacing={2}>
          <Skeleton variant="circular" width={100} height={100} />
          <Skeleton variant="rectangular" width={100} height={20} />
          <Skeleton
            variant="rectangular"
            width={90}
            height={15}
            sx={{ alignSelf: "center" }}
          />
        </Stack>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mt: 5,
        }}
      >
        <Skeleton variant="rectangular" width={100} height={20} />
        <Skeleton variant="rectangular" width={100} height={20} />
        <Skeleton variant="rectangular" width={100} height={20} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <Skeleton
          variant="rectangular"
          width={150}
          height={35}
          sx={{ borderRadius: "10px" }}
        />
      </Box>
    </>
  );
};
export default ProfileSkeleton;
