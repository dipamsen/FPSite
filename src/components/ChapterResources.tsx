import { Button, ButtonGroup, Divider } from "@material-ui/core";
import React from "react";

export default function ChapterResources({
  chapter,
  chapterName,
}: {
  chapter: number;
  chapterName: string;
}): JSX.Element {
  const resources = [
    {
      name: "Practice Sheet",
      qp: "https://google.com",
      as: "https://betweenus.in",
    },
  ];
  return (
    <div>
      <h1>
        Chapter: {chapter}. {chapterName}
      </h1>
      {resources.map((res, i) => (
        <div key={i}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ margin: "10px", fontSize: "large" }}>{res.name}</div>
            <div>
              <ButtonGroup variant="contained">
                <Button target="_blank" href={res.qp}>
                  Question Paper
                </Button>
                <Button target="_blank" href={res.as}>
                  Answer Sheet
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <Divider />
        </div>
      ))}
    </div>
  );
}
