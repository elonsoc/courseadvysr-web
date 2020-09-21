import React from "react";
import { Form, Button, Container, Modal } from "react-bootstrap";
import Axios from "axios";
import { useState } from "react";
import environ from "./helpers/prod-or-dev";
import { Redirect } from "react-router-dom";
import { useUserDispatch, useUserState } from "./contexts/UserContext";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [refEmail, setRefEmail] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [show, setShow] = useState(false);
    const [modalText, setModalText] = useState("");

    const dispatch = useUserDispatch();
    const user = useUserState();

    const handleClose = (e) => {
        setShow(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //AXIOS writes things in application/json not multipart/form-data, which brought CORS errors.
        //maybe we'll get to the point where we are able to handle application/json, probably when we're
        //taking data to store in the db

        //PREFLIGHT requires the server to accept an OPTIONS method as well, which we now do.
        //We will probably have to accept an OPTIONS method every. single. request.
        if (email != "" || username != "" || password != "" || refEmail != "") {

            /**
                TODO: fix up so we can write status lines directly from the
                server OR have consistent lines for any mess-ups. Currently,
                everything is hardcoded. No Bueno.

                TODO:  
            **/
            Axios({
                method: "post",
                url: environ() + "/register",
                data: {
                    username: username.toLowerCase(),
                    password: password,
                    email: email.toLowerCase(),
                },
                withCredentials: true,
            })
                .then((response) => {
                    dispatch({ user: username });
                    if (response.status === 200) {
                        //possibly stupid way of clearing but idgaf

                        setRedirect(true);
                    } else {
                       
                    }
                })
                .catch((response) => {                    
                    setModalText('That email or username already exists. Did you forget your login information?')
                    setShow(true)
                });
        } else {
            setModalText(
                "Not everything is filled out. Please fill everything out!"
            );
            setShow(true);
        }
    };

    const willRedirect = () => {
        //maybe a hack?
        if (redirect) {
            return <Redirect to="/" />;
        }
    };

    return (
        <Container>
            <h1>Register for Courseadvysr</h1>
            <p>
                When you register, email the creator of this system to complete
                verification.
            </p>
            <Form onSubmit={handleSubmit}>
                {willRedirect()}

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

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                    <Form.Text className="text-muted">
                        Your <code> elon.edu </code> email. We'll check this
                        against our records.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    ></Form.Control>
                    <Form.Text className="text-muted">
                        The username you'd like to have. You'll sign in with
                        this.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>

                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                    <Form.Text className="text-muted">
                        Your password is safe with us as we{" "}
                        <a href="https://en.wikipedia.org/wiki/Salt_(cryptography)">
                            salt{" "}
                        </a>
                        and{" "}
                        <a href="https://en.wikipedia.org/wiki/Hash_function">
                            hash{" "}
                        </a>
                        (computer science words meaning super safe) your
                        password to ensure its safety. We will never know it.
                        <br />
                        Your password can be as long or as short as you like it.
                        We recommend at least eight characters.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Re-enter Password</Form.Label>

                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Referral Email</Form.Label>

                    <Form.Control
                        type="email"
                        value={refEmail}
                        onChange={(e) => setRefEmail(e.target.value)}
                    ></Form.Control>
                    <Form.Text className="text-muted">
                        To be able to access, you'll have to enter an email of
                        someone who is already a memeber.
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default Register;
