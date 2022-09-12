import { Typography } from "@mui/material";
import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const Labels = () => {
  const { labels, updateLabel } = useContext(GlobalContext);
  return (
    <React.Fragment>
      <Typography
        sx={{
          marginTop: "2.5rem",
          fontWeight: "bold",
          color: "rgb(107 114 128)",
        }}
      >
        Label
      </Typography>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label
          key={idx}
          style={{
            marginTop: "0.75rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            type="checkbox"
            onChange={() => updateLabel({label: lbl, checked: !checked})}
            checked={checked}
            style={{
              marginLeft: "0.5rem",
              height: "1rem",
              width: "1rem",
              borderRadius: "0.25rem",
              cursor: "pointer",
              color: lbl,
            }}
          />
          <span
            style={{
              textTransform: "capitalize",
              marginLeft: "0.5rem",
              color: lbl,
            }}
          >
            {lbl}
          </span>
        </label>
      ))}
    </React.Fragment>
  );
};

export default Labels;
