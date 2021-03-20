import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  ListItem,
  List,
  Select,
  CircularProgress,
} from "@material-ui/core";
import { get } from "../shared/API";
// import { List, ListItem } from "@material-ui/core";
// import { Link } from "react-router-dom";
export default function TextBookScreen(): JSX.Element {
  const [subject, setSubject] = useState<string>("");
  const [subjectList, setSubjectList] = useState<
    {
      subject: string;
      bookName: string;
      id: string;
      idx: number;
    }[]
  >([]);
  const [currSub, setCurrSub] = useState<{
    subject?: string;
    bookName?: string;
    chapters?: {
      name: string;
      index: number;
      link: number;
    }[];
  }>({});
  const handleChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    setSubject(String(event.target.value).toString());
    async function getThis() {
      const thisSub = await get("/textbook/" + event.target.value);
      setCurrSub(thisSub);
    }
    getThis();
  };
  useEffect(() => {
    async function getSubjects() {
      const allSubjects = await get("/textbook");
      setSubjectList(allSubjects);
    }
    getSubjects();
  }, []);
  return (
    <>
      <h2 style={{ textAlign: "center" }}>EBook</h2>
      {subjectList.length > 0 ? (
        <FormControl style={{ width: "100%" }}>
          <InputLabel>Select Subject</InputLabel>
          <Select value={subject} onChange={handleChange}>
            <MenuItem value="" disabled>
              Select Subject
            </MenuItem>
            {subjectList.map((name, i) => (
              <MenuItem key={i} value={name.idx}>
                {name.subject}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <CircularProgress />
      )}
      {currSub.subject && currSub.chapters && (
        <>
          <h2>
            Subject: {currSub.subject}
            {"\n"}
            <br />
            Book Name: {currSub.bookName}
          </h2>
          <List>
            {currSub.chapters.map((ch, i) => (
              <ListItem
                key={i}
                divider
                // eslint-disable-next-line
                // @ts-ignore
                component="a"
                href={ch.link}
                target="_blank"
              >
                {ch && `${ch.index}. ${ch.name}`}
              </ListItem>
            ))}
          </List>
        </>
      )}
    </>
  );
}
