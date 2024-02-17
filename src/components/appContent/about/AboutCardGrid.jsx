import { Box, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import GroupsIcon from "@mui/icons-material/Groups";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { motion } from "framer-motion";
import { useAnimation } from "framer-motion";
import { useEffect } from "react";
const AboutCardGrid = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    });
  }, [controls]);
  return (
    <>
      <Box sx={{ pb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={controls}
              exit={{ opacity: 0 }}
            >
              <Card
                sx={{
                  backgroundColor: "#0b1011",
                  height: "28rem",
                }}
              >
                <CardMedia
                  component="img"
                  image="assets/images/girl-squats.jpg"
                  alt="Strong Girl Doing Squats"
                />
                <CardContent>
                  <Typography
                    sx={{
                      mb: 1.5,
                      fontFamily: "Montserrat, sans-serif",
                      color: "#EAEDF3",
                      fontWeight: "bold",
                    }}
                  >
                    Customizable Templates
                  </Typography>
                  <WysiwygIcon
                    fontSize="medium"
                    sx={{ mt: 1, mb: 1, color: "#EAEDF3" }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "justify",
                      fontFamily: "Montserrat, sans-serif",
                      color: "#EAEDF3",
                    }}
                  >
                    Create personalized workout routines tailored to your
                    fitness goals. Our intuitive Create Template page allows you
                    to design routines that suit your unique needs, whether
                    you're aiming for strength, endurance, or flexibility.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={controls}
              exit={{ opacity: 0 }}
            >
              <Card
                sx={{
                  backgroundColor: "#0b1011",
                  height: "28rem",
                }}
              >
                <CardMedia
                  component="img"
                  image="assets/images/weightlifting.jpg"
                  alt="Photo of Barbell"
                />
                <CardContent>
                  <Typography
                    sx={{
                      mb: 1.5,
                      fontFamily: "Montserrat, sans-serif",
                      color: "#EAEDF3",
                      fontWeight: "bold",
                    }}
                  >
                    Smart Workouts
                  </Typography>
                  <FitnessCenterIcon
                    fontSize="medium"
                    sx={{ mt: 1, mb: 1, color: "#EAEDF3" }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Montserrat, sans-serif",
                      textAlign: "justify",
                      color: "#EAEDF3",
                    }}
                  >
                    Initiate your workouts seamlessly with the My Templates
                    page. Choose from your personally crafted templates and
                    kickstart your fitness journey. Receive instant feedback
                    after each session, including duration, volume, and records.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={controls}
              exit={{ opacity: 0 }}
            >
              <Card
                sx={{
                  backgroundColor: "#0b1011",
                  height: "28rem",
                }}
              >
                <CardMedia
                  component="img"
                  image="assets/images/kettlebell.jpg"
                  alt="Photo of Kettlebell"
                />
                <CardContent>
                  <Typography
                    sx={{
                      mb: 1.5,
                      fontFamily: "Montserrat, sans-serif",
                      color: "#EAEDF3",
                      fontWeight: "bold",
                    }}
                  >
                    Progress Tracking
                  </Typography>
                  <TrendingUpIcon
                    fontSize="medium"
                    sx={{ mt: 1, mb: 1, color: "#EAEDF3" }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "justify",
                      fontFamily: "Montserrat, sans-serif",
                      color: "#EAEDF3",
                    }}
                  >
                    Zen Fit goes beyond the basics. Track your progress
                    effortlessly and celebrate your achievements. Get detailed
                    insights into your workout history, including records such
                    as increased weight lifted or additional reps.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={controls}
              exit={{ opacity: 0 }}
            >
              <Card
                sx={{
                  backgroundColor: "#0b1011",
                  height: "28rem",
                }}
              >
                <CardMedia
                  component="img"
                  image="assets/images/group-people-exercising-with-dumbbells-fitness-club-gym.jpg"
                  alt="Photo of Athlete"
                />
                <CardContent>
                  <Typography
                    sx={{
                      mb: 1.5,
                      fontFamily: "Montserrat, sans-serif",
                      color: "#EAEDF3",
                      fontWeight: "bold",
                    }}
                  >
                    Social Fitness
                  </Typography>
                  <GroupsIcon
                    fontSize="medium"
                    sx={{ mt: 1, mb: 1, color: "#EAEDF3" }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "justify",
                      fontFamily: "Montserrat, sans-serif",
                      color: "#EAEDF3",
                    }}
                  >
                    Connect with like-minded individuals in the Zen Fit
                    community. Follow other users, share your fitness routines,
                    and find inspiration in the Feeds page. See the routines of
                    the people you follow and showcase your fitness journey to
                    motivate others.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={controls}
              exit={{ opacity: 0 }}
            >
              <Card
                sx={{
                  backgroundColor: "#0b1011",
                  height: "28rem",
                }}
              >
                <CardMedia
                  component="img"
                  image="assets/images/strong-man-training-gym.jpg"
                  alt="Photo Of Dumbbells"
                />
                <CardContent>
                  <Typography
                    sx={{
                      mb: 1.5,
                      fontFamily: "Montserrat, sans-serif",
                      color: "#EAEDF3",
                      fontWeight: "bold",
                    }}
                  >
                    Premium Subscription
                  </Typography>
                  <UpgradeIcon
                    fontSize="medium"
                    sx={{ mt: 1, mb: 1, color: "#EAEDF3" }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "justify",
                      fontFamily: "Montserrat, sans-serif",
                      color: "#EAEDF3",
                    }}
                  >
                    Upgrade to Zen Fit Premium for an enhanced experience. Enjoy
                    the flexibility to create an unlimited number of routines.
                    Premium users have the freedom to diversify their workouts
                    and optimize their fitness plans.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={controls}
              exit={{ opacity: 0 }}
            >
              <Card
                sx={{
                  backgroundColor: "#0b1011",
                  height: "28rem",
                }}
              >
                <CardMedia
                  component="img"
                  image="assets/images/athletic-blonde-woman-sportswear-doing-exercise-legs-press-machine-gym.jpg"
                  alt="Athletic young woman doing leg exercise"
                />
                <CardContent>
                  <Typography
                    sx={{
                      mb: 1.5,
                      fontFamily: "Montserrat, sans-serif",
                      color: "#EAEDF3",
                      fontWeight: "bold",
                    }}
                  >
                    Personalized Profile
                  </Typography>
                  <AccountCircleIcon
                    fontSize="medium"
                    sx={{ mt: 1, mb: 1, color: "#EAEDF3" }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "justify",
                      fontFamily: "Montserrat, sans-serif",
                      color: "#EAEDF3",
                    }}
                  >
                    Curate your fitness identity in the Edit Profile page.
                    Update your personal information, set profile images, and
                    customize your details. Track your fitness statistics in the
                    My Profile page, including BMI, workout count, and your
                    followers/following.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default AboutCardGrid;
