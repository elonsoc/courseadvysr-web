import React, { FormEvent, useState } from 'react';
import { BsSearch } from 'react-icons/bs'


import { Form, InputGroup, Row, Button } from 'react-bootstrap';

import { MultiValue } from 'react-select';
import Searchbar from './Searchbar';


function Search() {

    const [selections, setSelections] = useState<MultiValue<Selection[]>>([]);

    const getCourses = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(selections)
    }

    return (
        <Form onSubmit={(e) => getCourses(e)}>
            <InputGroup>

                <Searchbar updateSelections={setSelections} />
                <InputGroup >
                    {/* <InputGroup.Append className={styles.search_btn_container}> */}
                    <Button
                        type="submit"
                        variant="outline-secondary"
                    // className={`${styles.search_btn} p-0`}
                    // style={{ width: '50px' }}
                    >
                        <Row className="m-auto justify-content-center">
                            <BsSearch size={20} className="m-auto" />
                        </Row>
                    </Button>
                </InputGroup>
            </InputGroup>
        </Form>);
}



export default Search