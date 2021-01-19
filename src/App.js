import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from "./Component/Main";
import CreateMatch from "./Component/CreateMatch";
import Ball from "./Component/Ball"
import ScoreBoard from "./Component/ScoreBoard"
import StateFull from "./Component/StateFull";
import Mangement from "./Component/Management";
function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/createMatch" component={CreateMatch} />
           <Route exact path="/ball" component={Ball} />
             <Route exact path="/scoreboard" component={ScoreBoard} />
             <Route exact path="/class" component={StateFull} />
                <Route exact path="/management" component={Mangement} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
