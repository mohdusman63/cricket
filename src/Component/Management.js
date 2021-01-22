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
          console.log(data);
          let p = [...playerList];
          console.log(p);
          let insertData = {
            id: team_id,
            playerList: data.player_list,
          };
          setPlayerList((prev) => {
            return [...prev, insertData];
          });
        })

        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  }

  const checkBoxHandler = (e) => {
    console.log(" ==== ", e.target.checked, e.target.value);
    if (!e.target.checked) {
      let update = playerList.filter((item) => item.id !== e.target.value);
      console.log(update);
      setPlayerList(update);

      return;
    }
    if (playerList.length > 1) {
      alert("you can perform match maximum two team ");
      console.log(e.target.checked);
      e.target.checked = false;
      return false;
    }

    const { checked, value } = e.target;
    setIds((preValue) => {
      return [...preValue, value];
    });
    getList(value);
  };
  const getPlayer = () => {
    // console.log(playerList);
    console.log(playerList[0]);
    // console.log(playerList.length);
    setTeam1(playerList[0]);
    // // console.log("");
    setTeam2(playerList[1]);
    // // //console.log(playerList[0]);
    // // //console.log(playerList[1]);
    // playerList[0].map((elel) =>
    //   setTeamValue((pre) => {
    //     return [...pre, { label: elel.name, value: elel.player_id }];
    //   })
    // );
    // playerList[1].map((elel1) =>
    //   setTeamValue2((prev) => {
    //     return [...prev, { label: elel1.name, value: elel1.player_id }];
    //   })
    // );
    //teamValue;
  };
  const handler = (e) => {
    console.log(e.target);
    console.log(e.target.name, e.target.value);
  };
  const selectHandler = (e) => {
    console.log(e.target);
    alert(e.target.value);
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

        <div>
          {playerList.map((element, index) => (
            <select key={index} className="m-2" onChange={selectHandler}>
              <option value="" disabled>
                Player Name
              </option>
              {element.playerList.map((val, index) => (
                <option key={index} value={val.player_id}>
                  {val.name + "--" + val.role}{" "}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>
      <button className="btn btn-success" onClick={() => getPlayer()}>
        Start Match
      </button>

      <select className="m-2" onChange={selectHandler}>
        <option value="" disabled>
          Player Name
        </option>
        {team1.playerList
          ? team1.playerList.map((el, index) => (
              <option key={index}>{el.name}</option>
            ))
          : ""}
      </select>
      <select className="m-2" onChange={selectHandler}>
        <option value="" disabled>
          Player Name
        </option>
        {team2.playerList
          ? team2.playerList.map((el, index) => (
              <option key={index}>{el.name}</option>
            ))
          : ""}
      </select>
    </>
  );
}

export default Management;
