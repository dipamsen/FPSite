import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./screens/Home";

function App(): JSX.Element {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomeScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
