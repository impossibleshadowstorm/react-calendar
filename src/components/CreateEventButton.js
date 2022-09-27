import React, { useContext } from "react";
import { Button, Typography } from "@mui/material";
import GlobalContext from "../context/GlobalContext";

const CreateEventButton = () => {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <Button
      onClick={() => setShowEventModal(true)}
      sx={{
        padding: "0.4375rem 1.375rem",
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "38px",
        backgroundColor: "rgb(102, 108, 255)",
        borderRadius: "8px",
        outline: "0",
        border: "0",
        margin: "0",
        transition:
          "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        boxShadow: "rgb(76 78 100 / 42%) 0px 4px 8px -4px",
        "&:hover": {
          boxShadow: "rgb(76 78 100 / 56%) 0px 6px 18px -8px",
          backgroundColor: "rgb(90, 95, 224)",
          cursor: "pointer",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: "0.875rem",
          color: "white",
        }}
      >
        Add Event
      </Typography>
    </Button>
  );
};

export default CreateEventButton;
