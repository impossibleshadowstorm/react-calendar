import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./util";
import { Box } from "@mui/material";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}
      <Box sx={{ height: "10vh", display: "flex", flexDirection: "row" }}>
        <Sidebar />
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "flex-end",
            flex: "1 1 0%",
          }}
        >
          <Box
            sx={{
              height: "90vh",
              display: "flex",
              flex: "1 1 0%",
              flexDirection: "column",
              boxShadow: "rgb(76 78 100 / 22%) 0px 2px 10px 0px",
            }}
          >
            <CalendarHeader />
            <Month month={currentMonth} />
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default App;
