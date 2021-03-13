import { Button, ButtonGroup, Divider, useMediaQuery } from "@material-ui/core";
import React from "react";

export default function ChapterResources({
  chapter,
  chapterName,
}: {
  chapter: number;
  chapterName: string;
}): JSX.Element {
  const isMobile = !useMediaQuery("(min-width:600px)");
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              margin: "10px",
            }}
          >
            <div
              style={{
                fontSize: "large",
                margin: "10px",
              }}
            >
              {res.name}
            </div>
            <div>
              <ButtonGroup variant="contained">
                <Button color="primary" target="_blank" href={res.qp}>
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
