import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ActionsList from "./ActionsList";
import { useState } from "react";
const Template = (props) => {
  const [showActionList, setShowActionList] = useState(false);
  const handleShowList = () => {
    setShowActionList(!showActionList);
  };
  return (
    <>
      <Container>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography
            style={{
              fontFamily: "Montserrat, sans-serif",
              marginBottom: "1.5rem",
            }}
          >
            {props.name}
          </Typography>
          <Box>
            <IconButton onClick={handleShowList}>
              <MoreVertIcon />
            </IconButton>
            {showActionList && <ActionsList open={showActionList} />}
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default Template;
