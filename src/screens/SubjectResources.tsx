import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SUBJECTS } from "../shared/constants";
import { Subject } from "../shared/types";
import ChapterResources from "../components/ChapterResources";
import * as API from "../shared/API";

export interface Chapter {
  chapterName: string;
  resources: Resource[];
}

interface Resource {
  name: string;
  hasSolution: boolean;
  link: string;
  answerLink?: string;
}

export default function SubjectResources(): JSX.Element {
  const { sub } = useParams<{ sub: Subject }>();
  const [chapter, setChapter] = useState("");
  const [chaptersList, setChaptersList] = useState<Chapter[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    async function getChapterListWithResources() {
      const data = await API.get(`/resources/${sub}`);
      setChaptersList(data);
      setLoaded(true);
    }
    getChapterListWithResources();
  }, []);
  const handleChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    setChapter(String(event.target.value).toString());
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{SUBJECTS[sub]}</h1>
      {loaded ? (
        chaptersList.length ? (
          <FormControl style={{ width: "100%" }} variant="filled">
            <InputLabel>Select Chapter</InputLabel>
            <Select value={chapter} onChange={handleChange}>
              <MenuItem value="" disabled>
                Chapter
              </MenuItem>
              {chaptersList.map((ch, i) => (
                <MenuItem value={i} key={i}>
                  {ch.chapterName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <p>No Resources Found</p>
        )
      ) : (
        <CircularProgress />
      )}
      {chapter && (
        <ChapterResources
          chapter={chaptersList[+chapter]}
          chapterName={chaptersList[+chapter].chapterName}
        />
      )}
    </div>
  );
}
