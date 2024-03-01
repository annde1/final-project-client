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
import LinearProgress from "@mui/material/LinearProgress";
import ModeratorModal from "./ModeratorModal";
import { errorToast, infoToast } from "../../../service/toastify-service";
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
    valueGetter: (params) => `${params.row.exercises.length}`,
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
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const { data } = await axios.get("/templates");
        const { data: userData } = await axios.get("/users");
        const templatesAndUsers = getDataAndUsers(
          userData.users,
          data.templates
        );
        setTemplates(templatesAndUsers);
        setIsLoading(false);
      } catch (err) {
        // console.log(err);
        errorToast("Something went wrong. Could not fetch the templates.");
      }
    };

    fetchTemplates();
  }, []);

  const handleRowClick = (params) => {
    setSelectedTemplate(
      params.row._id === selectedTemplate ? null : params.row._id
    );
  };

  const handleDeleteTemplate = async () => {
    try {
      await axios.delete(`/templates/${selectedTemplate}`);
      setTemplates((prev) =>
        prev.filter((template) => template._id !== selectedTemplate)
      );
      setSelectedTemplate(null);
      infoToast("Template Deleted");
      setShowConfirmationModal(false);
    } catch (err) {
      // console.log(err);
      if (err.response && err.response.status === 404) {
        errorToast(
          "Template not found. The template was probably deleted by the user"
        );
      } else {
        errorToast("Something went wrong. Could not delete the template.");
      }
    }
  };
  const handleShowModal = () => {
    setShowConfirmationModal(true);
  };

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
  };
  const handlePreviewTemplate = () => {
    navigate(`${ROUTES.TEMPLATEPREVIEW}/${selectedTemplate}`);
  };
  return (
    <div style={{ height: 500, width: "100%" }}>
      {showConfirmationModal && (
        <ModeratorModal
          open={showConfirmationModal}
          onCloseModal={handleCloseModal}
          action="template"
          dataSourceSupplier={handleDeleteTemplate}
        />
      )}
      {isLoading ? (
        <LinearProgress sx={{ mt: 3 }} />
      ) : (
        <>
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
              endIcon={<DeleteIcon />}
              onClick={handleShowModal}
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
        </>
      )}
    </div>
  );
};
export default TemplateManagmentTab;
