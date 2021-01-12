import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Main() {
  return (
    <>
      <div className="col-md-8 mx-auto mt-2">
        <Card className="text-center">
          <Card.Header>Match Details</Card.Header>
          <Card.Body>
            <Card.Title>
              {" "}
              <Link to={"/createMatch"}>Create Match </Link>{" "}
            </Card.Title>
            <Card.Title>MatchId</Card.Title>
            <Card.Title>Match Location</Card.Title>
            <Card.Title>Match Name</Card.Title>
            <Card.Title>Team Name1</Card.Title>
            <Card.Title>Team Name2</Card.Title>
            <Card.Title>Match Type</Card.Title>
          </Card.Body>
          <Card.Footer className="text-muted"></Card.Footer>
        </Card>
      </div>
    </>
  );
}

export default Main;
