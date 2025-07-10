import React from "react";

export default function Pagination({ total, pageSize, current, onPageChange }) {
  const pages = Math.ceil(total/pageSize);
  if(pages<=1) return null;
  return (
    <div className="pagination">
      {Array.from({length:pages}, (_,i)=>i+1).map(p=>(
        <button
          key={p}
          className={p===current?"active":""}
          onClick={()=>onPageChange(p)}
        >{p}</button>
      ))}
    </div>
  );
}
