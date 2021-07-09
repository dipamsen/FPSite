import { Button } from "@material-ui/core";
import React from "react";

const ExamMaterial: React.FC = () => {
  return (
    <div>
      <h2>Exam: Pre Mid Term Test</h2>
      <Button
        color="secondary"
        variant="contained"
        href="https://drive.google.com/file/d/1w1MuGPGwFnfsw_hczd6_7LNzy_jdsuIK/view?usp=sharing"
        target="_blank"
      >
        Syllabus and Timetable
      </Button>
      <Button
        color="secondary"
        variant="outlined"
        href="https://drive.google.com/drive/folders/1EVooSfVMwshQje0m4yz4Fa2dDd8S7Gsa?usp=sharing"
        target="_blank"
      >
        Question Papers
      </Button>
    </div>
  );
};

export default ExamMaterial;
