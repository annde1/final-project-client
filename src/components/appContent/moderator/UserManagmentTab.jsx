import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "image.url",
    headerName: "Profile Image",
    width: 130,
    sortable: false,
    renderCell: (params) => <Avatar src={params.row.image.url} alt="avatar" />,
  },
  {
    field: "name.firstName",
    headerName: "First name",
    width: 130,
    valueGetter: (params) => `${params.row.name.firstName}`,
  },

  {
    field: "name.lastName",
    headerName: "Last name",
    width: 130,
    valueGetter: (params) => `${params.row.name.lastName}`,
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

  const handleRowClick = (params) => {
    console.log(params.row._id);
    setSelectedUser(params.row._id === selectedUser ? null : params.row._id);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get("/users");
      console.log(data);
      const usersWithIds = data.users.map((user, index) => ({
        ...user,
        id: index + 1,
      }));
      setUsers(usersWithIds);
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const { data } = await axios.delete(`/users/${selectedUser}`);
      console.log(data);
      console.log("USER DELETED");
      setUsers((prev) => prev.filter((user) => user._id !== selectedUser));
      setSelectedUser(null);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ height: 500, width: "100%" }}>
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
          sx={{ mt: 4, mb: 5 }}
          onClick={handleDeleteUser}
        >
          Delete User
        </Button>
      )}
    </div>
  );
};
export default UserManagmentTab;
