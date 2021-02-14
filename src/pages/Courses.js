import React, { useState, Component } from "react";
import axios from "axios";
import environ from "../helpers/prod-or-dev";
import Navigation from "../Components/navigation";
import SearchSelections from "../Components/Courses/Selection";
import CourseList from "../Components/Courses/CourseList";
export default function Courses() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [termCode, setTermCode] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);

  const [redirect, setRedirect] = useState("");
  const [show, setShow] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitleText, setModalTitleText] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("21/03");
  const [isVisible, setIsVisible] = useState(false)

  const revealInformation = (row) => {
    axios
      .get(
        environ() + "/courses/" + row.values.courseRegistrationNumber + "/",
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);
      });
  };

  const handleSelectedCourses = (e) => {
    let selectedArray = [];
    axios
      .post(
        environ() + "/commit",
        { data: selectedArray },
        {
          withCredentials: true,
        }
      )
      //RESPONSE
      .then((response) => {});

    //this is a hack to force an update on SelectedCoursesList... kinda sad :/
    setSelectedCourses(selectedCourses);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    var q = query.map((query) => query.value);

    if ((selectedTerm != "") & (q.length != 0)) {
      setIsLoading(true);
      axios
        .post(
          environ() + "/search",
          { query: q, term: selectedTerm },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.data != null) {
            // console.log(response.data);
            setData(response.data);
            setIsVisible(true)
          }

          //This allows react to not crash whenever we are passed a null response.
          //We're passed a null response due to a misstype
          // setTableData([])
        })
        .catch((response) => {
          if (response.status === 401) {
            setRedirect(true);
          }
        });
    }
  };

  return (
    <>
      <Navigation />
      <div className=" py-8 space-y-3">
        <h1 className="font-semibold text-center text-xl md:text-2xl">
          I'm looking for{" "}
          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.currentTarget.value)}
            
            style={{
              "WebkitAppearance": "none",
              border: "none",
              "MozAppearance": "none",
              appearance: "none",
            }}
          >
            <option value="21/02">Winter 2021</option>
            <option value="21/03">Spring 2021</option>
            <option value="21/04">Summer I 2021 </option>
            <option value="21/05">Summer II 2021</option>
          </select>
        </h1>
        <SearchSelections
          style="w-screen md:w-7/12"
          selections={(selection) => setQuery(selection)}
        />

        <button
          onClick={(e) => handleSearchSubmit(e)}
          className="flex justify-center items-center bg-gray-300 rounded-md p-2"
        >
          Search
        </button>
          <div className={isVisible ? `visible` : `hidden`}>
          <CourseList  data={data} />
          </div>
          
        
      </div>
    </>
  );
}
