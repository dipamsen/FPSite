import { Button, ButtonGroup, Divider, useMediaQuery } from "@material-ui/core";
import React from "react";
import { Chapter } from "../screens/SubjectResources";

export default function ChapterResources({
  chapter,
  chapterName,
}: {
  chapter: Chapter;
  chapterName: string;
}): JSX.Element {
  const isMobile = !useMediaQuery("(min-width:600px)");
  return (
    <div>
      <h3>{chapterName}</h3>
      {chapter.resources.map((res, i) => (
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
                <Button color="primary" target="_blank" href={res.link}>
                  Open
                </Button>
                {res.hasSolution && res.answerLink && (
                  <Button target="_blank" href={res.answerLink}>
                    Answers
                  </Button>
                )}
              </ButtonGroup>
            </div>
          </div>
          <Divider />
        </div>
      ))}
    </div>
  );
}
