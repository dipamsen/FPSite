import React from "react";
import { Container, List, ListItem } from "@material-ui/core";
export default function HomeScreen(): JSX.Element {
  return (
    <Container maxWidth="md">
      <h2 style={{ textAlign: "center" }}>Grade 10</h2>
      <List>
        {["English", "Hindi", "Mathematics", "Science", "Social Science"].map(
          (x, i) => (
            <ListItem
              ContainerProps={{ style: { width: "140px" } }}
              divider
              button
              key={i}
            >
              {x}
            </ListItem>
          )
        )}
      </List>
    </Container>
  );
}
