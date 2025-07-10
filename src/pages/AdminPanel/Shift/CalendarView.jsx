import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./CalendarView.css"; // Assuming you have some styles for the calendar

export default function CalendarView({ data }) {
  // map each employee to daily events this month
  const events = [];
  const today = new Date();
  const year = today.getFullYear(), month = today.getMonth();
  data.forEach(emp => {
    // for demo: every Monday of this shift
    for(let d=1; d<=31; d++){
      const dt = new Date(year, month, d);
      if(dt.getDay()=== (emp.shift==="A"?1: emp.shift==="B"?3:5)) {
        events.push({
          title: `${emp.name} (S${emp.shift})`,
          date: dt.toISOString().slice(0,10),
          color: emp.shift==="A"? "#34d399": emp.shift==="B"? "#60a5fa":"#f472b6"
        });
      }
    }
  });

  return (
    <div className="calendar-wrapper">
      <h3>Shift Calendar (this month)</h3>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
      />
    </div>
  );
}
