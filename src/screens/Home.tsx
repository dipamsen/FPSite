import React from "react";
import { Container, List, ListItem } from "@material-ui/core";
import { Link } from "react-router-dom";
export default function HomeScreen(): JSX.Element {
  const pages = ["Betweenus", "Papers"];
  return (
    <Container maxWidth="md">
      <h2 style={{ textAlign: "center" }}>Grade 10</h2>
      <List>
        {pages.map((x, i) => (
          <ListItem divider button key={i} component={Link} to={`/${x}`}>
            {x}
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
