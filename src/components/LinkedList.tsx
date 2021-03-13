import React from "react";
import { List, ListItem } from "@material-ui/core";
import { Link, useRouteMatch } from "react-router-dom";

interface NameAndURL {
  name: string;
  url: string;
}

export default function LinkedList({
  list,
}: {
  list: NameAndURL[];
}): JSX.Element {
  const { url: baseURL } = useRouteMatch();
  return (
    <div>
      <List>
        {list.map(({ name, url }, i) => (
          <ListItem
            divider
            button
            key={i}
            component={Link}
            to={`${baseURL == "/" ? "" : baseURL}/${url}`}
          >
            {name}
          </ListItem>
        ))}
      </List>
    </div>
  );
}
