import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./screens/Home";
import SyllabusScreen from "./screens/Syllabus";
import BetweenusScreen from "./screens/Betweenus";
import NotFound from "./screens/NotFound";
import { Container } from "@material-ui/core";

function App(): JSX.Element {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/syllabus">
          <Container maxWidth="md">
            <SyllabusScreen />
          </Container>
        </Route>
        <Route exact path="/betweenus">
          <Container maxWidth="md">
            <BetweenusScreen />
          </Container>
        </Route>
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
