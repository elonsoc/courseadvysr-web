import React, { useEffect, useState } from 'react';

import { useTable } from 'react-table';
import { Table, Navbar, Container, Col, Row, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

function Courses() {
    const [someData, setSomeData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [termCode, setTermCode] = useState('');

    const Times = ({ values }) => {
        return (
            <>
            <span> {values[0]} {values[1]} </span>
            </>
        );
    };

    const MeetingDays = ({ values }) => {
        return (
            <>
            {values.map((day, idx) => {
                if(idx+1 === values.length) {
                    return (<span>{day}</span>);
                }
                return (
                    <span>{day}, </span>
                );
            })}
            </>
        );
    };
    

    const columns = React.useMemo(() => [
            {
                Header: 'Title',
                accessor: 'courseTitle',
            },
            {
                Header: 'Subject',
                accessor: 'courseSubject',
            },
            {   Header:'Number',
                accessor: 'courseNumber'
            },
            {
                Header: 'Section',
                accessor: 'courseSection',
            },
            {
                Header: 'CRN',
                accessor: 'courseRegistrationNumber',
            }, 
            {
                Header: 'Status',
                accessor: 'sectionStatus',
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

        ],[]    
    )

    useEffect(() => {
        console.log("ACCESSED!")
        axios.get('http://api.courseadvysr.com/courses/').then((response) => {
            var aResponse = JSON.parse(JSON.stringify(response.data))
            setSomeData(aResponse)
            setTermCode(aResponse[0].termCode)
        }).then(() => {
            setIsLoading(false)
        }).catch((error) => {
            console.log(error)
        })
    },[])

    

    
    const data = React.useMemo(() => someData);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data})

    return ( 
        <div>
            <Navbar bg="light" variant="light">
                <Navbar.Brand>Coursevysr Technology Preview</Navbar.Brand>
            </Navbar>
        <Container style={{margin: 0}}  fluid>
            
            <Row>
            <Col>
            {isLoading ? <Spinner animation="border"/> : <h1 style={{paddingLeft:12}}>{termCode}</h1>}
            
            <Table  responsive {...getTableProps()}>
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
            </Row>
        </Container>
        </div>
    );
}

export default Courses;