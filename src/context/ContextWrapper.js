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

const labelClasses = ["red", "green"];

const ContextWrapper = (props) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [dayEvents, setDayEvents] = useState([]);
  const [calendarEvent, setCalendarEvent] = useState([]);

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

  //
  //
  //
  //

  useEffect(() => {
    // console.log(fetchAttendanceData());

    const fetchAttendanceData = async () => {
      const attendanceDataUrl =
        "https://xpressotimesheet.herokuapp.com/api/timesheet/?employee=32";
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY0NDM0NzkwLCJqdGkiOiIzZGQzYzhmMGE2ZTI0MDI1OTIxMTA5ZDllMjBiYmMzZSIsInVzZXJfaWQiOjMyfQ.JLn3rpHMnOht3BGwN3tn1_qlwSMccTo10EUyXgeqLWg";

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

      console.log(attendanceDataInJson[0]["date"]);

      const currentDate = getCurrentDate();

      const updatingData = [...calendarEvent];

      if (
        !updatingData.find(
          (o) =>
            o.date === attendanceDataInJson[0]["date"] &&
            o.in_time === attendanceDataInJson[0]["in_time"] &&
            o.out_time === attendanceDataInJson[0]["out_time"] &&
            o.overtime_hours === attendanceDataInJson[0]["overtime_hours"]
        )
      ) {
        updatingData.push({
          date: attendanceDataInJson[0]["date"],
          in_time: attendanceDataInJson[0]["in_time"],
          out_time: attendanceDataInJson[0]["out_time"],
          overtime_hours: attendanceDataInJson[0]["overtime_hours"],
          title: "Present",
          label: labelClasses[1],
          description: "present",
          id: attendanceDataInJson[0]["date"],
        });
      }

      dispatchCallEvent({ type: "push", payload: updatingData[1] });

      console.log(calendarEvent);
    };

    fetchAttendanceData();

    // localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, []);

  const getCurrentDate = () => {
    var todayDate = new Date();
    var dd = todayDate.getDate();
    var mm = todayDate.getMonth() + 1;
    var yyyy = todayDate.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    todayDate = yyyy + "-" + mm + "-" + dd;

    return todayDate;
  };

  const [title, setTitle] = useState("");
  // const [description, setDescription] = useState(
  //   selectedEvent ? selectedEvent.description : ""
  // );
  const [selectedLabel, setSelectedLabel] = useState(labelClasses[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const calendarEvent = {
      title,
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
        dayEvents,
        setDayEvents,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
