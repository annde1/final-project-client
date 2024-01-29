import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import "../../../styles/styles.css";
const WorkoutCardData = ({ volume, sets }) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography className="customFont" sx={{ fontWeight: "bold" }}>
          Volume
        </Typography>
        <Typography className="customFont">{volume} kg</Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography className="customFont" sx={{ fontWeight: "bold" }}>
          Sets
        </Typography>
        <Typography className="customFont">{sets}</Typography>
      </Box>
    </>
  );
};
export default WorkoutCardData;
