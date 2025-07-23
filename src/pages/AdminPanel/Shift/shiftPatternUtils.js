
// Precompute shift patterns and employee week-offs
const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const initialShifts = {
  'I': ['SAT', 'WED'],
  'II': ['FRI', 'MON'],
  'III': ['THU', 'SUN']
};

const startDate = new Date('2025-07-01');
const endDate = new Date('2025-12-31');

// Precompute for each group (shift + initial week-off)
const groupRotation = {};

for (const shift in initialShifts) {
  initialShifts[shift].forEach(initialWeekOff => {
    const groupKey = `${shift}-${initialWeekOff}`;
    groupRotation[groupKey] = {};
    let current = initialWeekOff;
    let currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate <= lastDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      groupRotation[groupKey][dateStr] = current;
      
      // Rotate if today is the group's week-off
      const day = weekdays[currentDate.getDay()];
      if (day === current) {
        const dayIndex = weekdays.indexOf(current);
        current = weekdays[(dayIndex - 1 + 7) % 7]; // Previous day
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });
}

// Helper to get current week-off for an employee on a date
export const getEmployeeShiftForDate = (employee, date) => {
  const dateStr = new Date(date).toISOString().split('T')[0];
  
  if (employee.shift === 'General') {
    return { 
      shift: 'General', 
      weekOff: 'ALWAYS' 
    };
  }
  
  const groupKey = `${employee.shift}-${employee.initialWeekOff}`;
  const weekOffCode = groupRotation[groupKey]?.[dateStr] || 'SUN';
  
  // Convert to full day name
  const weekOffMap = {
    'SUN': 'Sunday',
    'MON': 'Monday',
    'TUE': 'Tuesday',
    'WED': 'Wednesday',
    'THU': 'Thursday',
    'FRI': 'Friday',
    'SAT': 'Saturday'
  };
  
  return {
    shift: employee.shift,
    weekOff: weekOffMap[weekOffCode] || weekOffCode
  };
};

// Generate shift patterns for calendar view
export const getShiftPatterns = (start, end) => {
  const patterns = {};
  let current = new Date(start);
  const last = new Date(end);
  
  // Deep copy initial shifts
  let currentShifts = JSON.parse(JSON.stringify(initialShifts));
  
  while (current <= last) {
    const dateStr = current.toISOString().split('T')[0];
    const day = weekdays[current.getDay()];
    
    patterns[dateStr] = {
      day: day,
      shifts: {
        'I': [...currentShifts.I],
        'II': [...currentShifts.II],
        'III': [...currentShifts.III]
      }
    };
    
    // Rotate week-off days if needed
    Object.keys(currentShifts).forEach(shift => {
      currentShifts[shift].forEach((offDay, idx) => {
        if (offDay === day) {
          const dayIndex = weekdays.indexOf(day);
          const prevDay = weekdays[(dayIndex - 1 + 7) % 7];
          currentShifts[shift][idx] = prevDay;
        }
      });
    });
    
    current.setDate(current.getDate() + 1);
  }
  
  return patterns;
};

// Get all shift patterns for 2025
export const shiftPatterns = getShiftPatterns(
  new Date('2025-01-01'),
  new Date('2025-12-31')
);


// New helper to get shift pattern for a specific date
export const getShiftPatternForDate = (date) => {
  const dateStr = new Date(date).toISOString().split('T')[0];
  const pattern = shiftPatterns[dateStr];
  
  if (!pattern) return { I: [], II: [], III: [] };
  
  // Convert to full day names
  const convertDay = (abbr) => {
    const map = {
      'SUN': 'Sunday',
      'MON': 'Monday',
      'TUE': 'Tuesday',
      'WED': 'Wednesday',
      'THU': 'Thursday',
      'FRI': 'Friday',
      'SAT': 'Saturday'
    };
    return map[abbr] || abbr;
  };
  
  return {
    I: pattern.shifts.I.map(convertDay),
    II: pattern.shifts.II.map(convertDay),
    III: pattern.shifts.III.map(convertDay)
  };
};