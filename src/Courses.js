import React, { useState, useEffect, forceUpdate } from 'react';
import { useTable, useRowSelect, } from 'react-table';
import {Redirect} from 'react-router-dom'
import { Table, Navbar, Container, Nav, Col, Row, Dropdown, Button, SplitButton, Spinner, Form } from 'react-bootstrap';
import axios from 'axios';
import environ from './helpers/prod-or-dev';
import { useUserState } from './contexts/UserContext';


const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        )
    }
)


function Courses() {
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [termCode, setTermCode] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCourses, setSelectedCourses] = useState([]);
    const { user } = useUserState()
    const [redirect, setRedirect] = useState('');
    const SelectedCoursesList = () => {

        var list = selectedCourses.map((selectedCourse) => {
            return (
                <Dropdown.Item> {selectedCourse.courseSubject}-{selectedCourse.courseNumber}-{selectedCourse.courseSection} {selectedCourse.courseTitle} </Dropdown.Item>
            );

        })
        return list
    }


    const Times = ({ values }) => {
        return (
            <>
                <span> {values[0]} - {values[1]} </span>
            </>
        );
    };

    //check to see which environment we're in and provides the necessary path 

    const MeetingDays = ({ values }) => {
        return (
            <>
                {values.map((day, idx) => {
                    if (idx + 1 === values.length) {
                        return (<span key={idx}>{day}</span>);
                    }
                    return (
                        <span key={idx}>{day}, </span>
                    );
                })}
            </>
        );
    };

    const personCount = ({ values }) => {
        return (
            <span>{values}</span>
        )
    }

    const columns = React.useMemo(() => [
        {
            Header: 'CRN',
            accessor: 'courseRegistrationNumber',
        },
        {
            Header: 'Title',
            accessor: 'courseTitle',
        },
        {
            Header: 'Section',
            accessor: 'courseSection',
        },
        {
            Header: 'Status',
            accessor: 'sectionStatus',
        },
        {
            Header: 'Subject',
            accessor: 'courseSubject',
        },
        {
            Header: 'Number',
            accessor: 'courseNumber'
        },
        {
            Header: 'Time',
            accessor: 'meetingTimes',
            Cell: ({ cell: { value } }) => <Times values={value} />

        },
        {
            Header: 'Days',
            accessor: 'meetingDays',
            Cell: ({ cell: { value } }) => <MeetingDays values={value} />
        },
        {
            Header: 'Building',
            accessor: 'meetingBuilding'
        },
        {
            Header: 'Room',
            accessor: 'meetingRoom'
        },
        {
            Header: '#',
            accessor: 'currStudents'
        }

    ], []
    )

    const handleSelectedCourses = (e) => {
        let selectedArray = []
        
        selectedFlatRows.map((row) => {
            let courseSelect = selectedCourses
            if (!selectedCourses.includes(row.original)) {
                courseSelect.push(row.original)
                setSelectedCourses(courseSelect)

                selectedArray.push(row.original.courseRegistrationNumber)
            }
        })

        

        axios.post(
            
            environ() + '/commit',
            {"data": selectedArray},
            {
                withCredentials: true
            }).then((response) => {

        })
        
        setSelectedCourses(selectedCourses) //this is a hack to force an update on SelectedCoursesList... kinda sad :/

    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()


        axios.post(
            environ() + '/search',
            { "query": searchQuery, "term": "" },
            {
                withCredentials: true
            })
            .then((response) => {

                if (response.data != null) {
                    setTableData(JSON.parse(JSON.stringify(response.data)))
                }

                //This allows react to not crash whenever we are passed a null response.
                //We're passed a null response due to a misstype 
                // setTableData([])

            }).catch((response) => {
                if (response.status === 401) {
                    setRedirect(true)
                }
            })
    }

    const data = React.useMemo(() => tableData)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows
    } = useTable({ columns, data },
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    )
                },
                ...columns,
            ])
        }
    )

    return (
        <div>
            {/* We have two styles here, checking for the token and 
                (on line 225 of Me.js) checking for a type of response from the 
                server. One relies on cookies and another relies on server.
                (client v. server sided)

                I've noticed that the check for cookies is a lot more snappier
                while the check for a invalid response looks terrible, it allows
                you to paint the first render instead of instantly checking for
                the cookie and redirecting if possible.
            */}
            {document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1") ?  null : <Redirect to="/" />}
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="/courses">
                    Courseadvysr Gazania
            </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/courses">Courses</Nav.Link>
                        <Nav.Link href="/me">Me</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Container fluid>
                <Row>
                    <Form.Control value={searchQuery} onKeyDown={(e) => e.key === 'Enter' ? handleSearchSubmit(e) : null} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for Courses e.g. 'CSC', 'PHL 210', 'POL 3', 'Discrete Structures'" />
                    <Col>
                        <Form onSubmit={handleSearchSubmit}>
                            <Button variant="primary" type="submit"> Submit </Button>
                        </Form>
                    </Col>
                    <Col>
                        <SplitButton onClick={(e) => handleSelectedCourses(e)} className="float-right" variant={'secondary'} title={'Add to Courses'}> <SelectedCoursesList /> <Dropdown.Item><Button variant="primary" type="submit">Commit</Button></Dropdown.Item> </SplitButton>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {isLoading ? <Spinner animation="border" /> : null}

                        <Table responsive {...getTableProps()}>
                            <thead>
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map(row => {
                                    prepareRow(row)
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map(cell => {
                                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            })}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>
                   {isLoading ?  <Col>
                    
                    </Col> : null}
                </Row>
            </Container>
        </div>
    );
}

export default Courses;