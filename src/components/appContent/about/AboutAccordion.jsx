import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  backgroundColor: "#EAEDF3",
}));

const AboutAccordion = () => {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography sx={{ fontFamily: "Montserrat, sans-serif" }}>
            Customizable Templates
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontFamily: "Montserrat, sans-serif" }}>
            Create personalized workout routines tailored to your fitness goals.
            Our intuitive Create Template page allows you to design routines
            that suit your unique needs, whether you're aiming for strength,
            endurance, or flexibility.
          </Typography>
          {/* <img
            src={process.env.PUBLIC_URL + "/assets/images/logo-color.png"}
            alt="le logo"
          ></img> */}
          <img
            src={encodeURI("/assets/images/create-template.png")}
            alt="create template"
          ></img>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography sx={{ fontFamily: "Montserrat, sans-serif" }}>
            Smart Workouts
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontFamily: "Montserrat, sans-serif" }}>
            Initiate your workouts seamlessly with the My Templates page. Choose
            from your personally crafted templates and kickstart your fitness
            journey. Receive instant feedback after each session, including
            duration, volume, and records compared to your previous workouts
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography sx={{ fontFamily: "Montserrat, sans-serif" }}>
            Progress Tracking
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontFamily: "Montserrat, sans-serif" }}>
            Zen Fit goes beyond the basics. Track your progress effortlessly and
            celebrate your achievements. Get detailed insights into your workout
            history, including records such as increased weight lifted or
            additional reps.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography sx={{ fontFamily: "Montserrat, sans-serif" }}>
            Social Fitness
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontFamily: "Montserrat, sans-serif" }}>
            Connect with like-minded individuals in the Zen Fit community.
            Follow other users, share your fitness routines, and find
            inspiration in the Feeds page. See the routines of the people you
            follow and showcase your fitness journey to motivate others.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography sx={{ fontFamily: "Montserrat, sans-serif" }}>
            Premium Subscription
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontFamily: "Montserrat, sans-serif" }}>
            Upgrade to Zen Fit Premium for an enhanced experience. Enjoy the
            flexibility to create an unlimited number of routines. Premium users
            have the freedom to diversify their workouts and optimize their
            fitness plans.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <Typography sx={{ fontFamily: "Montserrat, sans-serif" }}>
            Personalized Profile
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontFamily: "Montserrat, sans-serif" }}>
            Curate your fitness identity in the Edit Profile page. Update your
            personal information, set profile images, and customize your
            details. Track your fitness statistics in the My Profile page,
            including BMI, workout count, and your followers/following.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default AboutAccordion;
