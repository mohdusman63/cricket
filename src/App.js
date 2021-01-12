import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from "./Component/Main";
import CreateMatch from "./Component/CreateMatch";
import Ball from "./Component/Ball"
function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/createMatch" component={CreateMatch} />
           <Route exact path="/ball" component={Ball} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
