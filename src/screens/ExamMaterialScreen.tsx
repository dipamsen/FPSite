import { Button } from "@material-ui/core";
import React from "react";

const ExamMaterial: React.FC = () => {
  return (
    <div>
      <h2>Exam: Pre Mid Term Test</h2>
      <Button
        color="primary"
        variant="outlined"
        href="https://drive.google.com/file/d/1w1MuGPGwFnfsw_hczd6_7LNzy_jdsuIK/view?usp=sharing"
        target="_blank"
      >
        Syllabus
      </Button>
    </div>
  );
};

export default ExamMaterial;
