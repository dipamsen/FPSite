import {
  CircularProgress,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SUBJECTS } from "../shared/constants";
import { Subject } from "../shared/types";
import ChapterResources from "../components/ChapterResources";
import SB from "../shared/SupaBase";

// const examNames = {
//   PreMTT: "Pre Mid Term Test",
//   MTT: "Mid Term Test",
//   PostMTT: "Post Mid Term Test",
//   PreBoard: "Pre Boards",
// };

export interface Chapter {
  category: string;
  name: string;
  resources: Resource[];
}

export interface Resource {
  name: string;
  drive_id: string;
  answers_id?: string;
  is_folder: boolean;
  ignore: boolean;
}

export default function SubjectResources(): JSX.Element {
  const { sub } = useParams<{ sub: Subject }>();
  const [chapter, setChapter] = useState("");
  const [chaptersList, setChaptersList] = useState<Chapter[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    async function getChapterListWithResources() {
      const {
        data,
        error,
      }: {
        data: Chapter[] | null;
        error: Omit<Error, "name"> | null;
      } = await SB.from(sub).select("*");
      console.log(data, error);
      if (data) {
        setChaptersList(
          data.filter(
            (x) =>
              x == null || x.resources.filter((res) => res == null).length == 0
          )
        );
        setLoaded(true);
      }
    }
    getChapterListWithResources();
  }, []);
  const handleChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    const val = event.target.value;
    setChapter(val ? String(event.target.value).toString() : "");
  };
  const chaptersCat = {
    PreMTT: chaptersList.filter((ch) => ch.category === "PreMTT"),
    MTT: chaptersList.filter((ch) => ch.category === "MTT"),
    PostMTT: chaptersList.filter((ch) => ch.category === "PostMTT"),
    PreBoard: chaptersList.filter((ch) => ch.category === "PreBoard"),
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
              {chaptersCat.PreMTT.length > 0 && (
                <ListSubheader>Pre Mid Term Test</ListSubheader>
              )}
              {chaptersCat["PreMTT"].map((ch, i) => (
                <MenuItem value={i} key={i}>
                  {ch.name}
                </MenuItem>
              ))}
              {chaptersCat.MTT.length > 0 && (
                <ListSubheader>Mid Term Test</ListSubheader>
              )}
              {chaptersCat["MTT"].map((ch, i) => (
                <MenuItem value={i} key={i}>
                  {ch.name}
                </MenuItem>
              ))}
              {chaptersCat.PostMTT.length > 0 && (
                <ListSubheader>Post Mid Term Test</ListSubheader>
              )}
              {chaptersCat["PostMTT"].map((ch, i) => (
                <MenuItem value={i} key={i}>
                  {ch.name}
                </MenuItem>
              ))}
              {chaptersCat.PreBoard.length > 0 && (
                <ListSubheader>Pre Board Examination</ListSubheader>
              )}
              {chaptersCat["PreBoard"].map((ch, i) => (
                <MenuItem value={i} key={i}>
                  {ch.name}
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
          chapterName={chaptersList[+chapter].name}
        />
      )}
    </div>
  );
}
