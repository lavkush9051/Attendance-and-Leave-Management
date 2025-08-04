/**
 * Given employee's weekoff (e.g. "Monday", or ["Saturday", "Sunday"]) and a target date,
 * returns the shift group number: 1, 2, or 3, or "General"
 */
export const getShiftGroupForDate = (empWeekoff, targetDateStr) => {
  // Accept string with commas, convert to array
  if (typeof empWeekoff === "string" && empWeekoff.includes(',')) {
    empWeekoff = empWeekoff.split(',').map(d => d.trim());
  }

  // If more than one weekoff => General shift
  if (Array.isArray(empWeekoff) && empWeekoff.length > 1) {
    return "General";
  }

  // If single day (either string or array)
  const weekoffDay = Array.isArray(empWeekoff) ? empWeekoff[0] : empWeekoff;

  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let shifts = ["Saturday", "Wednesday", "Friday", "Monday", "Thursday", "Sunday"];

  const startDate = new Date('2025-07-01');
  const targetDate = new Date(targetDateStr);

  const totalDays = Math.floor((targetDate - startDate) / (1000 * 60 * 60 * 24));
  if (totalDays < 0) return null; // Date before range

  for (let i = 0; i <= totalDays; i++) {
    let currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    let currentDay = currentDate.getDay();
    let currentWeekday = weekdays[currentDay];

    for (let j = 0; j < shifts.length; j++) {
      if (shifts[j] === currentWeekday) {
        let prevDayIdx = (weekdays.indexOf(shifts[j]) - 1 + 7) % 7;
        shifts[j] = weekdays[prevDayIdx];
      }
    }
  }

  // At the end, find the shift group for the employee's weekoff
  const idx = shifts.findIndex(day => day === weekoffDay);
  if (idx === -1) return null; // Not found

  // Map position to group: 0/1=>1, 2/3=>2, 4/5=>3
  if (idx === 0 || idx === 1) return 1;
  if (idx === 2 || idx === 3) return 2;
  if (idx === 4 || idx === 5) return 3;

  return null;
};
