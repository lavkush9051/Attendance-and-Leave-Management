import React, { useEffect, useState, useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import dayjs from "dayjs";
import './Dashboard.css';
import VerifyModal from "../VerifyPage"; // New: modal for camera/card
import { AuthContext } from '../../context/AuthContext';
import RegularizeAttendanceModal from "../../components/RegularizeAttendanceModal/RegularizeAttendanceModal";

function formatTime(iso) {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}


const Dashboard = () => {
  const [presentDays, setPresentDays] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const { isClockedIn, clockOut } = useContext(AuthContext);
  const { attendanceLog } = useContext(AuthContext);

  const handleClockOut = () => {
    clockOut();
    // Optionally, show message or redirect to dashboard
  };

  const [showRegularize, setShowRegularize] = useState(false);
  const [regForm, setRegForm] = useState({
    clockIn: "",
    clockOut: "",
    reason: ""
  });

  useEffect(() => {
    setPresentDays([
      { date: "2025-06-02", clockIn: "09:15 AM", clockOut: "05:45 PM" },
      { date: "2025-06-03", clockIn: "09:10 AM", clockOut: "06:00 PM" },
      { date: "2025-06-04", clockIn: "09:10 AM", clockOut: "06:00 PM" },
      { date: "2025-06-05", clockIn: "09:10 AM", clockOut: "06:00 PM" },
    ]);
    setHolidays(["2025-06-08", "2025-06-15"]);
  }, []);

  useEffect(() => {
  // Group log by date, pick first IN and last OUT for each date
    const byDate = {};
    attendanceLog.forEach(entry => {
      const date = entry.timestamp.slice(0, 10); // "YYYY-MM-DD"
      if (!byDate[date]) byDate[date] = { clockIns: [], clockOuts: [] };
      if (entry.type === "IN") byDate[date].clockIns.push(entry.timestamp);
      if (entry.type === "OUT") byDate[date].clockOuts.push(entry.timestamp);
    });

    const present = Object.keys(byDate).map(date => {
      const inTimes = byDate[date].clockIns.sort();
      const outTimes = byDate[date].clockOuts.sort();
      return {
        date,
        clockIn: inTimes.length ? formatTime(inTimes[0]) : "-",
        clockOut: outTimes.length ? formatTime(outTimes[outTimes.length - 1]) : "-"
      };
    });
    setPresentDays(present);
  }, [attendanceLog]);

  return (
    <div className="dashboard-container">
      {/* Stats Card */}
      <div className="dashboard-stats-card">
        <div className="stats-group">
          <div className="stats-header">Total</div>
          <div className="stats-row">
            <div>
              <div className="stats-value-main">{presentDays.length}</div>
              <div className="stats-label-sub">Present Days</div>
            </div>
            <div>
              <div className="stats-value-main">{getAbsentDays(presentDays)}</div>
              <div className="stats-label-sub">Absent Days</div>
            </div>
          </div>
        </div>
        <div className="stats-group divider">
          <div className="stats-header">Average</div>
          <div className="stats-row">
            <div>
              <div className="stats-value-main">{getAverageWorkingHours(presentDays)}</div>
              <div className="stats-label-sub">Working Hours</div>
            </div>
            <div>
              <div className="stats-value-main">{getAverageLateBy(presentDays)}</div>
              <div className="stats-label-sub">Late By</div>
            </div>
          </div>
        </div>
        <div className="stats-group divider">
          <div className="stats-header">Shift</div>
          <div className="stats-row">
            <div>
              <div className="stats-value-main">A (07:00 - 15:30)</div>
              <div className="stats-label-sub">Current Shift</div>
            </div>
          </div>
        </div>
        {/* CLOCKIN/CLOCKOUT BUTTON */}
        
        <div className="stats-group divider clock-btn-group">
          <button className="clock-btn" onClick={() => setShowRegularize(true)}>
            Regularize
          </button>
          <RegularizeAttendanceModal
            open={showRegularize}
            onClose={() => setShowRegularize(false)}
            user={{ name: "Lavkush" }} // Or use from AuthContext
          />

          {!isClockedIn ? (<button className="clock-btn" onClick={() => setShowVerifyModal(true)}>
            Clock - In
          </button>):(
            <button className="clock-btn" onClick={handleClockOut}>
              Clock - Out
            </button>
          )}
        </div>
        
      </div>
      

      {/* Verify Modal */}
      {showVerifyModal && (
        <VerifyModal onClose={() => setShowVerifyModal(false)} />
      )}

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="auto"
        aspectRatio={1.5}
        dayCellContent={arg => renderDayCell(arg, presentDays)}
        dayCellClassNames={arg => getDayCellClassNames(arg, presentDays, holidays)}
      />
    </div>
  );
};

// --- helper functions (unchanged) ---
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

function getAbsentDays(presentDays) {
  const month = 5; // 0-based: 5=June
  const year = 2025;
  const presentSet = new Set(presentDays.map(d => d.date));
  let totalWorkingDays = 0;
  for (let day = 1; day <= 30; day++) {
    const date = dayjs(`${year}-06-${String(day).padStart(2, "0")}`);
    if (![0, 6].includes(date.day())) totalWorkingDays++;
  }
  return totalWorkingDays - presentSet.size;
}

function getAverageWorkingHours(presentDays) {
  if (presentDays.length === 0) return "-";
  let total = 0;
  presentDays.forEach(d => {
    const start = dayjs(`2025-01-01 ${d.clockIn}`, "YYYY-MM-DD hh:mm A");
    const end = dayjs(`2025-01-01 ${d.clockOut}`, "YYYY-MM-DD hh:mm A");
    total += end.diff(start, "minute");
  });
  const avg = total / presentDays.length;
  const hours = Math.floor(avg / 60);
  const minutes = Math.round(avg % 60);
  return `${hours}h ${minutes}m`;
}

function getAverageLateBy(presentDays) {
  if (presentDays.length === 0) return "-";
  let total = 0;
  const standardTime = dayjs("2025-01-01 09:00 AM", "YYYY-MM-DD hh:mm A");
  presentDays.forEach(d => {
    const inTime = dayjs(`2025-01-01 ${d.clockIn}`, "YYYY-MM-DD hh:mm A");
    const late = Math.max(0, inTime.diff(standardTime, "minute"));
    total += late;
  });
  const avg = total / presentDays.length;
  if (avg < 1) return "On Time";
  const hours = Math.floor(avg / 60);
  const minutes = Math.round(avg % 60);
  return `${hours}h ${minutes}m`;
}

export default Dashboard;
