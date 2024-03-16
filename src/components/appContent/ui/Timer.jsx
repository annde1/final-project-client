import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import "../../../styles/styles.css";
import { useEffect, useState } from "react";
const WorkoutTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((previous) => previous + 1);
      if (seconds === 59) {
        setSeconds(0);
        setMinutes((previous) => previous + 1);

        if (minutes === 59) {
          setMinutes(0);
          setHours((previous) => previous + 1);
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [minutes, seconds, hours]);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography className="customFont" sx={{ fontWeight: "bold" }}>
          Duration
        </Typography>
        <Typography className="customFont">
          {`${String(hours).padStart(2, "0")}:${String(minutes).padStart(
            2,
            "0"
          )}:${String(seconds).padStart(2, "0")}`}
        </Typography>
      </Box>
    </>
  );
};
export default WorkoutTimer;
