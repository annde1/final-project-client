import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TemplateCardExercise from "./TemplateCardExercise";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useAnimation } from "framer-motion";
import { useEffect } from "react";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function TemplateCard({
  templateName,
  exercises,
  templateImage,
  templateDescription,
  templateId,
  onEditTemplate,
  onStartWorkout,
  onShowModal,
  userId,
  isHomePage,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const ownerId = useSelector(
    (store) => store.authenticationSlice.userData?._id
  );
  const controls = useAnimation();
  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    });
  }, [controls]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleOpenModal = () => {
    onShowModal(templateId);
  };
  return (
    <motion.div
      className="box"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Card>
        <CardHeader
          title={templateName}
          titleTypographyProps={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        />
        <CardMedia
          component="img"
          height="194"
          image={templateImage}
          alt="Paella dish"
        />
        <CardActions disableSpacing>
          {ownerId === userId && !isHomePage && (
            <>
              <IconButton
                onClick={() => {
                  handleOpenModal();
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  onEditTemplate(templateId);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  onStartWorkout(templateId);
                }}
              >
                <PlayCircleIcon />
              </IconButton>
            </>
          )}

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {templateDescription}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontFamily: "Montserrat, sans-serif", mb: 3 }}
            >
              Exercises
            </Typography>
            {exercises.map((exercise) => (
              <TemplateCardExercise
                key={exercise._id}
                exerciseName={exercise.name}
                sets={exercise.sets}
              />
            ))}
          </CardContent>
        </Collapse>
      </Card>
    </motion.div>
  );
}
