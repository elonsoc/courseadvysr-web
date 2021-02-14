import React from "react";

export default function CourseItem({ data }) {
  const MeetingTime = () => {
    return (
      <>
        <span>
          {data.meetingTimes[0].substring(0, 2) > 12
            ? "0" +
              (data.meetingTimes[0].substring(0, 2) - 12) +
              data.meetingTimes[0].substring(2, 5) +
              "pm"
            : data.meetingTimes[0].substring(0, 2) == 12
            ? data.meetingTimes[0] + "pm"
            : data.meetingTimes[0] + "am"}
          {"\t"}-{"\t"}
          {data.meetingTimes[1].substring(0, 2) > 12
            ? "0" +
              (data.meetingTimes[1].substring(0, 2) - 12) +
              data.meetingTimes[1].substring(2, 5) +
              "pm"
            : data.meetingTimes[1].substring(0, 2) == 12
            ? data.meetingTimes[1] + "pm"
            : data.meetingTimes[1] + "am"}
        </span>
      </>
    );
  };

  const MeetingPlace = () => {
    return (
      <span>
        {data.meetingBuilding}, {data.meetingRoom}
      </span>
    );
  };

  const ClassCode = () => {
    return (
      <span>
        {data.courseSubject}-{data.courseNumber}({data.courseSection})
      </span>
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

  return (
    <div className="m-2 space-y-4">
      <div className="p-3 space-y-1 border-gray-400 border-2 rounded md:transition md:duration-200 md:ease-in-out md:hover:shadow-xl md:transform md:hover:-translate-y-1">
        <div className="relative md:space-x-4 md:grid grid-cols-10 md:grid-flow-col">
          <div className="md:relative absolute bottom-0">
            <svg
              className="w-10 h-10 md:w-6 md:h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7 14h-5v5h-4v-5h-5v-4h5v-5h4v5h5v4z" />
            </svg>
          </div>
          <div>{data.courseRegistrationNumber}</div>
          <div className="col-span-2">{data.courseTitle}</div>
          <div className="">{ClassCode()}</div>
          <div className="">{data.faculty}</div>

          <div className="text-right md:text-left">
            {MeetingTime(data.meetingTimes)}
          </div>
          <div className="text-right md:hidden">
            <span>
              {data.meetingDays.map((day, idx) =>
                data.meetingDays.length > 1
                  ? idx == data.meetingDays.length - 1
                    ? day
                    : day + ", "
                  : day
              )}
            </span>
          </div>
          <div className="hidden md:block">{MeetingDays()}</div>
          <div className="text-right md:hidden">
            {data.meetingBuilding}, {data.meetingRoom}
          </div>

          <div className="text-right md:hidden md:relative absolute md:text-left top-0 right-0 ">
            <div className="">
              {data.currStudents < 10
                ? String(data.currStudents) == -1
                  ? data.currStudents
                  : "0" + data.currStudents
                : data.currStudents}
              /{data.maxStudents}
            </div>
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

          <div className="hidden font-mono  md:block">
            {data.currStudents < 10
              ? data.currStudents == -1
                ? data.currStudents
                : "0" + data.currStudents
              : data.currStudents}
            /{data.maxStudents}
          </div>
          <div className="text-right hidden md:block">
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
