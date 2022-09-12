import React from "react";
import CreateEventButton from "./CreateEventButton";
import Labels from "./Labels";
import SmallCalendar from "./SmallCalendar";

const Sidebar = () => {
  return (
    <aside
      style={{ border: "2px solid red", padding: "1.25rem", width: "16rem" }}
    >
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
    </aside>
  );
};

export default Sidebar;
