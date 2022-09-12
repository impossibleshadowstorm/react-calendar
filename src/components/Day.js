import React, { useContext, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";

const Day = ({ day, rowIdx }) => {
  const [dayEvents, setDayEvents] = useState([]);
  const { setDaySelected, setShowEventModal, filterEvents, setSelectedEvent } =
    useContext(GlobalContext);

  useEffect(() => {
    const events = filterEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );

    setDayEvents(events);
  }, [filterEvents, day]);

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
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? currentDayStyle
      : noCurrentDayStyle;
  }

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
      >
        {dayEvents.map((evt, idx) => (
          <Box
            key={idx}
            onClick={() => {
              setSelectedEvent(evt);
            }}
            sx={{
              backgroundColor: evt.label,
              opacity: "0.75",
              padding: "0.25rem",
              marginRight: "0.75rem",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              borderRadius: "0.25rem",
              marginBottom: "0.25rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: "white",
            }}
          >
            {evt.title}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Day;
