import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import UserProfileCard from "./UserProfileCard";
import "../styles/styles.css";

const UserProfile = ({
  userData,
  workouts,
  followers,
  following,
  onCalculateBmi,
  onShowModal,
}) => {
  return (
    <Container>
      <Box>
        <UserProfileCard
          url={userData.image?.url}
          firstName={userData.name?.firstName}
          lastName={userData.name?.lastName}
          userName={userData.userName}
          email={userData.email}
          userType={userData.isPremium}
          age={userData.age}
          userId={userData._id}
          height={userData.height}
          weight={userData.weight}
          workouts={workouts}
          followers={followers}
          following={following}
          onCalculateBmi={onCalculateBmi}
          onShowModal={onShowModal}
        />
      </Box>
    </Container>
  );
};
export { UserProfile };
