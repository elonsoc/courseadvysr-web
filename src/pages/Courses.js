import React, { useState, useEffect, Component } from "react";
import { useTable, useRowSelect, useFilters } from "react-table";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import "../styles/courses.css";
import environ from "../helpers/prod-or-dev";
import { UserProvider, useUserState } from "../contexts/UserContext";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

// TODO: take this out of Courses.js and put it in its own file
const courseOptions = [
  { value: "ACC", label: "Accounting" },
  { value: "ABL", label: "Adventure Based Learning" },
  { value: "AAA", label: "African & African-Amer Studies" },
  { value: "ACT", label: "Acting" },
  { value: "AMS", label: "American Studies" },
  { value: "ANT", label: "Anthropology" },
  { value: "ARB", label: "Arabic" },
  { value: "ART", label: "Art" },
  { value: "ARH", label: "Art History" },
  { value: "AAD", label: "Arts Administration" },
  { value: "APS", label: "Asian/Pacific Stud" },
  { value: "BIO", label: "Biology" },
  { value: "BIOL", label: "Biology Lab" },
  { value: "BUS", label: "Business Administration" },
  { value: "CAS", label: "College of Arts and Sciences" },
  { value: "CAE", label: "Career Exploration & Education" },
  { value: "CHM", label: "Chemistry" },
  { value: "CHML", label: "Chemistry Lab" },
  { value: "CHMR", label: "Chemistry Recitations" },
  { value: "CHN", label: "Chinese" },
  { value: "CTA", label: "Cinema and Television Arts" },
  { value: "CES", label: "Civic Engagement Scholars" },
  { value: "CLA", label: "Classical Studies" },
  { value: "COM", label: "Communications" },
  { value: "CDE", label: "Communication Design" },
  { value: "COR", label: "Elon Core Curriculum" },
  { value: "CIS", label: "Computer Information Systems" },
  { value: "CSC", label: "Computer Science" },
  { value: "COE", label: "Cooperative Education" },
  { value: "CJS", label: "Criminal Justice Studies" },
  { value: "DAN", label: "Dance" },
  { value: "DTS", label: "Drama and Theatre Studies" },
  { value: "ECO", label: "Economics" },
  { value: "EDU", label: "Education" },
  { value: "ECF", label: "Elon College Fellows" },
  { value: "EGR", label: "Engineering" },
  { value: "EGRL", label: "Engineering Lab" },
  { value: "ELN", label: "Elon" },
  { value: "ENG", label: "English" },
  { value: "ENT", label: "Entrepreneurship" },
  { value: "ENS", label: "Environmental Studies" },
  { value: "ENSL", label: "Env. Studies Lab" },
  { value: "ESS", label: "Exercise Science" },
  { value: "ESSL", label: "Exercise Science Lab" },
  { value: "EXP", label: "Expression" },
  { value: "FIN", label: "Finance" },
  { value: "FRE", label: "French" },
  { value: "GAM", label: "Game Design" },
  { value: "GBL", label: "Global Education Center Course" },
  { value: "GEO", label: "Geography" },
  { value: "GIS", label: "Geographic Info Systems" },
  { value: "GER", label: "German" },
  { value: "GRK", label: "Greek" },
  { value: "HEB", label: "Hebrew" },
  { value: "HED", label: "Health Education" },
  { value: "HST", label: "History" },
  { value: "HNR", label: "Honors" },
  { value: "HSS", label: "Human Service Studies" },
  { value: "IDS", label: "Interdisciplinary Studies" },
  { value: "INB", label: "International Business" },
  { value: "IGS", label: "International/Global Studies" },
  { value: "IME", label: "Interactive Media" },
  { value: "ISC", label: "Information Science" },
  { value: "ITL", label: "Italian" },
  { value: "IRS", label: "Interreligious Studies" },
  { value: "JOU", label: "Journalism" },
  { value: "JST", label: "Jewish Studies" },
  { value: "LAT", label: "Latin" },
  { value: "LAS", label: "Latin American Studies" },
  { value: "LAW", label: "Law" },
  { value: "LED", label: "Leadership Studies" },
  { value: "LSB", label: "Love School of Bus." },
  { value: "MEA", label: "Media Analytics" },
  { value: "MGT", label: "Management" },
  { value: "MKT", label: "Marketing" },
  { value: "MBA", label: "Master of Business Admin" },
  { value: "MED", label: "Master of Education" },
  { value: "MHE", label: "M.A.Higher Education" },
  { value: "MSCM", label: "Master of Science Management" },
  { value: "MTH", label: "Mathematics" },
  { value: "MSC", label: "Military Science" },
  { value: "MMA", label: "Multimedia Authoring" },
  { value: "MUS", label: "Music" },
  { value: "MTE", label: "Music Theatre" },
  { value: "NEU", label: "Neuroscience" },
  { value: "PCS", label: "Peace and Conflict Studies" },
  { value: "PER", label: "Periclean Scholars" },
  { value: "PHL", label: "Philosophy" },
  { value: "PPE", label: "Philosophy, Politics and Econ" },
  { value: "PED", label: "Physical Education" },
  { value: "PEDL", label: "Physical Education Lab" },
  { value: "PEH", label: "Physical Education & Health" },
  { value: "PEHL", label: "Phys. Edu & Health Lab" },
  { value: "PHY", label: "Physics" },
  { value: "PHYL", label: "Physics Lab" },
  { value: "PST", label: "Policy Studies" },
  { value: "POL", label: "Political Science" },
  { value: "PSJ", label: "Poverty and Social Justice" },
  { value: "PSY", label: "Psychology" },
  { value: "PHS", label: "Public Health Studies" },
  { value: "PWR", label: "Professional Writing/Rhetoric" },
  { value: "REL", label: "Religious Studies" },
  { value: "SCI", label: "Science" },
  { value: "SOC", label: "Sociology" },
  { value: "SPN", label: "Spanish" },
  { value: "SPT", label: "Sport Management" },
  { value: "STC", label: "Strategic Communications" },
  { value: "STS", label: "Statistics" },
  { value: "STA", label: "Study Abroad" },
  { value: "TDT", label: "Theatrical Design/Technology" },
  { value: "STU", label: "Study USA" },
  { value: "THE", label: "Theatre Arts" },
  { value: "WGS", label: "Women's, Gender, Sexualities" },
  { value: "WHE", label: "Wellness and Health Education" },
  { value: "WLC", label: "World Languages and Cultures" },
];

//terrible hack but we've lifted the needed stuff
var tableInfo = [];
function setTableData(newInfo) {
  tableInfo = newInfo;
}

class CreatableMulti extends Component {
  constructor(props) {
    super(props);
    this.state = { selection: [] };
  }
  handleChange = (newValue, actionMeta) => {
    setTableData(newValue);
    this.setState(() => {
      return { selection: newValue };
    });

    console.groupEnd();
  };
  render() {
    return (
      <CreatableSelect
        formatCreateLabel={(inputValue) => `${inputValue}`}
        isMulti
        onChange={this.handleChange}
        className="w-8/12"
        placeholder={`ECO, CSC 242, Communications, The Global Experience`}
        options={courseOptions}
      />
    );
  }
}

// const SelectTerm = () => {
//   return (
//     <Select
//       className="w-4/12"
//       options={termOptions}
//     />
//   );
// };

function Courses() {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [termCode, setTermCode] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const { user } = useUserState();
  const [redirect, setRedirect] = useState("");
  const [show, setShow] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitleText, setModalTitleText] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("21/03");

  const SelectedCoursesList = () => {
    var list = selectedCourses.map((selectedCourse) => {
      return (
        // <Dropdown.Item>
        //   {" "}
        //   {selectedCourse.courseSubject}-{selectedCourse.courseNumber}-
        //   {selectedCourse.courseSection} {selectedCourse.courseTitle}{" "}
        // </Dropdown.Item>
        <></>
      );
    });
    return list;
  };

  const Times = ({ values }) => {
    return (
      <>
        <span>
          {values[0].substring(0, 2) > 12
            ? "0" +
              (values[0].substring(0, 2) - 12) +
              values[0].substring(2, 5) +
              "pm"
            : values[0].substring(0, 2) == 12
            ? values[0] + "pm"
            : values[0] + "am"}
          {"\t"}-{"\t"}
          {values[1].substring(0, 2) > 12
            ? "0" +
              (values[1].substring(0, 2) - 12) +
              values[1].substring(2, 5) +
              "pm"
            : values[1].substring(0, 2) == 12
            ? values[1] + "pm"
            : values[1] + "am"}
        </span>
      </>
    );
  };

  const to24Hour = ({ time }) => {
    return time.substring(0, 2) > 12
      ? time.substring(0, 2) - 12 + time.substring(2, 5) + "pm"
      : time.substring(0, 2) == 12
      ? time + "pm"
      : time + "am";
  };

  //check to see which environment we're in and provides the necessary path

  // const personCount = ({ values }) => {
  //     return (
  //         <span>{values}</span>
  //     )
  // }

  const revealInformation = (row) => {
    axios
      .get(
        environ() + "/courses/" + row.values.courseRegistrationNumber + "/",
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setModalTitleText(row.values.courseTitle);
        setModalText(response.data);
        console.log(response.data);
        setShow(true);
      });
  };

  const ShowMore = ({ row }) => {
    return (
      <button onClick={() => revealInformation(row)}>
        {row.values.courseTitle}
      </button>
    );
  };

  const MeetingTime = ({ row }) => {
    return (
      <span>
        {" "}
        <Times values={row.values.meetingTimes} />
        {"\t"}
        {row.values.meetingDays.map((day, idx) => {
          if (idx + 1 === row.values.meetingDays.length) {
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

  const MeetingPlace = ({ row }) => {
    return (
      <span>
        {row.values.meetingBuilding}, {row.values.meetingRoom}
      </span>
    );
  };

  const ClassCode = ({ row }) => {
    return (
      <span>
        {row.values.courseSubject}-{row.values.courseNumber}(
        {row.values.courseSection})
      </span>
    );
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "CRN",
        accessor: "courseRegistrationNumber",
      },

      {
        Header: "Course",
        accessor: "courseSection",
        Cell: ({ cell: { row } }) => <ClassCode row={row} />,
      },
      {
        Header: "Title",
        accessor: "courseTitle",
        Cell: ({ cell: { value, row } }) => <ShowMore row={row} />,
      },

      {
        Header: "Subject",
        accessor: "courseSubject",
      },
      {
        Header: "Number",
        accessor: "courseNumber",
      },
      {
        Header: "Time",
        accessor: "meetingTimes",
        Cell: ({ cell: { row } }) => <MeetingTime row={row} />,
      },
      {
        Header: "Days",
        accessor: "meetingDays",
      },
      {
        Header: "Faculty",
        accessor: "faculty",
      },
      {
        Header: "Location",
        accessor: "meetingBuilding",
        Cell: ({ cell: { row } }) => <MeetingPlace row={row} />,
      },
      {
        Header: "Room",
        accessor: "meetingRoom",
      },
      {
        Header: "#",
        accessor: "currStudents",
        Cell: ({ cell: { row } }) => (
          <span>
            {row.values.currStudents}/{row.values.maxStudents}
          </span>
        ),
      },
      {
        Header: "Status",
        accessor: "sectionStatus",
      },
      { Header: "", accessor: "maxStudents" },
    ],
    []
  );

  const handleClose = (e) => {
    setShow(false);
  };

  const handleSelectedCourses = (e) => {
    let selectedArray = [];

    selectedFlatRows.map((row) => {
      let courseSelect = selectedCourses;
      if (!selectedCourses.includes(row.original)) {
        courseSelect.push(row.original);
        setSelectedCourses(courseSelect);

        selectedArray.push(row.original.courseRegistrationNumber);
      }
    });

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

  const handleFilters = (e) => {
    e.persist();

    if (e.target.checked) {
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    var q = [];
    if (tableInfo) {
      q = tableInfo.map((selection) => selection.value);
    } else {
      q = courseOptions.map((courses) => courses.value);
    }
    console.log(q);

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
            setTableData(JSON.parse(JSON.stringify(response.data)));
            setIsLoading(false);
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
    } else {
      setModalText("Please select a term.");
      setModalTitleText("Whoops.");
      setShow(true);
    }
  };

  const data = React.useMemo(() => tableData, [tableData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: [
          "meetingDays",
          "meetingRoom",
          "courseSubject",
          "courseNumber",
          "maxStudents",
        ],
      },
    },
    useFilters,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  function filterCourseType(rows, id, filterValue) {
    return rows.filter((row) => {
      const rowValue = row.values[id];
      if (rowValue.contains("ONL")) {
        return true;
      }
    });
  }

  return (
    <>
      <div className="flex flex-col min-h-screen overflow-y-auto">
        <div className="hidden fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-black opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-2xl leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      What's New
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to deactivate your account? All of
                        your data will be permanently removed. This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Deactivate
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="sticky flex flex-row justify-items items-center h-14  
          w-auto px-4"
        >
          <a href="/">
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
                {user ? `Hi, ${user.user}` : "Me"}
              </a>
              <a className="mx-2" href="/logout">
                Logout
              </a>
            </div>
          </div>
        </div>

        <div
          className="w-full flex-1
        mx-auto flex flex-col 
        justify-center items-center"
        >
          <h1 className="text-2xl p-2">
            I'm interested in courses for{" "}
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.currentTarget.value)}
              className="mark"
              style={{
                "-webkit-appearance": "none",
                border: "none",
                "-moz-appearance": "none",
                appearance: "none",
              }}
            >
              <option value="21/02">Winter 2021</option>
              <option value="21/03">Spring 2021</option>
              <option value="21/04">Summer I 2021 </option>
              <option value="21/05">Summer II 2021</option>
            </select>
          </h1>
          <CreatableMulti />
          <button
            onClick={(e) => handleSearchSubmit(e)}
            className="inline-flex justify-center items-center text-white bg-black m-4 rounded-md p-2"
          >
            Search
          </button>
          <table
            // className={}
            className={
              " " + //this is so we can make sure that the constants (below)
              " w-11/12 mx-auto  border table-auto rounded-xl"
            }
            {...getTableProps()}
          >
            <thead className="sticky text-center">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th className="" {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);

                return (
                  <tr className="border " {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td className="text-center" {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Courses;
