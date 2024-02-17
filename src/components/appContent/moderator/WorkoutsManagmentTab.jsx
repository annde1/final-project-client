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
import { errorToast, infoToast } from "../../../service/toastify-service";
import ModeratorModal from "./ModeratorModal";
import LinearProgress from "@mui/material/LinearProgress";

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
    valueGetter: (params) => `${params.row.template.exercises.length}`,
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
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const { data } = await axios.get("/workouts");
        const { data: userData } = await axios.get("/users");
        const workoutsData = getDataAndUsers(userData.users, data.workouts);
        setWorkouts(workoutsData);
        setIsLoading(false);
      } catch (err) {
        // console.log(err);
        errorToast("Something went wrong. Could not fetch the data.");
      }
    };
    fetchWorkouts();
  }, []);

  const handleRowClick = (params) => {
    console.log(params.row._id);
    setSelectedWorkout(
      params.row._id === selectedWorkout ? null : params.row._id
    );
  };
  const handleDeleteWorkout = async () => {
    try {
      await axios.delete(`/workouts/${selectedWorkout}`);
      setWorkouts((prev) =>
        prev.filter((workout) => workout._id !== selectedWorkout)
      );
      setSelectedWorkout(null);
      infoToast("Workout deleted");
      setShowModal(false);
    } catch (err) {
      // console.log(err);
      if (err.response && err.response.status === 404) {
        errorToast(
          "Workout not found. The workout was probably deleted by the user"
        );
      } else {
        errorToast("Something went wrong. Could not delete the workout.");
      }
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div style={{ height: 500, width: "100%" }}>
      {isLoading ? (
        <LinearProgress sx={{ mt: 3 }} />
      ) : (
        <>
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
              onClick={handleOpenModal}
            >
              Delete Workout
            </Button>
          )}
        </>
      )}
      {showModal && (
        <ModeratorModal
          dataSourceSupplier={handleDeleteWorkout}
          action="workout"
          open={showModal}
          onCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};
export default WorkoutsManagmentTab;
