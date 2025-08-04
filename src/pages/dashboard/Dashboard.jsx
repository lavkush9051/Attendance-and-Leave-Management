import React, { useEffect, useState, useContext, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import dayjs from "dayjs";
import "./Dashboard.css";
import VerifyPage from "../VerifyPage";
import { AuthContext } from '../../context/AuthContext';
import RegularizeAttendanceModal from "../../components/RegularizeAttendanceModal/RegularizeAttendanceModal";
import { API_BASE_URL } from "../../config";
import {getShiftGroupForDate} from "../../components/getShiftGroupForDate";


const shiftTimings = {
  1: { start: '07:00', end: '15:30' },   // Example timings for Shift 1
  2: { start: '15:00', end: '23:30' },   // Example timings for Shift 2
  3: { start: '23:00', end: '07:30' },    // Example timings for Shift 3
  General: { start: '10:00', end: '17:45' }
};

export default function Dashboard() {
  const [presentDays, setPresentDays] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showRegularize, setShowRegularize] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    shift: "-",
    averageWorking: "-",
    averageLate: "-",
    absent: "-"
  });
  const { isClockedIn, clockOut } = useContext(AuthContext);
  const lastFetchedMonth = useRef();

  // Assume localStorage has employee object with emp_id
  //const employee = JSON.parse(localStorage.getItem("employee"));
  const { employee } = useContext(AuthContext);
  const emp_id = employee?.emp_id;
  //console.log("Employee ID:", emp_id);

  // Track which month is shown in the calendar
  const [calendarDate, setCalendarDate] = useState(dayjs().format("YYYY-MM"));

let employeeWeekoff = employee.emp_weekoff; // Could be "Saturday", "Saturday,Sunday", or ["Saturday","Sunday"]

// Convert comma string to array for consistency
if (typeof employeeWeekoff === "string" && employeeWeekoff.includes(',')) {
  employeeWeekoff = employeeWeekoff.split(',').map(day => day.trim());
}

// Today's info
const todayDateObj = new Date();
const todayDateStr = todayDateObj.toISOString().slice(0, 10);
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const todayDayName = weekdays[todayDateObj.getDay()];

// Helper: is today a weekoff for the employee?
let weekoffToday = false;
if (Array.isArray(employeeWeekoff)) {
  weekoffToday = employeeWeekoff.map(day => day.toLowerCase()).includes(todayDayName.toLowerCase());
} else if (typeof employeeWeekoff === "string") {
  weekoffToday = todayDayName.toLowerCase() === employeeWeekoff.toLowerCase();
}

// Determine shift group or general
const shiftGroupForToday = getShiftGroupForDate(employeeWeekoff, todayDateStr);
const shiftTimingForToday = shiftTimings[shiftGroupForToday] || { start: '-', end: '-' };



const handleClockOut = async () => {
  const employee = JSON.parse(localStorage.getItem("employee")); // or get emp_id from context
  if (!employee?.emp_id) {
    alert("No employee id found!");
    return;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/api/clockout`, { // fetch("http://127.0.0.1:8000/api/clockout
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emp_id: employee.emp_id }),
    });
    const data = await res.json();
    if (data.status === "success") {
      // Optionally: refresh attendance, show message, etc.
      clockOut(); // Your existing local state logic
    } else {
      alert("Failed to clock out: " + (data.error || ""));
    }
  } catch (err) {
    alert("Clock out API error: " + err);
  }
};


function handleDatesSet(arg) {
  const month = dayjs(arg.start).format("YYYY-MM");
  const start = dayjs(arg.start).format("YYYY-MM-DD");
  const end = dayjs(arg.end).subtract(1, 'day').format("YYYY-MM-DD"); // FullCalendar's end is exclusive

  console.log("Fetching attendance for:", start, "to", end);
  setLoading(true);

  fetch(`${API_BASE_URL}/api/attendance?emp_id=${emp_id}&start=${start}&end=${end}`)
    .then(res => res.json())
    .then(data => {
      setPresentDays(data.attendance || []);
      setHolidays(data.holidays || []);
      setStats({
        shift: data.shift || "-",
        averageWorking: data.average_working || "-",
        averageLate: data.average_late || "-",
        absent: data.absent || "-"
      });
      setLoading(false);
    });
}

// Get today's shift info for this employee
// const todayShiftInfo = getTodayShiftInfo(
//   employee.shift,
//   employee.emp_weekoff,
//   new Date() // or dayjs().toDate() if using dayjs
// );

  //if (loading) return <div>Loading attendance...</div>;
  return (
    <div className="dashboard-container">
      <div className="dashboard-stats-card">
        <div className="stats-group">
          <div className="stats-header">Total</div>
          <div className="stats-row">
            <div>
              <div className="stats-value-main">{presentDays.length}</div>
              <div className="stats-label-sub">Present Days</div>
            </div>
            <div>
              <div className="stats-value-main">{stats.absent}</div>
              <div className="stats-label-sub">Absent Days</div>
            </div>
          </div>
        </div>
        <div className="stats-group divider">
          <div className="stats-header">Average</div>
          <div className="stats-row">
            <div>
              <div className="stats-value-main">{stats.averageWorking}</div>
              <div className="stats-label-sub">Working Hours</div>
            </div>
            <div>
              <div className="stats-value-main">{stats.averageLate}</div>
              <div className="stats-label-sub">Late By</div>
            </div>
          </div>
        </div>
        <div className="stats-group divider">
          <div className="stats-header">Shift</div>
          <div className="stats-row">
            <div>
              <div className="stats-value-main">
                {weekoffToday
                  ? "Weekoff"
                  : shiftGroupForToday === "General"
                    ? "General"
                    : shiftGroupForToday
                      ? `Shift ${shiftGroupForToday}`
                      : "-"
                }
              </div>
              <div className="stats-label-sub">
                {weekoffToday
                  ? `Today is your Weekoff (${todayDayName})`
                  : `Time: ${shiftTimingForToday.start} - ${shiftTimingForToday.end} | Today: ${todayDayName}`
                }
              </div>
            </div>
          </div>
        </div>
        <div className="stats-group divider clock-btn-group">
          <button className="clock-btn" onClick={() => setShowRegularize(true)}>
            Regularize
          </button>
          <RegularizeAttendanceModal open={showRegularize} onClose={() => setShowRegularize(false)} />
          {!isClockedIn ? (
            <button className="clock-btn" onClick={() => setShowVerifyModal(true)}>Clock - In</button>
          ) : (
            <button className="clock-btn" onClick={handleClockOut}>Clock - Out</button>
          )}
        </div>
      </div>
      {showVerifyModal && (<VerifyPage onClose={() => setShowVerifyModal(false)} />)}
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="auto"
        aspectRatio={1.5}
        datesSet={handleDatesSet}
        dayCellContent={arg => renderDayCell(arg, presentDays)}
        dayCellClassNames={arg => getDayCellClassNames(arg, presentDays, holidays)}
      />
    </div>
  );
}

// --- helper functions (minimal, no date hardcoding) ---
function getDayCellClassNames(arg, presentDays, holidays) {
  const currentDate = dayjs(arg.date).format("YYYY-MM-DD");
  const today = dayjs().format("YYYY-MM-DD");
  const weekday = dayjs(arg.date).day();
  const isHoliday = holidays.includes(currentDate);
  const isPresent = presentDays.find(d => d.date === currentDate);

  if (currentDate === today) return ["day-today"];
  if (isHoliday || weekday === 0 || weekday === 6) return ["day-weekend"];
  if (dayjs(arg.date).isBefore(today, "day")) return isPresent ? ["day-present"] : ["day-absent"];
  return [];
}

function renderDayCell(arg, presentDays) {
  const currentDate = dayjs(arg.date).format("YYYY-MM-DD");
  const match = presentDays.find(d => d.date === currentDate);
  const clockIn = match ? match.clockIn : "-";
  const clockOut = match ? match.clockOut : "-";
  //console.log("presentdays Rendering---",presentDays);
  //console.log("Rendering cell for:---", currentDate, "Clock In:", clockIn, "Clock Out:", clockOut);
  return (
    <div className="day-cell-content">
      <div className="fc-day-number">{arg.dayNumberText}</div>
      <div className="clock-line">Clock In: {clockIn}</div>
      <div className="clock-line">Clock Out: {clockOut}</div>
    </div>
  );
}
