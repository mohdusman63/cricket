import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
function ScoreBoard(props) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState("loading");
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const [batsman, setBatsman] = useState([]);    //slected batsman in selecthandler
  const [over, setOver] = useState(0);          //total no of over limit
  const [bowler, setBowler] = useState();
  const [count, setCount] = useState(0);
  let [balltracker1, setBallTracker1] = useState(0);  //total run for batsman1
  let [balltracker2, setBallTracker2] = useState(0);//total run for batsman2
  const [strike, setStrike] = useState("strike");
  const [nonstrike, setNonStrike] = useState("");
  let [totalBall, setTotalBall] = useState(0);  //count the total ball
  let [four1, setFour1] = useState(0);          //count four for batsman1
  let [six1, setSix1] = useState(0);          //count six for batsman1
  let [four2, setFour2] = useState(0);         //count four for batsman2
  let [six2, setSix2] = useState(0);           //count six for batsman2
  let [batsman1, setBatsman1] = useState();    //batsman name 1 in table
  let [batsman2, setBatsman2] = useState();     //batsman 2 in table
  let [redoCount, setRedoCount] = useState(0);
  let [countBall1,setCountBall1]=useState(0)        //count the frequncy of ball player1
  let [countBall2,setCountBall2]=useState(0)          //count the frequncy of ball player1
  let [id,setTeamId]=useState([])

  //ball state
  let [score, setScore] = useState(0);
  let [ball, setBall] = useState(6);
  let [lastClicked, setLastClicked] = useState([]); //for undo
  // fetched the team
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
  //get player list of team 1
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
  // click checkbox for get player name called the upper function
  const checkBoxHandler = (e) => {
    //   alert(e.target.value);
    let team_id = e.target.value;
    getList(team_id);
    setTeamId((prev)=>{
      return [...prev,team_id]
    })

  };
       //   for swapping team send id of first team getlist(1)
   async function getList2(team_id) {
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
          setList2(data.player_list);
          console.log(data);
        })
        .catch((e) => console.log(e));
    } catch (e) {}
  }

  // click checkbox for get player name called the upper function
  const checkBox2Handler = (e) => {
    //alert(e.target.value);
    let team_id = e.target.value;
    setTeamId((prev)=>{
      return [...prev,team_id]
    })
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
    //alert(e.target.value);
    let val = e.target.value;
    setBatsman((preValue) => {
      return [...preValue, val];
    });
    console.log(batsman.length);
    let l = batsman.length;

    if (l > 1) {
      console.log(l);

      alert("only two batsman can selected");
      return false;
    }
  };

  const startMatch = () => {
    alert("hii");
    setBatsman1(batsman[0]);
    setBatsman2(batsman[1]);
  };
  //over handle

  const overHandler = (e) => {
    alert(e.target.value);
    let v = parseInt(e.target.value);
    setOver(v);
  };
  //handle the bowler name
  const multiSelectBowler = (e) => {
    alert(e.target.value);
    setBowler(e.target.value);
  };

  //ball tracker

  const clickHandler = (e) => {
     let l = batsman.length;
     if(l<2){
       alert('plz add two batsman on strike')
       return
     }

    if (Math.floor(totalBall / 6) === over && ball===0) {
      alert("over reached the maximum swapping the player ... ");
       let rev=id.reverse()
        //console.log(rev[0])
        getList(rev[0])
        getList2(rev[1])
        setBatsman([])


      return false;
    }

    if (ball === 0) {
      alert("Over is ended");
       alert(id)
       console.log(id)


      console.log(ball);
      ball = 6;
      setBall(ball);
      setLastClicked([]);
      return;
    }
    totalBall++;
    setTotalBall(totalBall);
    ball--;
    let value = parseInt(e.target.value);
    //setLastClicked(value)
    setScore(score + value);
    setBall(ball);
    //for undo
    setLastClicked((preValue) => {
      return [...preValue, value];
    });

    if (value % 2 === 0) {
      if (value % 4 === 0) {
        console.log(ball)
        if (strike === "strike") {
          setFour1(four1 + 1);
        } else if (nonstrike === "strike") {
          setFour2(four2 + 1);
        }
      }
      if (value % 6 === 0) {
        if (strike === "strike") {
          setSix1(six1 + 1);
        } else if (nonstrike === "strike") {
          setSix2(six2 + 1);
        }
      }

      if (strike === "strike") {
        setBallTracker1(balltracker1 + value);
        setCountBall1(countBall1+1)
        setStrike("strike");
        setNonStrike("");
        //   console.log(strike)
        if (ball === 0) {
          console.log("ball fsdfgd");
          if (strike === "strike") {
            setStrike("");
             setNonStrike("strike");
          } else if (nonstrike === "strike"){
          setNonStrike("");
          // setStrike("strike");
          }
        }
      } else if (nonstrike === "strike" && strike === "") {
        setBallTracker2(balltracker2 + value);
        setCountBall2(countBall2+1)
      }
    } else {
      if (strike === "strike") {
        setBallTracker1(balltracker1 + value);
        setCountBall1(countBall1+1)
        setStrike("");
        setNonStrike("strike");
      } else {
        setBallTracker2(balltracker2 + value);
        setCountBall2(countBall2+1)
        setStrike("strike");
        setNonStrike("");
      }
    }
    //console.log(ball)
  };

  const redoHandler = (e) => {
    setRedoCount(redoCount + 1);
    if (score <= 0 || ball === 6) {
      alert("redo not possiable");
      return;
    }
    if (redoCount >= 1 && score <= 0) {
      alert("1 time redo possible");
      return;
    }
    let lastValue = lastClicked.pop();
    console.log(redoCount);
    setScore(score - lastValue);
    console.log(redoCount);
  };
  const undoHandler = () => {
    if (lastClicked.length <= 0) {
      alert("undo not possiable");
      return;
    }
    let countBall = parseInt(ball);
    let getScore = parseInt(score);
    let lastValue = lastClicked.pop();
    setScore(getScore - lastValue);
  };

  const noBallHandler = () => {
    setBall(ball);
    setScore(score + 1);
  };
  const wideHandler = () => {
    if (ball === 0) {
      alert("over is ended");
      return;
    }
    setScore(score + 1);
  };
  const outHandler = () => {
    // console.log(strike)
    if (strike === "strike") {
      // console.log(batsman1)
      console.log(batsman.length);
      batsman.shift();
      console.log(batsman.length);
      setBatsman1("out");
    } else {
      console.log("=====>" + nonstrike);
      batsman.splice(1, 1);
      console.log(batsman2);
      setBatsman2("out");
    }
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

            <select
              multiple={true}
              className="m-2"
              onChange={multiSelectBowler}
            >
              <option>Player Name</option>
              {list2.map((element, index) => (
                <option key={index} value={element.name} name={element._id}>
                  {element.name}
                </option>
              ))}
            </select>
            <h6 className="m-5">total over</h6>
            <select className="" onChange={overHandler}>
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
            </select>
          </div>
        </div>
        <button
          onClick={(e) => startMatch()}
          className="btn btn-success"
          style={{ float: "right" }}
        >
          start Game
        </button>
        <div>
          <h5>ScoreBoard</h5>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Player Name</th>
                <th>Run</th>
                <th>4s</th>
                <th>6s</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {batsman1}
                  {"........."}
                  {strike}
                </td>
                <td>{balltracker1}({countBall1})</td>
                <td>{four1}</td>
                <td>{six1}</td>
              </tr>
              <tr>
                <td>
                  {batsman2}
                  {"........."}
                  {nonstrike}
                </td>
                <td>{balltracker2}({countBall2})</td>
                <td>{four2}</td>
                <td>{six2}</td>
              </tr>
            </tbody>
          </Table>
        </div>

        {/* //ball layout */}
        <div className="mt-3">
          <div className="col-md-5 mt-3 mx-auto">
            <h5>total ball is ..{totalBall}</h5>
            <h5>total over is ..{Math.floor(totalBall / 6)}</h5>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={score}
                readOnly
              />
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
                        outHandler(e);
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
                        wideHandler(e);
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
                        noBallHandler(e);
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
                {ball ? null : (
                  <tr className="text-center">
                    <td>
                      <button type="button" className="btn btn-info" value="">
                        Submit
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScoreBoard;
