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
      chapters: { name: string; index: number; link: string }[];
    }[]
  >([]);
  const handleChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    setSubject(String(event.target.value).toString());
  };
  useEffect(() => {
    async function getSubjects() {
      const allSubjects = await get("/textbook");
      setSubjectList(allSubjects);
    }
    getSubjects();
  }, []);
  const currSub = () => subjectList[+subject];
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
              <MenuItem key={i} value={i}>
                {name.subject}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <CircularProgress />
      )}
      {subject !== "" && (
        <>
          <h2>
            Subject: {currSub().subject}
            {"\n"}
            <br />
            Book Name: {currSub().bookName}
          </h2>
          <List>
            {currSub().chapters.map((ch, i) => (
              <ListItem
                key={i}
                divider
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
