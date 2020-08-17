import React, { useState } from 'react';
import { useTable } from 'react-table';
import { Table, Navbar, Container, Col, Row, Button, Spinner, Form } from 'react-bootstrap';
import axios from 'axios';
import environ from './helpers/prod-or-dev';
import { useUserState } from './contexts/UserContext';


function Courses() {
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [termCode, setTermCode] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const {user} = useUserState()
    
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
                if(idx+1 === values.length) {
                    return (<span key={idx}>{day}</span>);
                }
                return (
                    <span key={idx}>{day}, </span>
                );
            }   )}
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
            {   Header:'Number',
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
    
    const handleSearchSubmit = (e) => {
        e.preventDefault()
        console.log(searchQuery)

        axios.post(
            environ()+'/search', 
            {"query": searchQuery}, 
            {withCredentials: true
        })
        .then((response) => {
            console.log(JSON.parse(JSON.stringify(response.data)))
            if (response.data != null) {
                setTableData(JSON.parse(JSON.stringify(response.data)))
            }

            //This allows react to not crash whenever we are passed a null response.
            //We're passed a null response due to a misstype 
            // setTableData([])
           
        })
    }
    
    const data = React.useMemo(() => tableData)

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
            <Navbar.Brand>
                Coursevysr Technology Preview
            </Navbar.Brand>
            </Navbar>
        <Container style={{margin: 0}}  fluid>
            <Row>
            <Col>
            {isLoading ? <Spinner animation="border"/> : <h1 style={{paddingLeft:12}}>{termCode} {user}</h1>}
            <Form onSubmit={handleSearchSubmit}>
                <Form.Control value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for Courses e.g. 'CHM', 'CHM 111', 'CHM 1' 'General Chemistry I'"/>
                <Button variant="primary" type="submit"> Submit </Button>
             </Form>
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
            </Row>
        </Container>
        </div>
    );
}

export default Courses;