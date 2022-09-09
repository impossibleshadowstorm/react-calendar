import { Typography, Box } from "@mui/material";
import dayjs from "dayjs";
import React, { useState, useEffect, useContext } from "react";
import { getMonth } from "../util";
import FeatherIcon from "feather-icons-react";
import GlobalContext from "../context/GlobalContext";

const monthNavigationButtonStyle = {
  width: "30px",
  height: "30px",
  borderRadius: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 3px",
  "&:hover": {
    backgroundColor: "rgba(32,33,36,0.039)",
    cursor: "pointer",
  },
};

const SmallCalendar = () => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }
  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }

  function getDayClass(day) {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);

    if (nowDay === currDay) {
      return {
        backgroundColor: "blue",
        color: "white",
      };
    } else if (currDay === slcDay) {
      return {
        backgroundColor: "rgb(219 234 254)",
        color: "rgb(37 99 235)",
        fontWeight: "bold",
      };
    } else {
      return {
        backgroundColor: "transparent",
      };
    }
  }
  return (
    <Box sx={{ marginTop: "2.25rem" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: "5px",
        }}
      >
        <Typography sx={{ fontWeight: "bold", color: "#3C4043" }}>
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ ...monthNavigationButtonStyle }} onClick={handlePrevMonth}>
            <FeatherIcon
              icon="chevron-left"
              color="#5f6368"
              width="20px"
              height="20px"
              style={{
                margin: "0 4px",
                cursor: "pointer",
              }}
            />
          </Box>
          <Box sx={{ ...monthNavigationButtonStyle }} onClick={handleNextMonth}>
            <FeatherIcon
              icon="chevron-right"
              color="#5f6368"
              width="20px"
              height="20px"
              style={{
                margin: "0 4px",
                cursor: "pointer",
              }}
            />
          </Box>
        </Box>
      </header>
      <Box
        sx={{
          // border: "0.5px solid black",
          display: "grid",
          gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
          gridTemplateRows: "repeat(6, minmax(0, 1fr))",
        }}
      >
        {currentMonth[0].map((day, i) => (
          <span
            key={i}
            style={{
              borderRadius: "100%",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              margin: "3px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.875rem",
              fontWeight: "bold",
              lineHeight: "1.25rem",
              textAlign: "center",
              paddingTop: "0.25rem",
            }}
          >
            {day.format("dd").charAt()}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <Box
                key={idx}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
                sx={{
                  ...getDayClass(day),
                  paddingTop: " 0.25rem",
                  borderRadius: "100%",
                  paddingBottom: "0.25rem",
                  width: "30px",
                  margin: "5px 2px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": {
                    // boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                    boxShadow:
                      "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                    cursor: "pointer",
                  },
                }}
              >
                <span style={{ fontSize: "0.875rem", lineHeight: "1.25rem" }}>
                  {day.format("D")}
                </span>
              </Box>
            ))}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default SmallCalendar;
