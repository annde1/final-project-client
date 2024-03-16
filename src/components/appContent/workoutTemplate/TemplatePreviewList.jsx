import TemplatePreviewItem from "./TemplatePreviewItem";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { errorToast } from "../../../service/toastify-service";
const TemplatePreviewList = ({
  onChangeTemplateName,
  onChangeTemplateImage,
}) => {
  const [templateData, setTemplateData] = useState([]);
  const { id: _id } = useParams();

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const { data } = await axios.get(`/templates/${_id}`);
        setTemplateData(data.templateDetails);
        onChangeTemplateName(data.templateDetails.name);
        onChangeTemplateImage(data.templateDetails.image);
      } catch (err) {
        // console.log(err);
        errorToast("Something went wrong. Could not fetch the template data.");
      }
    };
    fetchTemplateData();
  }, [_id, onChangeTemplateName, onChangeTemplateImage]);

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
