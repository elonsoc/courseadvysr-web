import React from "react";
import { Course } from "../types";
import "../../styles/courses.css";
type CourseItemProps = {
  data: Course;
  revealModal: Function;
};

export default function CourseItem({ data, revealModal }: CourseItemProps) {
  const MeetingTime = () => {
    return (
      <>
        <span className="text-center">
          {Number(data.meetingTimes[0].substring(0, 2)) > 12
            ? "0" +
            (Number(data.meetingTimes[0].substring(0, 2)) - 12) +
            data.meetingTimes[0].substring(2, 5) +
            "pm"
            : Number(data.meetingTimes[0].substring(0, 2)) === 12
              ? data.meetingTimes[0] + "pm"
              : data.meetingTimes[0] + "am"}
          {"\t\t"}
          {Number(data.meetingTimes[1].substring(0, 2)) > 12
            ? "0" +
            (Number(data.meetingTimes[1].substring(0, 2)) - 12) +
            data.meetingTimes[1].substring(2, 5) +
            "pm"
            : Number(data.meetingTimes[1].substring(0, 2)) === 12
              ? data.meetingTimes[1] + "pm"
              : data.meetingTimes[1] + "am"}
        </span>
      </>
    );
  };

  const MeetingDays = () => {
    return (
      <span>
        {data.meetingDays.map((day, idx) => {
          if (idx + 1 === data.meetingDays.length) {
            return (
              <span key={idx}>
                {day.substring(0, 1) === "T"
                  ? day.substring(0, 2)
                  : day.substring(0, 1)}
              </span>
            );
          } else {
            return (
              <span key={idx}>
                {day.substring(0, 1) === "T"
                  ? day.substring(0, 2)
                  : day.substring(0, 1)}
              </span>
            );
          }
        })}{" "}
      </span>
    );
  };

  const Seats = (curr: number, max: number) => {
    return `${curr < 10 ? (curr < 0 ? curr : "0" + curr) : curr}/${max < 10 ? (max < 0 ? max : "0" + max) : max
      }`;
  };

  return (
    <div
      onClick={() => revealModal(data.courseRegistrationNumber)}
    >
      <div className="mx-2 text-sm space-y-1 grid grid-flow-col grid-cols-16 gap-x-1 border-gray-400 border-2 rounded transition duration-200 ease-in-out hover:shadow-xl transform hover:-translate-y-1">

          <div className="col-span-1 flex flex-col items-center justify-center">
            <button className="">
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7 14h-5v5h-4v-5h-5v-4h5v-5h4v5h5v4z" />
              </svg>
            </button>
            <div className="col-span-1">{data.courseRegistrationNumber}</div>
          </div>
          
          <div className="flex items-center col-span-3">{data.courseTitle}</div>
          <div className="flex items-center col-span-2">

            {data.courseSubject}-{data.courseNumber}({data.courseSection})

          </div>
          <div className="flex items-center col-span-2 text-left">{data.faculty}</div>
          <div className="flex items-center col-span-1 justify-center">{MeetingDays()}</div>
          <div className="flex items-center col-span-1 justify-center">{MeetingTime()}</div>
          
          
          <div className="flex text-center justify-center items-center col-span-4 ">
            {data.meetingBuilding}, {data.meetingRoom}
          </div>

          <div className="flex items-center justify-center col-span-1 font-mono">
            {Seats(data.currStudents, data.maxStudents)}
          </div>
          <div className="flex items-center col-span-1  justify-center text-right m:0 lg:block">
            <span
              className={
                data.sectionStatus === "Closed"
                  ? "bg-red-600 rounded-md p-1 text-white"
                  : data.sectionStatus === "Waitlisted"
                    ? "bg-yellow-400 rounded-md p-1 text-white"
                    : data.sectionStatus === "Open"
                      ? "bg-green-600 rounded-md p-1 text-white"
                      : "bg-none"
              }
            >
              {data.sectionStatus}
            </span>
          </div>

      </div>
    </div>
  );
}
