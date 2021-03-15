import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  ListItem,
  List,
  Select,
} from "@material-ui/core";
import axios from "axios";
// import { List, ListItem } from "@material-ui/core";
// import { Link } from "react-router-dom";
export default function TextBookScreen(): JSX.Element {
  const [subject, setSubject] = useState<string>("");
  const [subjectList, setSubjectList] = useState<string[]>([]);
  const [chapters, setChapters] = useState<{
    subject?: string;
    bookName?: string;
    chapters?: { name: string; index: string; link: string }[];
  }>({});
  const handleChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    setSubject(String(event.target.value).toString());
    async function getChapters(x: string) {
      if (!x) return;
      const { data } = await axios.get(
        `https://fp-ncert-textbooks-10.vercel.app/grade10/${x}.json`
      );
      setChapters(data);
    }
    getChapters(String(event.target.value));
  };
  useEffect(() => {
    async function getSubjects() {
      const {
        data: { subjects },
      } = await axios.get(
        "https://fp-ncert-textbooks-10.vercel.app/subjects.json"
      );
      setSubjectList(subjects);
    }
    getSubjects();
  }, []);
  return (
    <>
      <h2 style={{ textAlign: "center" }}>EBook</h2>
      <FormControl style={{ width: "100%" }}>
        <InputLabel>Select Subject</InputLabel>
        {subjectList && (
          <Select value={subject} onChange={handleChange}>
            <MenuItem value="" disabled>
              Select Subject
            </MenuItem>
            {subjectList.sort().map((name, i) => (
              <MenuItem key={i} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        )}
        {chapters?.chapters && (
          <>
            <h2>
              Subject: {subject}
              {"\n"}
              <br></br>Book Name: {chapters.bookName}
            </h2>
            <List>
              {chapters.chapters.map(
                (
                  ch: Record<string, string>,
                  i: React.Key | null | undefined
                ) => (
                  <ListItem
                    key={i}
                    divider
                    component="a"
                    href={ch.link}
                    target="_blank"
                  >
                    {ch && `${ch.index}. ${ch.name}`}
                  </ListItem>
                )
              )}
            </List>
          </>
        )}
      </FormControl>
    </>
  );
}
