import React, { useState, useEffect, useReducer, useMemo } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

function savedEventReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}

function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

const ContextWrapper = (props) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);

  const [savedEvents, dispatchCallEvent] = useReducer(
    savedEventReducer,
    [],
    initEvents
  );

  const filterEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvents, labels]);

  useEffect(() => {
    fetchAttendanceData();

    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  const fetchAttendanceData = async () => {
    const attendanceDataUrl =
      "https://xpressotimesheet.herokuapp.com/api/timesheet/?employee=32";
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY0MzcxNjEyLCJqdGkiOiIzMjU0MzFjNmJmZDY0OWQ5OWFiNDRlOTQ0OWNiZjI2ZiIsInVzZXJfaWQiOjMyfQ.auJRbDdMXEcfpPLh3DjLCBjmkFlTsML_GQxn7qAtD44";

    const attendanceDataInJson = await fetch(attendanceDataUrl, {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then((response) => response.json())
      .then((attendanceData) => {
        return attendanceData;
      });

    console.log(attendanceDataInJson);
  };

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map((label) => {
        const currentLabel = prevLabels.find((lbl) => lbl.label === label);
        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        };
      });
    });
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  function updateLabel(label) {
    setLabels(labels.map((lbl) => (lbl.label === label.label ? label : lbl)));
  }

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCallEvent,
        savedEvents,
        setSelectedEvent,
        selectedEvent,
        setLabels,
        labels,
        updateLabel,
        filterEvents,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
