const weekDays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

export const employees = Array.from({length:50}, (_,i)=>{
  // Assign two different week off days for each employee, change logic as you wish!
  const firstDay = weekDays[i % 7];
  const secondDay = weekDays[(i*2+3) % 7]; // Ensures not same as firstDay (for variety)
  return {
    id: i+1,
    name: `Employee ${i+1}`,
    dept: ["IT","HR","Finance","Ops"][i%4],
    manager: ["Alice","Bob","Carol"][i%3],
    shift: ["A","B","C"][i%3],
    status: i%5===0?"Inactive":"Active",
    role: ["Employee","Manager"][i%2],
    weekOff: [firstDay, secondDay]
  }
});


export const swapRequests = [
  { id:1, from:"Employee 3", to:"Employee 8", date:"2025-07-05", status:"Pending" },
  { id:2, from:"Employee 12", to:"Employee 29", date:"2025-07-07", status:"Pending" },
];

export const auditEvents = [
  { id:1, msg:"Initial data load", time: new Date() },
];
