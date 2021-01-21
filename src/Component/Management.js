import React, { useEffect, useState } from "react";
import axios from "axios";
import MultiSelect from "react-multi-select-component";
import Form from "react-bootstrap/Form";

function Management(props) {
  let [teamList, setTeamList] = useState([]); //add list of team
  let [playerList, setPlayerList] = useState([]); //add all the team player
  let [loading, setLoading] = useState("loading....");
  let [team1, setTeam1] = useState([]); //store the team1 members
  let [team2, setTeam2] = useState([]); //store the team2 members
  let [id, setIds] = useState([]);
  let [teamValue, setTeamValue] = useState([]); //dropdown list of player team1
  let [teamValue2, setTeamValue2] = useState([]); //dropdown list of player team2
  const [selected, setSelected] = useState([]); //select the two batsman
  const [selected2, setSelected2] = useState([]); //select the bowler
  const [cars, setCars] = useState([]); //select the bowler
  useEffect(() => {
    async function getTeam() {
      try {
        let res = await axios.get(
          `https://fast-atoll-73668.herokuapp.com/fetchTeam`
        );
        setTeamList(res.data.message);
        setLoading("");
      } catch (e) {
        console.log(e);
      }
    }
    getTeam();
  }, []);

  async function getList(team_id) {
    try {
      console.log(team_id);
      fetch(`https://fast-atoll-73668.herokuapp.com/getPlayerList`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          team_id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setPlayerList((preValue) => {
            return [...preValue, data.player_list];
          });
        })

        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  }

  const checkBoxHandler = (e) => {
    console.log(" ==== ", e.target.checked);
    if (!e.target.checked) {
      console.log(playerList.pop());
      // setPlayerList()
      return;
    }
    if (playerList.length > 1) {
      alert("you can perform match maximum two team ");
      return false;
    }

    const { checked, value } = e.target;
    setIds((preValue) => {
      return [...preValue, value];
    });
    getList(value);
  };
  const getPlayer = () => {
    console.log(playerList);
    setTeam1(playerList[0]);
    console.log("");
    setTeam2(playerList[1]);
    //console.log(playerList[0]);
    //console.log(playerList[1]);
    playerList[0].map((elel) =>
      setTeamValue((pre) => {
        return [...pre, { label: elel.name, value: elel.player_id }];
      })
    );
    playerList[1].map((elel1) =>
      setTeamValue2((prev) => {
        return [...prev, { label: elel1.name, value: elel1.player_id }];
      })
    );
    //teamValue;
  };
  const handler = (e) => {
    console.log(e.target);
    console.log(e.target.name, e.target.value);
  };
  const selectHandler = (e) => {
    alert(e.target.value);
    console.log(e.target.name);
  };

  return (
    <>
      <div className="col-md-10">
        <div>
          {loading}
          <div className="row">
            {teamList.map((elelment, index) => (
              <div key={index} className="m-2">
                <h5>{elelment.team_name}</h5>
                <input
                  type="checkbox"
                  value={elelment._id}
                  className="m-2"
                  label="22"
                  onChange={checkBoxHandler}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="row">
          {playerList.map((element, index) => (
            <select key={index} className="m-2">
              <option value="" disabled>
                Player Name
              </option>
              {element.map((val, index) => (
                <option key={index}>{val.name} </option>
              ))}
            </select>
          ))}
        </div>
      </div>
      <button className="btn btn-success" onClick={() => getPlayer()}>
        Start Match
      </button>

      {/* player list of both team */}
      <div className=" row m-4 ">
        <h6>Select Player </h6>

        <MultiSelect
          className="m-4"
          options={teamValue}
          value={selected}
          onChange={setSelected}
          labelledBy={"Select"}
        />
        <MultiSelect
          className="m-4"
          options={teamValue2}
          value={selected2}
          onChange={setSelected2}
          labelledBy={"Select"}
        />
      </div>
      <div>
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Example multiple select</Form.Label>
          <Form.Control
            as="select"
            multiple
            name={cars}
            onChange={selectHandler}
          >
            <option value="Sachin Tendulkar">Sachin Tendulkar</option>
            <option value="Swami Vivekananda">Swami Vivekananda</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
      </div>
    </>
  );
}

export default Management;
