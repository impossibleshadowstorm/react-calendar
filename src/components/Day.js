import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";

const Day = ({ day, rowIdx }) => {
  function getCurrentDayClass() {
    const currentDayStyle = {
      backgroundColor: "rgb(37 99 235)",
      color: "rgb(255 255 255)",
      borderRadius: "100%",
      width: "20px",
      height: "20px",
    };
    const noCurrentDayStyle = {
      backgroundColor: "transparent",
    };
    console.log(true);
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? currentDayStyle
      : noCurrentDayStyle;
  }

  const { setDaySelected, setShowEventModal } = useContext(GlobalContext);

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "rgb(229 231 235)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {rowIdx === 0 && (
          <Typography
            sx={{
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              marginTop: "0.25rem",
            }}
          >
            {day.format("ddd").toUpperCase()}
          </Typography>
        )}

        <Typography
          sx={{
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            padding: "0.25rem",
            marginTop: "0.25rem",
            marginBottom: "0.25rem",
            textAlign: "center",
            backgroundColor: "red",
          }}
          style={{ ...getCurrentDayClass() }}
        >
          {day.format("DD")}
        </Typography>
      </header>
      <Box
        sx={{ cursor: "pointer", flex: "1 1 0%" }}
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      ></Box>
    </Box>
  );
};

export default Day;
