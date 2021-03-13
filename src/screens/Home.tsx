import React from "react";

import LinkedList from "../components/LinkedList";
export default function HomeScreen(): JSX.Element {
  const pages = ["Betweenus", "Papers", "Syllabus"];
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Grade 10</h2>
      <LinkedList
        list={pages.map((x) => ({ name: x, url: x.toLowerCase() }))}
      />
    </>
  );
}
