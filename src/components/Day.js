import React from "react";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

const Day = ({ day, rowIdx }) => {
  function getCurrentDayClass() {
    const currentDayStyle = {
      backgroundColor: "rgb(37 99 235)",
      color: "rgb(255 255 255)",
      borderRadius: "100%",
      width: "1.75rem",
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

  return (
    <Box
      sx={{
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
    </Box>
  );
};

export default Day;
