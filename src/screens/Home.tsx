import React from "react";

import LinkedList from "../components/LinkedList";
export default function HomeScreen(): JSX.Element {
  interface ScreenLink {
    name: string;
    disabled?: boolean;
  }
  const pages: ScreenLink[] = [{ name: "Resources" }, { name: "TextBook" }];
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
