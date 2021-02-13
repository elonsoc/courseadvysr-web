import React, { useState } from "react";
import { useTable, useRowSelect } from "react-table";
import Axios from "axios";
import environ from "../helpers/prod-or-dev";
import { useUserState } from "../contexts/UserContext";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

function Me() {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  // const [term  Code, setTermCode] = useState('');
  // const [selectedCourses, setSelectedCourses] = useState([]);
  const { user } = useUserState();

  const Times = ({ values }) => {
    return (
      <>
        <span>
          {" "}
          {values[0]} - {values[1]}{" "}
        </span>
      </>
    );
  };

  const MeetingDays = ({ values }) => {
    return (
      <>
        {values.map((day, idx) => {
          if (idx + 1 === values.length) {
            return <span key={idx}>{day}</span>;
          }
          return <span key={idx}>{day}, </span>;
        })}
      </>
    );
  };

  // const personCount = ({ values }) => {
  //     return (
  //         <span>{values}</span>
  //     )
  // }

  const columns = React.useMemo(
    () => [
      {
        Header: "Term",
        accessor: "termCode",
      },
      {
        Header: "CRN",
        accessor: "courseRegistrationNumber",
      },
      {
        Header: "Title",
        accessor: "courseTitle",
      },
      {
        Header: "Section",
        accessor: "courseSection",
      },
      {
        Header: "Status",
        accessor: "sectionStatus",
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
        Cell: ({ cell: { value } }) => <Times values={value} />,
      },
      {
        Header: "Days",
        accessor: "meetingDays",
        Cell: ({ cell: { value } }) => <MeetingDays values={value} />,
      },
      {
        Header: "Building",
        accessor: "meetingBuilding",
      },
      {
        Header: "Room",
        accessor: "meetingRoom",
      },
      {
        Header: "#",
        accessor: "currStudents",
      },
    ],
    []
  );

  useEffect(() => {
    if (isLoading) {
      Axios({
        method: "get",
        url: environ() + "/commit",
        withCredentials: true,
      })
        .then((response) => {
          if (response.status === 200) {
            if (response.data != null) {
              setTableData(JSON.parse(JSON.stringify(response.data)));
              setIsLoading(false);
            }
          }
        })
        .catch((response) => {
          setRedirect(true);
          console.log(redirect);
        });
    }
  });

  const data = React.useMemo(() => tableData, [tableData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable({ columns, data }, useRowSelect, (hooks) => {
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
  });

  const commitDeleteSelectedCourses = (e) => {
    let selected = [];
    setIsLoading(true);
    selectedFlatRows.map((d) =>
      selected.push(d.original.courseRegistrationNumber)
    );

    Axios({
      method: "delete",
      url: environ() + "/commit",
      data: { data: selected },
      withCredentials: true,
    })
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
        }
      })
      .catch((response) => {
        //TODO: alert user to wrong password or without password
        console.log(response);
        if (response.status === 401) {
          setRedirect(true);
          console.log(redirect);
        }
      });
  };

  const handleLogout = () => {
    /*
        probably call /logout and it'll set the current cookie to a blacklist 
        on the redis instance—yeah we're using redis so what?
        */
  };

  return <></>;
}

export default Me;
