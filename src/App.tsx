import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./screens/Home";
import TextbookScreen from "./screens/Textbook";
import ResourcesScreen from "./screens/Resources";
import NotFound from "./screens/NotFound";
import SubjectResourcesScreen from "./screens/SubjectResources";
import { Container } from "@material-ui/core";

function App(): JSX.Element {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/textbook">
          <Container maxWidth="md">
            <TextbookScreen />
          </Container>
        </Route>
        <Route exact path="/resources/:sub">
          <Container maxWidth="md">
            <SubjectResourcesScreen />
          </Container>
        </Route>
        <Route exact path="/resources">
          <Container maxWidth="md">
            <ResourcesScreen />
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
