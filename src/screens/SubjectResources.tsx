import {
  CircularProgress,
  Divider,
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
  hidden: boolean;
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
          data
            .filter(
              (x) =>
                x == null ||
                x.resources.filter((res) => res == null).length == 0
            )
            .filter((x) => !x.hidden)
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
    if (!(val == null))
      setChapter(val !== "" ? String(event.target.value).toString() : "");
  };
  let i = 0;
  const chaptersCat: Record<string, [number, Chapter][]> = {
    PreMTT: chaptersList
      .filter((ch) => ch.category === "PreMTT")
      .map((ch) => [i++, ch]),
    MTT: chaptersList
      .filter((ch) => ch.category === "MTT")
      .map((ch) => [i++, ch]),
    PostMTT: chaptersList
      .filter((ch) => ch.category === "PostMTT")
      .map((ch) => [i++, ch]),
    PreBoard: chaptersList
      .filter((ch) => ch.category === "PreBoard")
      .map((ch) => [i++, ch]),
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
                <ListSubheader style={{ backgroundColor: "white" }}>
                  Periodic Tests
                </ListSubheader>
              )}
              {chaptersCat["PreMTT"].map(([i, ch]) => (
                <MenuItem value={i} key={i}>
                  {ch.name}
                </MenuItem>
              ))}
              {chaptersCat.MTT.length > 0 && (
                <ListSubheader style={{ backgroundColor: "white" }}>
                  Boards - Term I
                </ListSubheader>
              )}
              {chaptersCat["MTT"].map(([i, ch]) => (
                <MenuItem value={i} key={i}>
                  {ch.name}
                </MenuItem>
              ))}
              <Divider />
              {chaptersCat.PostMTT.length > 0 && (
                <ListSubheader style={{ backgroundColor: "white" }}>
                  Periodic Tests
                </ListSubheader>
              )}
              {chaptersCat["PostMTT"].map(([i, ch]) => (
                <MenuItem value={i} key={i}>
                  {ch.name}
                </MenuItem>
              ))}
              {chaptersCat.PreBoard.length > 0 && (
                <ListSubheader style={{ backgroundColor: "white" }}>
                  Boards - Term II
                </ListSubheader>
              )}
              {chaptersCat["PreBoard"].map(([i, ch]) => (
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
