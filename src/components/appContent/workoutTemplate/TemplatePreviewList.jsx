import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import TemplatePreviewItem from "./TemplatePreviewItem";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Test from "../../Test";
const TemplatePreviewList = ({ onChangeTemplateName }) => {
  const [templateData, setTemplateData] = useState([]);
  const { id: _id } = useParams();

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const { data } = await axios.get(`/templates/${_id}`);
        console.log(data);
        setTemplateData(data.templateDetails);
        onChangeTemplateName(data.templateDetails.name);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTemplateData();
  }, [_id, onChangeTemplateName]);
  useEffect(() => {
    console.log(templateData);
  }, [templateData]);
  return (
    <>
      {templateData.exercises?.map((exercise) => (
        <TemplatePreviewItem
          exerciseName={exercise.name}
          sets={exercise.sets}
        />
      ))}
    </>
  );
};
export default TemplatePreviewList;
