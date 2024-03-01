import * as React from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
export default function ToggleComponent({ onDisplayModeChange, view }) {
  const handleDisplayMode = (event, value) => {
    onDisplayModeChange(value);
  };
  return (
    <ToggleButtonGroup value={view} exclusive onChange={handleDisplayMode}>
      <Tooltip title="List mode">
        <ToggleButton
          value="list"
          aria-label="list"
          selected={view === "list"}
          sx={{ width: "25px", height: "25px" }}
        >
          <ViewListIcon sx={{ fontSize: "1.4rem" }} />{" "}
        </ToggleButton>
      </Tooltip>
      <Tooltip title="Card mode">
        <ToggleButton
          value="card"
          aria-label="module"
          selected={view === "card"}
          sx={{ width: "25px", height: "25px" }}
        >
          <ViewModuleIcon sx={{ fontSize: "1.4rem" }} />{" "}
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
}
