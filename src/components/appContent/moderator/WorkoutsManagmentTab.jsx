import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import { getDataAndUsers } from "../../../service/user-profile";
import "../../../styles/styles.css";
import moment from "moment";
import { convertMsToHoursAndMinutes } from "../../../service/workout-service";
const columns = [
  { field: "id", headerName: "ID", width: 70 },

  {
    field: "title",
    headerName: "Template Name",
    width: 130,
    valueGetter: (params) => `${params.row.title}`,
  },

  {
    field: "template.exercises",
    headerName: "Exercises",
    type: "number",
    width: 90,
    valueGetter: (params) => `${params.row.template.exercises.length}`, //?? not sure if length will work here
  },
  {
    field: "user.userName",
    headerName: "Workout Owner",
    valueGetter: (params) =>
      params.row.user.userName
        ? `${params.row.user.userName}`
        : "Deleted Account",
    width: 180,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    valueGetter: (params) =>
      `${moment(params.row.createdAt).format("DD-MM-YYYY")}`,
    width: 180,
    sortable: true,
  },
  {
    field: "duration",
    headerName: "Workout Duration",
    valueGetter: (params) => {
      const { hours, minutes } = convertMsToHoursAndMinutes(
        params.row.duration
      );
      return `${hours}h ${minutes} min`;
    },
    width: 180,
    sortable: true,
  },
];

const WorkoutsManagmentTab = () => {
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const { data } = await axios.get("/workouts");

        const { data: userData } = await axios.get("/users");
        const workoutsData = getDataAndUsers(userData.users, data.workouts);
        setWorkouts(workoutsData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchWorkouts();
  }, []);
  useEffect(() => {
    console.log(workouts);
  }, [workouts]);

  const handleRowClick = (params) => {
    console.log(params.row._id);
    setSelectedWorkout(
      params.row._id === selectedWorkout ? null : params.row._id
    );
  };
  const handleDeleteWorkout = async () => {
    try {
      const { data } = await axios.delete(`/workouts/${selectedWorkout}`);
      console.log(data);
      console.log("WORKOUT DELETED!");
      setWorkouts((prev) =>
        prev.filter((workout) => workout._id !== selectedWorkout)
      );
      setSelectedWorkout(null);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={workouts}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        selectedWorkout={selectedWorkout}
        onRowClick={handleRowClick}
        pageSizeOptions={[5, 10, 20]}
        sx={{ fontFamily: "Montserrat, sans-serif" }}
      />
      {selectedWorkout && (
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 4, mb: 5 }}
          onClick={handleDeleteWorkout}
        >
          Delete Workout
        </Button>
      )}
    </div>
  );
};
export default WorkoutsManagmentTab;
