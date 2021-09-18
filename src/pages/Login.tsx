import React, { MouseEvent, useState } from "react";
import Axios from "axios";
import environ from "../helpers/prod-or-dev";
import { useHistory } from "react-router-dom";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const handleSubmit = (e: MouseEvent | KeyboardEvent) => {
    e.preventDefault();

    //AXIOS writes things in application/json not multipart/form-data, which brought CORS errors.
    //maybe we'll get to the point where we are able to handle application/json, probably when we're
    //taking data to store in the db

    //PREFLIGHT requires the server to accept an OPTIONS method as well, which we now do.
    //We will probably have to accept an OPTIONS method every. single. request.

    Axios({
      method: "post",
      url: environ() + "/login",
      data: { username: username.toLowerCase(), password: password },
      withCredentials: true,
    })
      .then((response) => {
        if (response.status === 200) {
        
          //possibly stupid way of clearing but idgaf

          setUsername("");
          setPassword("");
          history.push("/courses");
        }
      })
      .catch((response) => {
        //TODO: alert user to wrong password or without password
        alert("nope");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-200 sm:max-w-sm sm:mx-auto">
        <div className="relative px-20 py-20 bg-white shadow-lg sm:rounded-3xl ">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-center">
              <h1 className="text-3xl pb-5 font-bold">Login</h1>
            </div>

            <div className="flex flex-col items-center justify-center py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                className="w-80 focus:outline-none focus:border-gray-500 border-b-2"
                type="username"
              />

              <input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                //TODO: this is a keyboard event but... handleSubmit takes either a KeyboardEvent or MouseEvent; which  onKeyDown is neither??
                onKeyDown={(e: any) =>
                  e.onKeyDown?.name === "Enter" ? handleSubmit(e) : null
                }
                className="w-80 focus:outline-none focus:border-gray-500 border-b-2"
                type="password"
              />

              <button
                type="submit"
                onClick={handleSubmit}
                className="w-1/2 h-9 flex items-center justify-center rounded-xl bg-black text-white"
              >
                Login
              </button>
            </div>
            <hr className="border-gray-400" />
          </div>

          <div className="flex py-4 items-center justify-center">
            <p className="text-center"> Don't have an account?</p>
            <button
              type="submit"
              onClick={() => history.push("/register")}
              className="w-1/2 h-9 flex items-center justify-center rounded-xl bg-black text-white"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
