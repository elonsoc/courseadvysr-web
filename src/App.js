import React from "react";
import "./App.scss";

import { Button, Row, Container, Card } from "react-bootstrap";

function App() {
  return (
    <>
      <Container variant="primary" className="splash-container">
        <Row>
          <Card variant="primary" style={{ width: "24rem" }}>
            <Card.Header>Courseadvysr</Card.Header>
            <Card.Body className="text-center">
              <Card.Text>
                Coursevysr seeks to revolutionize your relationship with
                everything course related at Elon University.
              </Card.Text>
              <Card.Text>
                This service requires an active Elon University account to
                access.
              </Card.Text>
              <Button href="/login/" variant="primary">
                Log In
              </Button>
              <Card.Text> Version Gazania </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
}

export default App;
