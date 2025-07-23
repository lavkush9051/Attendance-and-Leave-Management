// mockData.js

// Weekoff types for shifts
// const shifts = ['I', 'II', 'III'];
// const weekOffs = {
//   I: ['Saturday', 'Wednesday'],
//   II: ['Friday', 'Monday'],
//   III: ['Thursday', 'Sunday']
// };

// let employees = [];
// let empId = 1;

// shifts.forEach(shift => {
//   weekOffs[shift].forEach(day => {
//     for (let i = 0; i < 7; i++) {
//       employees.push({
//         id: empId,
//         name: `Employee ${empId}`,
//         dept: "Traffic",
//         manager: ["Alice", "Bob", "Carol"][empId % 3],
//         shift: shift,
//         startShift: shift,
//         weekOff: day,
//         status: "Active",
//         role: "Employee"
//       });
//       empId++;
//     }
//   });
// });

// Generate 42 shift employees (14 per shift, 7 per week-off group)
// Generate 42 shift employees + 7 general employees
// Generate 42 shift employees (14 per shift, 7 per week-off group)
export const generateEmployees = () => {
  const shifts = ['I', 'II', 'III'];
  const initialWeekOffs = {
    'I': ['SAT', 'WED'],
    'II': ['FRI', 'MON'],
    'III': ['THU', 'SUN']
  };

  let employees = [];
  let empId = 1;

  // Create 42 shift employees (14 per shift: 7 per week-off group)
  shifts.forEach(shift => {
    initialWeekOffs[shift].forEach(day => {
      for (let i = 0; i < 7; i++) {
        employees.push({
          id: empId,
          name: `Employee ${empId}`,
          dept: "Traffic",
          manager: ["Alice", "Bob", "Carol"][empId % 3],
          shift: shift,
          initialWeekOff: day,
          status: "Active",
          role: "Employee"
        });
        empId++;
      }
    });
  });

  // Create 7 general employees (always on leave)
  for (let i = 0; i < 7; i++) {
    employees.push({
      id: empId,
      name: `General Emp ${i+1}`,
      dept: ["IT", "HR", "Finance", "Ops"][i % 4],
      manager: ["Alice", "Bob", "Carol"][empId % 3],
      shift: "General",
      initialWeekOff: "ALWAYS",
      status: "Active",
      role: "General"
    });
    empId++;
  }

  return employees;
};
export const employees = generateEmployees();

// Placeholder data
export const swapRequests = [];
export const auditEvents = [];