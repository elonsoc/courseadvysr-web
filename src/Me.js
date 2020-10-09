import {
  Table,
  Navbar,
  Nav,
  Container,
  Col,
  Row,
  Spinner,
  Button,
} from "react-bootstrap";
import React, { useState } from "react";
import { useTable, useRowSelect } from "react-table";
import Axios from "axios";
import environ from "./helpers/prod-or-dev";
import { useUserState } from "./contexts/UserContext";
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

  //check to see which environment we're in and provides the necessary path

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
      // axios.get(
      //     environ() + '/commit',
      //     {
      //         withCredentials: true
      //     })
      //     .then((response) => {
      //         // console.log(JSON.parse(JSON.stringify(response.data)))
      //         if (response.data != null) {
      //             setTableData(JSON.parse(JSON.stringify(response.data)))
      //             setIsLoading(false)
      //         }

      //         //This allows react to not crash whenever we are passed a null
      //         //response. We're passed a null response due to a misstype
      //     })
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

  return (
    <>
      {redirect ? <Redirect to="/" /> : null}
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/courses">Courseadvysr <code>α</code></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="container-fluid">
            <Nav.Link href="/courses">Courses</Nav.Link>
            <Nav.Link href="/me">Me</Nav.Link>

            <Nav className="ml-auto">
              {/* <Nav.Link>Schedule</Nav.Link> */}
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container style={{ margin: 0 }} fluid>
        <Row></Row>
        <Row>
          <Col>
            {isLoading ? (
              <Spinner animation="border" />
            ) : (
              <h1 style={{ paddingLeft: 12 }}> {user}</h1>
            )}

            <Table responsive {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
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
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          {Object.keys(selectedRowIds).length > 0 ? (
            <Button onClick={commitDeleteSelectedCourses}> Remove </Button>
          ) : (
            <></>
          )}
        </Row>
      </Container>
    </>
  );
}

export default Me;
