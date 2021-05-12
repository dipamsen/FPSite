import { Button, ButtonGroup, Divider, useMediaQuery } from "@material-ui/core";
import React from "react";
import { Chapter, Resource } from "../screens/SubjectResources";

export default function ChapterResources({
  chapter,
  chapterName,
}: {
  chapter: Chapter;
  chapterName: string;
}): JSX.Element {
  function getLink(res: Resource) {
    return res.is_folder
      ? `https://drive.google.com/drive/folders/${res.drive_id}`
      : `https://drive.google.com/file/d/${res.drive_id}/view`;
  }
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
                <Button color="primary" target="_blank" href={getLink(res)}>
                  Open
                </Button>
                {res.answers_id && (
                  <Button
                    target="_blank"
                    href={`https://drive.google.com/file/d/${res.answers_id}/view`}
                  >
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
