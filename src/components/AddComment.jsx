import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";

const AddComment = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          width: "100%",
        }}
      >
        <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          label="Add comment"
          variant="standard"
          sx={{ width: 450 }}
        />
      </Box>
    </>
  );
};
export default AddComment;
