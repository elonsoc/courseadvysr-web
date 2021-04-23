import React, { useState, MouseEvent } from "react";
import axios from "axios";
import environ from "../helpers/prod-or-dev";
import Navigation from "../Components/navigation";
import SearchSelections from "../Components/Courses/Selection";
import CourseList from "../Components/Courses/CourseList";
// import Alert from "../Components/Alerts";
import { Course } from "../Components/types";

export default function Courses() {
  const [data, setData] = useState<Course[]>([]);
  const [query, setQuery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [termCode, setTermCode] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([String]);

  const [redirect, setRedirect] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState("21/01");
  const [isVisible, setIsVisible] = useState(true);
  //provide more rich text here!

  const revealInformation = (crn: string) => {
    axios
      .get(environ() + "/courses/" + crn + "/", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(crn);
        console.log(response.data);
      });
  };

  const handleSelectedCourses = (e: Event) => {
    let selectedArray: string[] = [];
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

  const handleSearchSubmit = (e: MouseEvent) => {
    e.preventDefault();

    if (query === null) {
      //Alert why we're returning: because there's nothing in the query!
      return;
    }

    var queryValues: any = query.map((entry: { value: string }) => {
      return entry.value;
    });

    if (selectedTerm != "" && queryValues.length != 0) {
      setIsLoading(true);
      axios
        .post(
          environ() + "/search",
          { query: queryValues, term: selectedTerm },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.data != null) {
            // console.log(response.data);
            setData(response.data);
            setIsVisible(true);
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
      <div className=" py-8 px-6 space-y-3">
        <h1 className="font-semibold text-center text-xl md:text-2xl">
          I'm looking for{" "}
          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.currentTarget.value)}
            style={{
              WebkitAppearance: "none",
              border: "none",
              MozAppearance: "none",
              appearance: "none",
            }}
          >
            <option value="21/02">Winter 2021</option>
            <option value="21/03">Spring 2021</option>
            <option value="21/04">Summer I 2021 </option>
            <option value="21/05">Summer II 2021</option>
            <option value="21/01">Fall 2021</option>
          </select>
        </h1>

        <SearchSelections selections={setQuery} />

        <button
          className="mx-auto flex justify-center items-center bg-gray-300 rounded-md p-2"
          onClick={(e: MouseEvent) => handleSearchSubmit(e)}
        >
          Search
        </button>
        <div className={isVisible ? `visible` : `hidden`}>
          <CourseList
            list={data}
            revealModal={(crn: string) => revealInformation(crn)}
          />
        </div>
      </div>
    </>
  );
}
