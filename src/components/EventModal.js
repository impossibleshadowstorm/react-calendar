import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import FeatherIcon from "feather-icons-react";
import GlobalContext from "../context/GlobalContext";

// https://youtu.be/KUKyTRYGrnU

const EventModal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { setShowEventModal, daySelected } = useContext(GlobalContext);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        position: "fixed",
        left: 0,
        top: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        style={{
          borderRadius: "0.5rem",
          background: "white",
          boxShadow: " 0 25px 50px -12px rgb(0 0 0 / 0.25)",
          width: "25%",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "rgb(243 244 246)",
            padding: "0.5rem 1rem",
          }}
        >
          <span>
            <FeatherIcon icon="maximize-2"></FeatherIcon>
          </span>
          <Button onClick={() => setShowEventModal(false)}>
            <FeatherIcon icon="x"></FeatherIcon>
          </Button>
        </header>
        <Box sx={{ padding: "0.75rem" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "10% 90%",
              alignItems: "flex-end",
              rowGap: "0.5rem",
            }}
          >
            <Box></Box>
            <TextField
              inputProps={{fontWeight: "bold", fontSize: "34px"}}
              size="medium"
              placeholder="Add a Title"
              value={title}
              label="Title"
              variant="standard"
              required={true}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Box sx={{ height: "10px" }}></Box>
            <Box sx={{ height: "10px" }}></Box>
            <Box>
              <FeatherIcon
                icon="clock"
                height="21px"
                width="21px"
              ></FeatherIcon>
            </Box>
            <Typography sx={{ height: "100%", color: "#3c4043" }}>
              {daySelected.format("dddd, MMMM DD")}
            </Typography>
            <Box>
              <FeatherIcon
                icon="align-right"
                height="21px"
                width="21px"
              ></FeatherIcon>
            </Box>
            <TextField
              sx={{ m: 0, p: 0 }}
              placeholder="Title"
              value={description}
              label="Add a Description"
              variant="standard"
              required={true}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Box>
              <FeatherIcon
                icon="bookmark"
                height="21px"
                width="21px"
              ></FeatherIcon>
            </Box>
            <TextField
              sx={{ m: 0, p: 0 }}
              placeholder="Title"
              value={description}
              label="Add a Description"
              variant="standard"
              required={true}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default EventModal;
