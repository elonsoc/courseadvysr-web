import React from "react";

export default function Navigation() {

  return (
    <div
      className="flex flex-row justify-items items-center h-14  
        w-auto px-4 shadow-md"
    >
      <a href="/courses">
        <div className="flex flex-row items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6"
          >
            <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path
              fill="#fff"
              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 
              11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 
              12.078 0 01.665-6.479L12 14z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 
              01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 
              00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 
              6v-7.5l4-2.222"
            />
          </svg>
          <h1 className="text-lg font-bold">CourseAdvysr</h1>
        </div>
      </a>
  
      <div className="m-auto mr-0">
        <div className="flex justify-start">
          <a className="mx-2" href="/courses">
            Courses
          </a>
          <a className="mx-2" href="/catalog">
            Catalog
          </a>
          <a className="mx-2" href="/schedule">
            Schedule
          </a>
          <a className="mx-2" href="/me">
            Me
          </a>
          <a className="mx-2" href="/logout">
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}
