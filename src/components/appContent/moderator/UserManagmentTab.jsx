import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { errorToast, infoToast } from "../../../service/toastify-service";
import ModeratorModal from "./ModeratorModal";
import LinearProgress from "@mui/material/LinearProgress";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "image.url",
    headerName: "Profile Image",
    width: 130,
    sortable: false,
    renderCell: (params) => <Avatar src={params.row.file} alt="avatar" />,
  },
  {
    field: "name.firstName",
    headerName: "First name",
    width: 130,
    valueGetter: (params) => `${params.row.firstName}`,
  },

  {
    field: "name.lastName",
    headerName: "Last name",
    width: 130,
    valueGetter: (params) => `${params.row.lastName}`,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "userName",
    headerName: "User name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) => `${params.row.userName}`,
  },
];

const UserManagmentTab = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get("/users");
      const usersWithIds = data.users.map((user, index) => ({
        ...user,
        id: index + 1,
      }));
      setUsers(usersWithIds);
      setIsLoading(false);
    };
    fetchUsers();
  }, []);

  const handleRowClick = (params) => {
    setSelectedUser(params.row._id === selectedUser ? null : params.row._id);
  };

  const handleOpenModal = () => {
    setShowConfirmationModal(true);
  };
  const handleCloseModal = () => {
    setShowConfirmationModal(false);
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`/users/${selectedUser}`);
      setUsers((prev) => prev.filter((user) => user._id !== selectedUser));
      setSelectedUser(null);
      infoToast(`User deleted.`);
      setShowConfirmationModal(false);
    } catch (err) {
      //   console.log(err);
      if (err.response && err.response.status === 404) {
        errorToast("User not found. The account probably deleted by the user.");
      } else {
        errorToast("Something went wrong. Could not delete user");
      }
    }
  };
  return (
    <div style={{ height: 500, width: "100%" }}>
      {showConfirmationModal && (
        <ModeratorModal
          open={showConfirmationModal}
          onCloseModal={handleCloseModal}
          selectedUser={selectedUser}
          dataSourceSupplier={handleDeleteUser}
          action="user"
        />
      )}
      {isLoading ? (
        <LinearProgress sx={{ mt: 3 }} />
      ) : (
        <>
          <DataGrid
            rows={users}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
            selectedUser={selectedUser}
            onRowClick={handleRowClick}
            sx={{ fontFamily: "Montserrat, sans-serif" }}
          />
          {selectedUser && (
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 4, mb: 5, fontFamily: "Montserrat, sans-serif" }}
              onClick={handleOpenModal}
            >
              Delete User
            </Button>
          )}
        </>
      )}
    </div>
  );
};
export default UserManagmentTab;
