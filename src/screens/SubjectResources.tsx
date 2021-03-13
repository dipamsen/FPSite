import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { SUBJECTS } from "../shared/constants";
import { Subject } from "../shared/types";
import ChapterResources from "../components/ChapterResources";

export default function SubjectResources(): JSX.Element {
  const { sub } = useParams<{ sub: Subject }>();
  const [chapter, setChapter] = useState("");
  const chapters = ["Rational Numbers", "Trigonometry"];
  const handleChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    setChapter(String(event.target.value).toString());
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{SUBJECTS[sub]}</h1>
      <FormControl style={{ width: "100%" }} variant="filled">
        <InputLabel>Select Chapter</InputLabel>
        <Select value={chapter} onChange={handleChange}>
          <MenuItem value="" disabled>
            Chapter
          </MenuItem>
          {chapters.map((ch, i) => (
            <MenuItem value={i} key={i}>
              {ch}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {chapter && (
        <ChapterResources chapter={+chapter} chapterName={chapters[+chapter]} />
      )}
    </div>
  );
}
