import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";

const Sidebar = () => {
  return (
    <aside
      style={{ border: "2px solid red", padding: "1.25rem", width: "16rem" }}
    >
      <CreateEventButton />
      <SmallCalendar />
    </aside>
  );
};

export default Sidebar;
