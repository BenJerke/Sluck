import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import  Channels  from "./components/Channels";
import  Home  from "./components/Home";
import Login  from "./components/Login";

function App () {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path= "/" component={Home} />
          <Route exact path= "/login" component={Login} />
          <Route exact path= "/channels" render={(props) => <Channels  {...props} /> } />
        </Switch>
      </Router>
    </div>
  )
}

export default App;