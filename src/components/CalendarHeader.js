import React from "react";
import logo from "../logo.svg";

const CalendarHeader = () => {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
      }}
    >
      <img
        src={logo}
        alt="calendar"
        style={{ width: "3rem", height: "3rem", marginRight: "0.5rem" }}
      />
    </header>
  );
};
export default CalendarHeader;
