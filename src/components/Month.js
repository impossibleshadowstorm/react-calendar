import React from "react";
import Day from "./Day";
import { Box } from "@mui/material";
const Month = ({ month }) => {
  return (
    <Box
      sx={{
        flex: "1 1 0%",
        display: "grid",
        gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
        gridTemplateRows: "repeat(5, minmax(0, 1fr))",
      }}
    >
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i}/>
          ))}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default Month;
