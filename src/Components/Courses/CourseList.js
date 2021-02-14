import React from "react";
import CourseItem from "./CourseItem";

export default function CourseList({ data }) {
  return (
    <div className="m-2 space-y-4">
      <div className="top-0 hidden md:visible m-2 p-3  md:space-x-4 md:grid grid-cols-10 md:grid-flow-col">
        <div>Add</div>
        <div>CRN</div>
        <div className="col-span-2">Title</div>
        <div>Course</div>
        <div>Faculty</div>
        <div>Time</div>
        <div>Days</div>
        <div>Seats</div>
        <div className=" text-right">Status</div>
      </div>
      {data.map((data, idx) => (
        <CourseItem key={idx} data={data} />
      ))}
    </div>
  );
}
