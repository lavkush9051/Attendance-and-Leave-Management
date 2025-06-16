
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import dayjs from "dayjs";
import './Dashboard.css';

const Dashboard = () => {
  const [presentDays, setPresentDays] = useState([]);
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    // Simulated present days data (you'll fetch this from your backend)
    setPresentDays([
      { date: "2025-06-02", clockIn: "09:15 AM", clockOut: "05:45 PM" },
      { date: "2025-06-03", clockIn: "09:10 AM", clockOut: "06:00 PM" },
      { date: "2025-06-04", clockIn: "09:10 AM", clockOut: "06:00 PM" },
      { date: "2025-06-05", clockIn: "09:10 AM", clockOut: "06:00 PM" },
    ]);
    setHolidays(["2025-06-08", "2025-06-15"]); // Example holidays
  }, []);

  return (
    <div>
        
        <div className="dashboard-container">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                height="auto"
                aspectRatio={1.5}
                // events={holidayEvents}
                dayCellContent={arg => renderDayCell(arg, presentDays)}
                dayCellClassNames={arg => getDayCellClassNames(arg, presentDays, holidays)}
            />
        </div>
    </div>
  );
};

function getDayCellClassNames(arg, presentDays, holidays) {
  const currentDate = dayjs(arg.date).format("YYYY-MM-DD");
  const today = dayjs().format("YYYY-MM-DD");
  const weekday = dayjs(arg.date).day(); // Sunday = 0, Saturday = 6

  const isHoliday = holidays && holidays.includes(currentDate);
  const isPresent = presentDays.find(d => d.date === currentDate);

  if (currentDate === today) {
    return ["day-today"];
  } else if (isHoliday || weekday === 0 || weekday === 6) {
    return ["day-weekend"];
  } else if (dayjs(arg.date).isBefore(today, "day")) {
    return isPresent ? ["day-present"] : ["day-absent"];
  }
  return [];
}

function renderDayCell(arg, presentDays) {
  const currentDate = dayjs(arg.date).format("YYYY-MM-DD");
  const match = presentDays.find(d => d.date === currentDate);
  const clockIn = match ? match.clockIn : "-";
  const clockOut = match ? match.clockOut : "-";
  return (
    <div className="day-cell-content">
      <div className="fc-day-number">{arg.dayNumberText}</div>
      <div className="clock-line">Clock In: {clockIn}</div>
      <div className="clock-line">Clock Out: {clockOut}</div>
    </div>
  );
}

export default Dashboard;

