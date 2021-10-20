import React, { MouseEvent } from "react";

import Axios from "axios";
import { useState } from "react";
import environ from "../helpers/prod-or-dev";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [email, setEmail] = useState("");
  const [refEmail, setRefEmail] = useState("");
  
  const [hasRef, setHasRef] = useState(false);
  const history = useHistory();


  // const user = useUserState();
  useEffect(() => {
    setHasRef(window.location.search.includes("?ref="));
    if (hasRef) {
      setRefEmail(
        window.location.search.includes("?ref=")
          ? window.location.search.split("ref=")[1].split("/")[0]
          : ""
      );
    }
  }, [hasRef]);

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    //AXIOS writes things in application/json not multipart/form-data, which brought CORS errors.
    //maybe we'll get to the point where we are able to handle application/json, probably when we're
    //taking data to store in the db

    //PREFLIGHT requires the server to accept an OPTIONS method as well, which we now do.
    //We will probably have to accept an OPTIONS method every. single. request.
    if (
      // Maybe add check for "elon.edu" if that isnt a thing elsewhere
      email !== "" &&
      username !== "" &&
      password !== "" &&
      refEmail !== "" &&
      password === checkPassword
    ) {
      /**
                TODO: fix up so we can write status lines directly from the
                server OR have consistent lines for any mess-ups. Currently,
                everything is hardcoded. No Bueno.

                TODO: 
      **/
      Axios({
        method: "post",
        url: environ() + "/register",
        data: {
          username: username.toLowerCase(),
          password: password,
          email: email.toLowerCase(),
          referrer: refEmail.toLowerCase(),
        },
        withCredentials: true,
      })
        .then((response) => {
          if (response.status === 200) {
            // Prob should make a better reset procedure
            setUsername("");
            setPassword("");
            setCheckPassword("");
            setEmail("");
            setRefEmail("");

            history.push("/courses");
          } else {
            alert("Error: Bad Response");
          }
        })
        .catch((response) => {
          console.log(
            "That email or username already exists. Did you forget your login information?"
          );
        });
    } else {
      if (password !== checkPassword) {
        console.log("Your passwords don't match.");

        setCheckPassword("");
        setPassword("");
      } else {
        console.log(
          "Not everything is filled out. Please fill everything out!"
        );
      }

      
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-200 sm:max-w-sm sm:mx-auto">
        <div className="relative px-20 py-20 bg-white shadow-lg sm:rounded-3xl ">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-center">
              <h1 className="text-3xl pb-5 font-bold">Register</h1>
            </div>

            <div className="flex flex-col items-center justify-center py-4  text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                className=" w-80 focus:outline-none focus:border-gray-500 border-b-2"
                type="username"
              />

              <input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-80 focus:outline-none focus:border-gray-500 border-b-2"
                type="password"
              />

              <input
                placeholder="Check Password"
                onChange={(e) => setCheckPassword(e.target.value)}
                className="w-80 focus:outline-none focus:border-gray-500 border-b-2"
                type="password"
              />

              <input
                placeholder="@elon.edu Email"
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e: any) =>
                  e.key === "Enter" ? handleSubmit(e) : null
                }
                className="w-80 focus:outline-none focus:border-gray-500 border-b-2"
                type="email"
              />

              <input
                placeholder="Referer"
                value={refEmail}
                onChange={(e) => setRefEmail(e.target.value)}
                onKeyDown={(e: any) =>
                  e.key === "Enter" ? handleSubmit(e) : null
                }
                className={`w-80 focus:outline-none focus:border-gray-500 border-b-2 ${
                  hasRef ? "text-gray-400 bg-gray-200" : ""
                }`}
                type="email"
                disabled={hasRef}
              />

              <button
                type="submit"
                onClick={(e: any) => handleSubmit(e)}
                className="w-1/2 h-9 flex items-center justify-center rounded-xl bg-black text-white"
              >
                Register
              </button>
            </div>
            <hr className="m-0 p-0 border-gray-400" />
          </div>

          <div className="flex py-4 items-center justify-center">
            <p className="text-center">Already have an Account?</p>
            <button
              type="submit"
              onClick={() => history.push("/login")}
              className="w-1/2 h-9 flex items-center justify-center rounded-xl bg-black text-white"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
