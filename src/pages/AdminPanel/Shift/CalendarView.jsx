// CalendarView.jsx
import React, { useState } from 'react';
import './CalendarView.css'; // Import your styles

export default function CalendarView({ data }) {
  // --- Month to display (July 2025) ---
  const month = 6; // 0-based, July = 6
  const year = 2025;
  const daysInMonth = 31;
  const [modalInfo, setModalInfo] = useState({ open: false, date: '', employees: [] });
  const todayStr = new Date().toISOString().split('T')[0];
  // Prepare grid (Sun-Sat headers)
  const getMonthGrid = () => {
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const grid = [];
    let day = 1 - firstDayOfWeek;
    for (let row = 0; row < 6; row++) {
      const week = [];
      for (let col = 0; col < 7; col++) {
        if (day >= 1 && day <= daysInMonth) {
          week.push({ day, date: `${year}-07-${String(day).padStart(2, '0')}` });
        } else {
          week.push(null);
        }
        day++;
      }
      grid.push(week);
    }
    return grid;
  };

  // For a date, get all present employees from CSV data
  const getEmployeesForDate = (dateStr) => {
    // Use only employees present that day
    return data.filter(row => row.Date === dateStr);
  };

  // Open modal with info for that date
  const handleDayClick = (dateStr) => {
    const employees = getEmployeesForDate(dateStr);
    setModalInfo({ open: true, date: dateStr, employees });
  };

  const closeModal = () => setModalInfo({ ...modalInfo, open: false });

  // Render calendar
  const monthGrid = getMonthGrid();

  return (
    <div className="calendar-view-csv">
      <h3>Employee Calendar – July 2025</h3>
      <div className="calendar-table">
        <div className="calendar-header-row">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(day => (
            <div className="calendar-header-cell" key={day}>{day}</div>
          ))}
        </div>
        {monthGrid.map((week, rowIdx) => (
          <div className="calendar-week-row" key={rowIdx}>
            {week.map((cell, colIdx) => {
              if (!cell) return <div className="calendar-cell empty" key={colIdx}></div>;
              const presentEmps = getEmployeesForDate(cell.date);
              return (
                <div
                    className={
                      "calendar-cell" +
                      (cell.date === todayStr ? " today" : "")
                    }
                    key={colIdx}
                    onClick={() => presentEmps.length && handleDayClick(cell.date)}
                    title={presentEmps.length > 0 ? 'Click for details' : ''}
                    style={{
                      background: cell.date === todayStr
                        ? undefined // let CSS handle today color!
                        : presentEmps.length
                          ? '#ecf4fc'
                          : '#f8f8fa',
                      cursor: presentEmps.length ? 'pointer' : 'default'
                    }}
                  >
                    <div className="calendar-cell-day">{cell.day}</div>
                    <div className="calendar-cell-count">
                      {presentEmps.length} present
                    </div>
                  </div>
              );
            })}
          </div>
        ))}
      </div>
      {modalInfo.open && (
        <div className="calendar-modal-overlay" onClick={closeModal}>
          <div className="calendar-modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={closeModal}>✖</button>
            <h4>Present Employees: {modalInfo.date}</h4>
            <div style={{maxHeight: '300px', overflowY: 'auto'}}>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Shift</th>
                    <th>Weekoff</th>
                  </tr>
                </thead>
                <tbody>
                  {modalInfo.employees.map((emp, idx) => (
                    <tr key={idx}>
                      <td>{emp["Employee Name"]}</td>
                      <td>{emp["Shift"]}</td>
                      <td>{emp["Weekoff"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
