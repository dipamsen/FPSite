import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./screens/Home";

function App(): JSX.Element {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/">
          <HomeScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
