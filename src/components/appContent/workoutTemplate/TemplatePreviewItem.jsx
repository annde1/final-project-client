import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const TemplatePreviewItem = ({ exerciseName, sets }) => {
  return (
    <>
      <Box sx={{ mb: 8 }}>
        <Typography
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "bold",
            fontSize: "1rem",
            textAlign: "start",
            mb: 2,
          }}
        >
          {exerciseName}
        </Typography>
        <TableContainer sx={{ bgcolor: "#EAEDF3" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Set
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Weight (kg)
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Reps
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sets.map((set, index) => (
                <TableRow key={index}>
                  <TableCell
                    align="center"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {set.weight}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {set.reps}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
export default TemplatePreviewItem;
