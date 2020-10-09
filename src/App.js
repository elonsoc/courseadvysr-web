import React from "react";
import "./App.scss";

import { Button, Row, Container, Card } from "react-bootstrap";

function App() {
  return (
    <>
      <Container variant="primary" className="splash-container">
          <Card variant="primary" style={{ width: "24rem" }}>
            <Card.Header>Courseadvysr</Card.Header>
            <Card.Body className="text-center">
              <Card.Text>
                Courseadvysr is a companion service to OnTrack.   This service requires an active Elon University account to
                access.
              </Card.Text>

              <Card.Text>Courseadvysr <code>α</code> is under current development as we build better tools for students. If you find any issues, report them to <code>hello@courseadvysr.com</code></Card.Text>
              <Button href="/login/" variant="primary">
                Log In
              </Button>
              
            </Card.Body>
          </Card>
      </Container>
    </>
  );
}

export default App;
