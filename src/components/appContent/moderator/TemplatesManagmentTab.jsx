import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import { getDataAndUsers } from "../../../service/user-profile";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ROUTES } from "../../../routes/routes";
import { useNavigate } from "react-router-dom";
const columns = [
  { field: "id", headerName: "ID", width: 70 },

  {
    field: "name",
    headerName: "Template Name",
    width: 130,
    valueGetter: (params) => `${params.row.name}`,
  },

  {
    field: "exerises",
    headerName: "Exercises",
    type: "number",
    width: 90,
    valueGetter: (params) => `${params.row.exercises.length}`, //?? not sure if length will work here
  },
  {
    field: "user.name.userName",
    headerName: "Template Owner",
    valueGetter: (params) =>
      params.row.user.userName
        ? `${params.row.user.userName}`
        : "Deleted Account",
    width: 180,
  },
];
const TemplateManagmentTab = () => {
  //TODO add delete template, preview template
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const { data } = await axios.get("/templates");
        console.log(data);
        const { data: userData } = await axios.get("/users");
        console.log(userData);
        const templatesAndUsers = getDataAndUsers(
          userData.users,
          data.templates
        );
        setTemplates(templatesAndUsers);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTemplates();
  }, []);

  const handleRowClick = (params) => {
    console.log(params.row._id);
    setSelectedTemplate(
      params.row._id === selectedTemplate ? null : params.row._id
    );
  };

  const handleDeleteTemplate = async () => {
    try {
      const { data } = await axios.delete(`/templates/${selectedTemplate}`);
      console.log(data);
      setTemplates((prev) =>
        prev.filter((template) => template._id !== selectedTemplate)
      );
      setSelectedTemplate(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePreviewTemplate = () => {
    navigate(`${ROUTES.TEMPLATEPREVIEW}/${selectedTemplate}`);
  };
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={templates}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        selectedUser={selectedTemplate}
        onRowClick={handleRowClick}
        sx={{ fontFamily: "Montserrat, sans-serif" }}
      />
      {selectedTemplate && (
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 4, mb: 5 }}
          onClick={handleDeleteTemplate}
          endIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      )}
      {selectedTemplate && (
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 4, mb: 5, ml: 6 }}
          onClick={handlePreviewTemplate}
          endIcon={<VisibilityIcon />}
        >
          Preview
        </Button>
      )}
    </div>
  );
};
export default TemplateManagmentTab;
