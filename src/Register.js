import React from 'react';
import {Form, Button} from 'react-bootstrap';
import Axios from 'axios';
import { useState } from 'react';
import environ from './helpers/prod-or-dev';
import { Redirect } from 'react-router-dom';
import { useUserDispatch, useUserState } from './contexts/UserContext';

function Register() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [redirect, setRedirect] = useState(false)

    const dispatch = useUserDispatch()
    const user = useUserState()
    const handleSubmit = (e) => {

        e.preventDefault()

        //AXIOS writes things in application/json not multipart/form-data, which brought CORS errors.
        //maybe we'll get to the point where we are able to handle application/json, probably when we're
        //taking data to store in the db

        //PREFLIGHT requires the server to accept an OPTIONS method as well, which we now do.
        //We will probably have to accept an OPTIONS method every. single. request.


        Axios({
            method: 'post',
            url: environ() + '/register',
            data: {"username":username.toLowerCase(), "password":password, "email":email.toLowerCase()},
            withCredentials: true
        }).then((response) => {
            dispatch({user: username})
            if(response.status === 200) {
                
                
                //possibly stupid way of clearing but idgaf

                setRedirect(true)
            }
            
        }).catch((response) => {
            //TODO: alert user to wrong password or without password
        });
    }

    const willRedirect = () => { //maybe a hack?
        if(redirect) {
            return <Redirect to="/"/> 
        }
    }

    return (
        <>
        <h1>Register for Courseadvysr</h1>
        <p>When you register, email the creator of this system to complete verification.</p>
        <Form onSubmit={handleSubmit}>
            {willRedirect()}
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
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
        </>
    );
}

export default Register;