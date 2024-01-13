import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import ExericseList from "../components/ExerciseList";
import { useState } from "react";
import TemplateContent from "../components/templateContent";
import Button from "@mui/material/Button";
import TemplateItem from "../components/templateContent";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";
import "../styles/styles.css";

const WorkoutTimer = ({ hours, minutes, seconds }) => {
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
