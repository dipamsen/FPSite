import React from "react";

import LinkedList from "../components/LinkedList";
export default function HomeScreen(): JSX.Element {
  const pages = [{ name: "Resources", disabled: true }, { name: "TextBook" }];
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Grade 10</h2>
      <LinkedList
        list={pages.map((x) => ({
          name: x.name,
          url: x.name.toLowerCase(),
          disabled: x.disabled,
        }))}
      />
    </>
  );
}
