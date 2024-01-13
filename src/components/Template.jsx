import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ActionsList from "./ActionsList";
import { useState } from "react";
import { Popover } from "@mui/material";
const Template = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleShowList = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseList = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
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
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleCloseList}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right-32",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {open && (
                <ActionsList
                  onDelete={props.onDelete}
                  onEdit={props.onEdit}
                  onStartWorkout={props.onStartWorkout}
                  templateId={props.templateId}
                />
              )}
            </Popover>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default Template;
