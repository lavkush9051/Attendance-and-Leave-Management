// SAT+WED	FRI+MON	THU+SUN

//const shift1 = ["Saturday", "Wednesday"];
//const shift2 = ["Friday", "Monday"];
//const shift3 = ["Thursday", "Sunday"];
const weekoff = "Tuesday";
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const initialShifts = ["Saturday", "Wednesday", "Friday", "Monday", "Thursday", "Sunday"];
const startDate = new Date('2025-07-01');
const endDate = new Date('2025-07-31');

// Print initial shifts at the start
console.log("Initial Shifts:", initialShifts.join(", "));

for (let i = 0; i < 60; i++) { // 31 days in July
    // Create a new date for each day in July
    let currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    let currentDay = currentDate.getDay(); // 0 (Sun) ... 6 (Sat)
    let currentWeekday = weekdays[currentDay];

    // Print the current date and weekday
    console.log(`\nDate: ${currentDate.toISOString().substring(0, 10)}, Weekday: ${currentWeekday}`);

    // Example: print shifts that match the current weekday
    for (let j = 0; j < initialShifts.length; j++) {
        if (initialShifts[j] === currentWeekday) {
            // Find previous day (handling Sunday->Saturday)
            let prevDayIdx = (weekdays.indexOf(initialShifts[j]) - 1 + 7) % 7;
            let prevDay = weekdays[prevDayIdx];
            initialShifts[j] = prevDay;

            // Print updated shifts after modification
            console.log("Updated initialShifts:", initialShifts.join(", "));
        }
    }
}