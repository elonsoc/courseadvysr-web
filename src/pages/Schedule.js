import React from "react";
import Navigation from "../Components/navigation";

function Schedule() {
  const dotw = ["M", "Tu", "W", "Th", "F"];
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-green-400">
        <div
          style={{
            flex: 1,
            position: "relative",
            borderBottom: "1px solid black",
            borderRight: "1px solid black",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "2px",
              right: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {new Array((21 * 60 - 8 * 60) / 60).fill().map((_, i) => {
              const time = 8 * 60 + i * 60;
              return (
                <div
                  style={{ position: "relative", flex: 1, marginTop: "-0.5em" }}
                  key={time}
                >
                  <span
                    style={{
                      display: "block",
                      paddingRight: "8px",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    {time / 60 > 12 ? time / 60 - 12 + "pm" : time / 60 + "am"}
                  </span>
                </div>
              );
            })}
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              right: 0,
              display: "flex",
            }}
          >
            {dotw.map((day) => (
              <div
                style={{
                  position: "relative",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",

                  justifyContent: "center",
                }}
                key={day}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    paddingBottom: "8px",
                  }}
                >
                  {day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Schedule;
