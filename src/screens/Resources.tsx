import React from "react";
// import { Select, MenuItem, List, ListItem } from "@material-ui/core";
import LinkedList from "../components/LinkedList";
import { SUBJECTS } from "../shared/constants";
export default function Resources(): JSX.Element {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Resources</h2>
      <LinkedList
        list={Object.entries(SUBJECTS).map(([code, name]) => ({
          name,
          url: code,
        }))}
      />
    </div>
  );
}
