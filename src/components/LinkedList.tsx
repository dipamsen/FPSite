import React from "react";
import { List, ListItem } from "@material-ui/core";
import { Link, useRouteMatch } from "react-router-dom";

interface NameAndURL {
  name: string;
  url: string;
  disabled?: boolean;
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
        {list.map(({ name, url, disabled }, i) => (
          <ListItem
            divider
            button
            key={i}
            disabled={disabled}
            component={Link}
            to={`${baseURL == "/" ? "" : baseURL}/${url}`}
          >
            {name} {disabled && "(Work in Progress)"}
          </ListItem>
        ))}
      </List>
    </div>
  );
}
