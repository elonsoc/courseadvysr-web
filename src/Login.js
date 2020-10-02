import React from 'react';
import {Form, Button, Container, Modal} from 'react-bootstrap';
import Axios from 'axios';
import { useState } from 'react';
import environ from './helpers/prod-or-dev';
import { Redirect } from 'react-router-dom';
import { useUserDispatch, useUserState } from './contexts/UserContext';

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [show, setShow] = useState(false);
    const [modalText, setModalText] = useState("");

    const dispatch = useUserDispatch()
    const user = useUserState()

    const handleClose = (e) => {
        setShow(false)
    }
    const handleSubmit = (e) => {

        e.preventDefault()

        //AXIOS writes things in application/json not multipart/form-data, which brought CORS errors.
        //maybe we'll get to the point where we are able to handle application/json, probably when we're
        //taking data to store in the db

        //PREFLIGHT requires the server to accept an OPTIONS method as well, which we now do.
        //We will probably have to accept an OPTIONS method every. single. request.


        Axios({
            method: 'post',
            url: environ() + '/login',
            data: {"username":username.toLowerCase(), "password":password},
            withCredentials: true
        }).then((response) => {
            dispatch({user: username})
            if(response.status === 200) {

                //possibly stupid way of clearing but idgaf

                setRedirect(true)
            }
            
        }).catch((response) => {
            setModalText('Wrong Username or Password.')
            setShow(true)
            

            //TODO: alert user to wrong password or without password
        });
    }

    const WillRedirect = () => {
        //maybe a hack?
        if (redirect) {
            return <Redirect to="/courses" />;
        }
    };

    return (
        
        <Container variant="primary" className="splash-container">
        <Modal show={show} onHide={handleClose}> 
                    <Modal.Header closeButton>
                        <Modal.Title>Whoops</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{modalText}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
            {WillRedirect()}
            {document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1") ? <Redirect to="/courses" /> : null}
            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">Submit</Button>
        </Form>
        </Container>
    );
}

export default Login;