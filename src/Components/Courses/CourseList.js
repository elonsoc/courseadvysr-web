import React from "react";
import CourseItem from "./CourseItem";

export default function CourseList({ data }) {
  return (
    <div className="m-2 space-y-4">
      {data.map((data, idx) => (
        <CourseItem key={idx} data={data} />
      ))}
    </div>
  );
}
