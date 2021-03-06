import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import  Channels  from "./components/Channels/Channels";
import  Home  from "./components/Home/Home";
import Login  from "./components/Login/Login";

class App extends React.Component {
  render () {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path= "/" component={Home} />
            <Route exact path= "/login" component={Login} />
            <Route exact path= "/channels" render={() => <Channels /> } />
          </Switch>
        </Router>
      </div>
    );
  };
};

export default App;
