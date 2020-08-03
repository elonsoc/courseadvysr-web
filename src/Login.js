import React from 'react';
import {Form, Button} from 'react-bootstrap';
import Axios from 'axios';
import { useState } from 'react';
import environ from './prod-or-dev';

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    var root;

    environ() ? root = "http://localhost:1337" : root = "https://api.courseadvysr.com";

    const handleSubmit = (e) => {

        e.preventDefault()

        //AXIOS writes things in application/json not multipart/form-data, which brought CORS errors.
        //maybe we'll get to the point where we are able to handle application/json, probably when we're
        //taking data to store in the db

        //PREFLIGHT requires the server to accept an OPTIONS method as well, which we now do.
        //We will probably have to accept an OPTIONS method every. single. request.


        Axios({
            method: 'post',
            url: root + '/login',
            data: {"username":username, "password":password},
            withCredentials: true
        }).then((response) => {
            //stupid way of clearing but idgaf
            setUsername("")
            setPassword("")
            console.log(response)
        })
    }
    return (
        
        <Form onSubmit={handleSubmit}>
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

    );
}

export default Login;