import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ScoreBoard from './ScoreBoard'
import { Link } from "react-router-dom";
function CreateMatch(props) {
  const [team_name1, setTeam] = useState("");
  const [team_name2, setTeam2] = useState("");
  const [list, setList] = useState([]);
  const [photo, SetFileName] = useState("");
  const [team_id, setTeamId] = useState("");
  const [role, setRole] = useState("");
  const [player_name, setPlayerName] = useState("");

  useEffect(() => {
    async function getList() {
      try {
        let res = await axios.get(
          `https://fast-atoll-73668.herokuapp.com/fetchTeam`
        );
        console.log(res.data.message);
        let list = res.data.message;
        setList(list);
      } catch (e) {
        console.log(e);
      }
    }
    getList();
  }, []);

  function addTeam(team_name) {
    try {
      console.log(team_name);
      fetch(`https://fast-atoll-73668.herokuapp.com/createTeam`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          team_name,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          console.log(data.details);
          if (data.statusCode === 200) {
            let data1 = {
              _id: data.details._id,
              team_name: data.details.team_name,
            };
            setList((preValue) => {
              return [...preValue, data1];
            });
            alert(data.message);
            setTeam("");
            setTeam2("");
          } else {
            alert(data.message);
          }
          //console.log(data1)
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  }

  const handleSubmit = () => {
    // console.log(team_name1)
    addTeam(team_name1);
  };
  const handleSubmit2 = () => {
    //  console.log(team_name2);
    addTeam(team_name2);
  };
  //radio Button for choose team_id
  const checkboxHandler = (e) => {
    setTeamId(e.target.value);
    //console.log(e.target.value);
    // alert(e.target.value);
  };
  //selelct for role like batsman....
  const selectHandler = (e) => {
    setRole(e.target.value);
    // alert(e.target.value);
  };
  //image handle
  const formHandler = (e) => {
    SetFileName(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  //submit player details
  const submitPlayer = () => {
    console.log(photo, role, team_id, player_name);
    async function playerHandler() {
      try {
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("team_id", team_id);
        formData.append("player_name", player_name);
        formData.append("role", role);

        let result = await axios({
          method: "post",
          url: "https://fast-atoll-73668.herokuapp.com/addPlayer",
          data: formData,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "multipart/form-data",
          },
        });
        console.log(result.data.message);
        alert(result.data.message);
      } catch (e) {
        console.log(e);
        if (e.response) {
          console.log(e.response.data.message);
          alert(e.response.data.message);
        }
      }
    }
    playerHandler();
  };

  return (
    <div className="col-md-6 mt-3 mx-auto">
     {/* // <ScoreBoard value={list}/> */}
       <Link to={"/scoreboard"}>Go to the ScoreBoard </Link>
      <Card className="text-center">
        <Card.Header className="bg-primary">Create Team </Card.Header>
        <Card.Body>
          <Form>
            <Form.Label>Enter Team Name 1</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Team Name 1"
              value={team_name1}
              onChange={(e) => setTeam(e.target.value)}
            />
            <br />
            <Button variant="primary" onClick={() => handleSubmit()}>
              Create Team
            </Button>
            <br />
            {/* <Form.Label className="mt-3">Enter Team Name 2</Form.Label> */}
            {/* <Form.Control
              type="text"
              placeholder="Enter Team Name 2"
              value={team_name2}
              onChange={(e) => setTeam2(e.target.value)}
            />
            <br />
            <Button variant="primary" onClick={() => handleSubmit2()}>
              Create Team
            </Button> */}
          </Form>
        </Card.Body>
      </Card>
      {/* Team Name Fetch from Api */}

      <div className="m-3">
        <h5>Your Team is</h5>
        <Form.Group>
          <Form.Control
            as="select"
            //   onChange={selectHandler}
          >
            {" "}
            <option>Team Name</option>
            {list.map((element, index) => (
              <option key={index} value={element.team_name} name={element._id}>
                {element.team_name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </div>
      {/* Add a player for Team */}

      <div className="mt-5">
        <Card className="text-center ">
          <Card.Header className="bg-info">Add Player </Card.Header>
          <Card.Body>
            <Form.Group controlId="formBasicCheckbox">
              <p>Select Team Name Add Player</p>
              <div className="row">
                {list.map((element, index) => (
                  <Form.Check
                    key={index}
                    type="radio"
                    aria-label="radio 1"
                    name="male"
                    inline
                    label={element.team_name}
                    // value={element.team_name}
                    value={element._id}
                    onChange={checkboxHandler}
                  />
                ))}

                <br />
              </div>
              <br />
              <br />
              <h5>Choose role</h5>

              <Form.Control as="select" onChange={selectHandler}>
                {" "}
                <option value="">Choose Role...</option>
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="Allrounder">Allrounder</option>
              </Form.Control>

              <Form.Label>Add Player </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Player Name"
                onChange={(e) => setPlayerName(e.target.value)}
              />
              <br />
              <Form.Group>
                <Form.File
                  className="position-relative"
                  required
                  name="file"
                  onChange={formHandler}
                  label="add a pic"
                />
              </Form.Group>

              <Button variant="primary" onClick={() => submitPlayer()}>
                Add Player
              </Button>
            </Form.Group>
          </Card.Body>
          <Card.Footer className="text-muted"></Card.Footer>
        </Card>
      </div>
    </div>
  );
}

export default CreateMatch;
