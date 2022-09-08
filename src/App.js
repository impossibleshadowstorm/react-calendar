import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./util";
import { Box } from "@mui/material";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "row" }}>
        <Sidebar />
        <Box sx={{ display: "flex", flex: "1 1 0%", flexDirection: "column" }}>
          <CalendarHeader />
          <Month month={currentMonth} />
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default App;
