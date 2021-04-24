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
        <span>
          {Number(data.meetingTimes[0].substring(0, 2)) > 12
            ? "0" +
              (Number(data.meetingTimes[0].substring(0, 2)) - 12) +
              data.meetingTimes[0].substring(2, 5) +
              "pm"
            : Number(data.meetingTimes[0].substring(0, 2)) === 12
            ? data.meetingTimes[0] + "pm"
            : data.meetingTimes[0] + "am"}
          {"\t"}-{"\t"}
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
    return `${curr < 10 ? (curr < 0 ? curr : "0" + curr) : curr}/${
      max < 10 ? (max < 0 ? max : "0" + max) : max
    }`;
  };

  return (
    <div
      onClick={() => revealModal(data.courseRegistrationNumber)}
      className="space-y-4"
    >
      <div className="p-3 space-y-1 border-gray-400 border-2 rounded lg:transition lg:duration-200 lg:ease-in-out lg:hover:shadow-xl lg:transform lg:hover:-translate-y-1">
        <div className="relative lg:grid course lg:grid-flow-col">
          <div className="lg:relative absolute bottom-0">
            <svg
              className="w-10 h-10 lg:w-6 lg:h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7 14h-5v5h-4v-5h-5v-4h5v-5h4v5h5v4z" />
            </svg>
          </div>
          <div>{data.courseRegistrationNumber}</div>
          <div className="">{data.courseTitle}</div>
          <div className="">
            <span>
              {data.courseSubject}-{data.courseNumber}({data.courseSection})
            </span>
          </div>
          <div className="">{data.faculty}</div>

          <div className="text-right lg:text-left">{MeetingTime()}</div>
          <div className="text-right lg:hidden">
            <span>
              {data.meetingDays.map((day: string, idx: Number) =>
                data.meetingDays.length > 1
                  ? idx === data.meetingDays.length - 1
                    ? day
                    : day + ", "
                  : day
              )}
            </span>
          </div>
          <div className="hidden lg:block">{MeetingDays()}</div>
          <div className="text-right lg:text-left">
            {data.meetingBuilding}, {data.meetingRoom}
          </div>

          <div className="text-right lg:hidden lg:relative absolute lg:text-left top-0 right-0 ">
            <div className="">{Seats(data.currStudents, data.maxStudents)}</div>
            <div className="">
              <span
                className={
                  `rounded-lg mt-2 p-1 text-white ` +
                  (data.sectionStatus === "Closed"
                    ? `bg-red-600`
                    : data.sectionStatus === "Waitlisted"
                    ? `bg-yellow-400`
                    : data.sectionStatus === "Open"
                    ? `bg-green-600`
                    : `bg-none`)
                }
              >
                {data.sectionStatus}
              </span>
            </div>
          </div>

          <div className="hidden font-mono  lg:block">
            {Seats(data.currStudents, data.maxStudents)}
          </div>
          <div className="text-right hidden m:0 lg:block">
            <span
              className={
                data.sectionStatus === "Closed"
                  ? "bg-red-600 rounded-lg p-2 text-white"
                  : data.sectionStatus === "Waitlisted"
                  ? "bg-yellow-400 rounded-lg p-2 text-white"
                  : data.sectionStatus === "Open"
                  ? "bg-green-600 rounded-lg p-2 text-white"
                  : "bg-none"
              }
            >
              {data.sectionStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
