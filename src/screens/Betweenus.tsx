import React, { useState } from "react";
// import { Select, MenuItem, List, ListItem } from "@material-ui/core";
import LinkedList from "../components/LinkedList";
export default function Betweenus(): JSX.Element {
  const subjects = {
    eng: "English",
    hin: "Hindi",
    mat: "Maths",
    sci: "Science",
    ssc: "Social Science",
  };
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Betweenus</h2>
      <LinkedList
        list={Object.entries(subjects).map(([code, name]) => ({
          name,
          url: code,
        }))}
      />
    </div>
  );
}
