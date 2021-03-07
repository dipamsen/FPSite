import React, { useState, useEffect } from "react";
import * as API from "../API";

export default function Tester(): JSX.Element {
  const [testName, setTestName] = useState("");
  const [testQuestions, setTestQuestions] = useState<API.Question[]>([]);
  useEffect(() => {
    const testID = "hello, world";
    async function apiCall() {
      const test = await API.getTest(testID);
      setTestName(test.title);
      setTestQuestions(test.questions);
    }
    apiCall();
  }, []);
  return (
    <>
      <h1>Test {testName}</h1>
    </>
  );
}
