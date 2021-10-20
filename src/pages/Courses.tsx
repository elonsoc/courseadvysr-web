import React, { useState, MouseEvent } from "react";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();

  const [selectedTerm, setSelectedTerm] = useState("21/01");
  const [isVisible, setIsVisible] = useState(true);
  const [hideSearch, setHideSearch] = useState(false);

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

  const handleSearchSubmit = (e: MouseEvent) => {
    e.preventDefault();

    if (query === null) {
      //Alert why we're returning: because there's nothing in the query!
      return;
    }

    var queryValues: any = query.map((entry: { value: string }) => {
      return entry.value;
    });

    if (selectedTerm !== "" && queryValues.length !== 0) {
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
            history.push("/");
          }
        });
    }
  };

  return (
    <>
      <Navigation />
      <div className="grid grid-cols-12 py-3 px-3">
        <div className={(hideSearch ? "hidden" : "col-span-3")}>
          <div>
            <p>Term:</p>
            <SearchSelections style={"text-sm "} selections={setQuery}/>
            <button onClick={(e) => handleSearchSubmit(e) }>Ayo</button>
          </div>
        </div>
        <div className={  (hideSearch ? "col-span-12" : "col-span-9")}>
          <CourseList revealModal={revealInformation} list={data}/>
        </div>

      </div>
    </>
  );
}
