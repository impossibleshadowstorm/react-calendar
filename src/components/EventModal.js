import { Box, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import FeatherIcon from "feather-icons-react";
import GlobalContext from "../context/GlobalContext";

// https://youtu.be/KUKyTRYGrnU

const labelClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

const EventModal = () => {
  const { setShowEventModal, daySelected, dispatchCallEvent, selectedEvent } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelClasses.find((lbl) => lbl === selectedEvent.label)
      : labelClasses[0]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };

    if (selectedEvent) {
      dispatchCallEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCallEvent({ type: "push", payload: calendarEvent });
    }
    setShowEventModal(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        position: "fixed",
        zIndex: "1000",
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
          <Box
            onClick={() => setShowEventModal(false)}
            sx={{
              padding: "0 0.75rem",
              height: "25px",
              display: "flex",
              alignItems: "center",
              borderRadius: "0.25rem",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#E9EAEB",
                transition: "all 0.5s ease",
              },
            }}
          >
            <FeatherIcon
              icon="maximize-2"
              width="15px"
              height="15px"
            ></FeatherIcon>
          </Box>
          <Box sx={{ display: "flex" }}>
            {selectedEvent && (
              <Box
                onClick={() => {
                  dispatchCallEvent({ type: "delete", payload: selectedEvent });
                  setShowEventModal(false);
                }}
                sx={{
                  padding: "0 0.75rem",
                  height: "25px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  borderRadius: "0.25rem",
                  "&:hover": {
                    backgroundColor: "#E9EAEB",
                    transition: "all 0.5s linear",
                  },
                }}
              >
                <FeatherIcon icon="trash" width="15px" height="15px" />
              </Box>
            )}
            <Box
              onClick={() => setShowEventModal(false)}
              sx={{
                padding: "0 0.75rem",
                height: "25px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                borderRadius: "0.25rem",
                "&:hover": {
                  backgroundColor: "#E9EAEB",
                  transition: "all 0.5s linear",
                },
              }}
            >
              <FeatherIcon icon="x" width="15px" height="15px" />
            </Box>
          </Box>
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
            {/* Title Row */}
            <Box></Box>
            <TextField
              InputProps={{
                style: {
                  color: "black",
                  padding: "0 5px",
                },
              }}
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
            {/* Day Selected Row */}
            <Box>
              <FeatherIcon
                icon="clock"
                height="21px"
                width="21px"
              ></FeatherIcon>
            </Box>
            <Typography
              sx={{ height: "100%", color: "#3c4043", fontWeight: "600" }}
            >
              {daySelected.format("dddd, MMMM DD")}
            </Typography>
            {/* Description Row */}
            <Box>
              <FeatherIcon
                icon="align-right"
                height="21px"
                width="21px"
              ></FeatherIcon>
            </Box>
            <TextField
              InputProps={{
                style: {
                  color: "black",
                  padding: "0 5px",
                },
              }}
              sx={{ m: 0, p: 0 }}
              placeholder="Add a Description"
              value={description}
              label="Description"
              variant="standard"
              required={true}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Box sx={{ height: "10px" }}></Box>
            <Box sx={{ height: "10px" }}></Box>
            {/* Label Row */}
            <Box>
              <FeatherIcon
                icon="bookmark"
                height="21px"
                width="21px"
              ></FeatherIcon>
            </Box>
            <Box sx={{ display: "flex", columnGap: "0.5rem" }}>
              {labelClasses.map((lblClass, i) => (
                <span
                  onClick={() => setSelectedLabel(lblClass)}
                  key={i}
                  style={{
                    backgroundColor: lblClass,
                    width: "1.5rem",
                    height: "1.5rem",
                    borderRadius: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  {selectedLabel === lblClass && (
                    <FeatherIcon
                      icon="check"
                      color="white"
                      height="15px"
                      width="15px"
                      strokeWidth="3.5px"
                    />
                  )}
                </span>
              ))}
            </Box>
          </Box>
        </Box>
        <footer
          style={{
            display: "flex",
            justifyContent: "flex-end",
            borderTop: "2px solid #F3F4F6",
            borderTopWidth: "1px",
            marginTop: "1rem",
          }}
        >
          <Box
            onClick={handleSubmit}
            style={{
              backgroundColor: "rgb(59 130 246)",
              margin: "0.5rem 0.5rem 0.5rem",
              padding: "0.5rem 1.5rem",
              color: "white",
              borderRadius: "7%",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgb(37 99 235)",
              },
            }}
          >
            Save
          </Box>
        </footer>
      </form>
    </Box>
  );
};

export default EventModal;
