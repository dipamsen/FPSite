import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./screens/Home";
import NotFound from "./screens/NotFound";
import { Container } from "@material-ui/core";

function App(): JSX.Element {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Container maxWidth="md">
            <HomeScreen />
          </Container>
        </Route>
        <Route path="*">
          <Container maxWidth="md">
            <NotFound />
          </Container>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
