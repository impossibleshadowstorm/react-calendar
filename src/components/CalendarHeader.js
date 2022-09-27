import { Button, Typography, Box } from "@mui/material";
import React, { useContext } from "react";
// import logo from "../logo.svg";
import FeatherIcon from "feather-icons-react";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";
// import monthNavigationButtonStyle from "./styleData";
// https://www.youtube.com/watch?v=KUKyTRYGrnU

const monthNavigationButtonStyle = {
  width: "30px",
  height: "30px",
  borderRadius: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: "rgba(32,33,36,0.039)",
    
  },
};

const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        height: "46px",
      }}
    >
      {/* <img
        src={logo}
        alt="calendar"
        style={{ width: "3rem", height: "3rem", marginRight: "0.5rem" }}
      />
      <Typography
        sx={{
          marginRight: "2.5rem",
          fontSize: "1.25rem",
          lineHeight: "1.75rem",
          fontWeight: "bold",
          color: "rgb(107 114 128)",
        }}
      >
        Calendar
      </Typography> */}

      <Box
        sx={{
          width: "150px",
          height: "36px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Button
          sx={{
            backgroundColor: "rgb(102, 108, 255)",

            height: "30px",
            width: "64px",
            borderRadius: "8px",
            // border: "1px solid #dadce0",
            fontSize: "14px",
            textTransform: "Capitalize",
            transition:
              "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            boxShadow: "rgb(76 78 100 / 42%) 0px 4px 8px -4px",
            color: "#fff",
            "&:hover": {
              boxShadow: "rgb(76 78 100 / 56%) 0px 6px 18px -8px",
              backgroundColor: "rgb(90, 95, 224)",
              cursor: "pointer",
            },
          }}
          onClick={handleReset}
        >
          Today
        </Button>

        <Box sx={{ ...monthNavigationButtonStyle }}>
          <FeatherIcon
            icon="chevron-left"
            color="#5f6368"
            width="20px"
            height="20px"
            style={{
              margin: "0 4px",
              cursor: "pointer",
            }}
            onClick={handlePrevMonth}
          />
        </Box>
        <Box sx={{ ...monthNavigationButtonStyle }}>
          <FeatherIcon
            icon="chevron-right"
            color="#5f6368"
            width="20px"
            height="20px"
            style={{
              margin: "0 4px",
              cursor: "pointer",
            }}
            onClick={handleNextMonth}
          />
        </Box>
      </Box>

      <Typography
        sx={{
          marginLeft: "1rem",
          fontSize: "1.25rem",
          lineHeight: "1.75rem",
          fontWeight: "500",
          color: "#3C4043",
        }}
      >
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </Typography>
    </header>
  );
};
export default CalendarHeader;
