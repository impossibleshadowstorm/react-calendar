import React, { useState } from "react";
import "./App.css";
import { getMonth } from "./util";
import { Box } from "@mui/material";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  return (
    <React.Fragment>
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <CalendarHeader />
        <Box sx={{ display: "flex", flex: "1 1 0%" }}>
          <Sidebar />
          <Month month={currentMonth} />
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default App;
