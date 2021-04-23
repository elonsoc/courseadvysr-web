import React from "react";
import CourseItem from "./CourseItem";
import { Course } from "../types";
import "../../styles/courses.css";

type CourseListProps = {
  list: Course[];
  revealModal: Function;
};

export default function CourseList({ list, revealModal }: CourseListProps) {
  return (
    <div className="space-y-4">
      <div className="px-4 top-0 hidden lg:visible lg:grid course lg:grid-flow-col">
        <div></div>
        <div>CRN</div>
        <div className="">Title</div>
        <div>Course</div>
        <div>Faculty</div>
        <div>Time</div>
        <div>Days</div>
        <div>Location</div>
        <div>Seats</div>
        <div className=" text-right">Status</div>
      </div>
      {list.map((data: Course, idx: number) => (
        <CourseItem
          revealModal={(crn: String) => revealModal(crn)}
          key={idx}
          data={data}
        />
      ))}
    </div>
  );
}
