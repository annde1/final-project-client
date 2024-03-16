import * as React from "react";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";

export default function ToggleComponent({ onDisplayModeChange, view }) {
  const handleDisplayMode = () => {
    onDisplayModeChange(view === "list" ? "card" : "list");
  };

  return (
    <Tooltip
      title={view === "list" ? "Switch to Card mode" : "Switch to List mode"}
    >
      <Switch
        checked={view === "card"}
        onChange={handleDisplayMode}
        color="primary"
        inputProps={{ "aria-label": "toggle display mode" }}
      />
    </Tooltip>
  );
}
