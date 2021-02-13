import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/tailwind.output.css";

function App() {
  const history = useHistory();

  const handleLogin = () => {
    history.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-center">
              <h1 className="text-3xl font-bold">Courseadvysr</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-9 w-9"
              >
                <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path
                  fill="#fff"
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p>
                  The <span className="font-bold text-gray-900"> best </span>{" "}
                  way to find courses to take.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-8  md:space-y-0 md:space-x-6 md:flex-row">
              <button
                onClick={() => history.push("/login")}
                className="w-1/2 h-9 flex items-center justify-center rounded-xl bg-black text-white"
              >
                {" "}
                Login{" "}
              </button>
              <button
                onClick={() => history.push("/register")}
                className="w-1/2 h-9 flex items-center justify-center rounded-xl bg-black text-white"
              >
                {" "}
                Sign Up{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
