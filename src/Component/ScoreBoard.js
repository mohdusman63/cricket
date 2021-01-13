import axios from "axios";
import React, { useEffect, useState } from "react";
// import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Ball from "./Ball";
// import Ball from "./Ball"

function ScoreBoard(props) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState("loading");
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const [batsman, setBatsman] = useState([]);
  const [over,setOver]=useState()
  const [bowler, setBowler] = useState();
  const [count, setCount] = useState(0);


  //ball state
   let [score, setScore] = useState(0);
  let [ball, setBall] = useState(6);
  let [lastClicked, setLastClicked] = useState([]);

  useEffect(() => {
    async function getTeam() {
      try {
        let res = await axios.get(
          `https://fast-atoll-73668.herokuapp.com/fetchTeam`
        );
        // console.log(res.data.message[0]);
        // console.log(res.data.message[1])
        setList(res.data.message);
        setTeam1(res.data.message[0]);
        setTeam2(res.data.message[1]);
        setLoading(" ");
        //    let list = res.data.message;
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
          setList1(data.player_list);
          console.log(data);
        })
        .catch((e) => console.log(e));
    } catch (e) {}
  }

  const checkBoxHandler = (e) => {
    //   alert(e.target.value);
    let team_id = e.target.value;
    getList(team_id);
  };
  const checkBox2Handler = (e) => {
    //alert(e.target.value);
    let team_id = e.target.value;
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
        setList2(data.player_list);
        console.log(data);
      })
      .catch((e) => console.log(e));
  };
  //select 3 player strike,non strike,bowler
  const multiSelect = (e) => {
    alert(e.target.value);
    let val = e.target.value;
    setBatsman((preValue) => {
      return [...preValue, val];
    });
     console.log(batsman.length);
     let l=batsman.length
     if(l>1){
       alert('only two batsman can selected')
       return false
     }
  };
  const multiSelectBowler = (e) => {
    alert(e.target.value);
    setBowler(e.target.value);
  };



        //ball


 const clickHandler = (e) => {
    if (ball === 0) {
      alert("Over is ended");
      return;
    }
    ball--;
    let value = parseInt(e.target.value);
    //setLastClicked(value)
    setScore(score + value);
    setBall(ball);
    setLastClicked((preValue) => {
      return [...preValue, value];
    });
    //console.log(ball)
  };
  const redoHandler = (e) => {};
  const undoHandler = () => {
    let countBall = parseInt(ball);
    let getScore = parseInt(score);
    //console.log(countBall,getScore,lastClicked)
    //setBall(parseInt(countBall) + 1);
    //setScore(getScore-lastClicked.pop() );
    console.log(lastClicked);
    //console.log(lastClicked.pop());
    let lastValue = lastClicked.pop();
    console.log(lastValue);
    setScore(getScore - lastValue);
    //console.log(countBall,getScore,lastClicked)
  };




  return (
    <>
      <h5 className="text-center">score board </h5>
      <div className="col-md-10 mx-auto ">
        {loading}
     <div className="row mx-auto">
        <div className="row">
          {team1.team_name}
          <input
            type="checkbox"
            value={team1._id}
            className="m-2"
            onChange={checkBoxHandler}
          />
          {team2.team_name}
          <input
            type="checkbox"
            value={team2._id}
            className="m-2"
            onChange={checkBox2Handler}
          />

        </div>
        <div className="row m-3">
          <select multiple={true} className="m-2" onChange={multiSelect}>
            {" "}
            <option>Player Name</option>
            {list1.map((element, index) => (
              <option key={index} value={element.name} name={element._id}>
                {element.name}
              </option>
            ))}
          </select>

          <select multiple={true} className="m-2" onChange={multiSelectBowler}>
            <option>Player Name</option>
            {list2.map((element, index) => (
              <option key={index} value={element.name} name={element._id}>
                {element.name}
              </option>
            ))}
          </select>
          <h6 className="m-5">total over</h6>
          <select className="">
            <option>5</option>
             <option>10</option>
              <option>15</option>
               <option>20</option>
          </select>
        </div>
        </div>
        <div>
          <h5>ScoreBoard</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Player Name</th>
                <th>Ball</th>
                <th>4s</th>
                <th>6s</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{batsman[0]}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>{batsman[1]}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </Table>

        </div>

        {/* //ball layout */}
        <div className="mt-3">
          <div className="col-md-5 mt-3 mx-auto">
        <div className="input-group mb-3">
          <input type="text" className="form-control" value={score} readOnly />
          <div className="input-group-prepend">
            <span className="input-group-text">BallLeft</span>
            <span className="input-group-text">{ball}</span>
          </div>
        </div>

        <table className="table">
          <tbody>
            <tr></tr>
            <tr>
              <td>
                <button
                  type="button"
                  className="btn btn-info p-2"
                  value="1"
                  onClick={(e) => {
                    clickHandler(e);
                  }}
                >
                  1
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-info"
                  value="2"
                  onClick={(e) => {
                    clickHandler(e);
                  }}
                >
                  2
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-info"
                  value="3"
                  onClick={(e) => {
                    clickHandler(e);
                  }}
                >
                  3
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-success"
                  value="4"
                  onClick={(e) => {
                    clickHandler(e);
                  }}
                >
                  4
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  value="6"
                  onClick={(e) => {
                    clickHandler(e);
                  }}
                >
                  6
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  value=""
                  onClick={(e) => {
                    clickHandler(e);
                  }}
                >
                  out
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-info"
                  value="1"
                  onClick={(e) => {
                    clickHandler(e);
                  }}
                >
                  wide
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-info"
                  value="1"
                  onClick={(e) => {
                    clickHandler(e);
                  }}
                >
                  no ball
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-info"
                  value=""
                  onClick={(e) => {
                    redoHandler(e);
                  }}
                >
                  Redo
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-info"
                  value=""
                  onClick={() => {
                    undoHandler();
                  }}
                >
                  Undo
                </button>
              </td>
            </tr>
            {ball ? null :
              <tr className="text-center">
                <td>
                  <button type="button" className="btn btn-info" value="">
                    Submit
                  </button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
        </div>
      </div>

    </>
  );
}

export default ScoreBoard;
