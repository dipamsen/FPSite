import React from "react";
import { Link } from "react-router-dom";

export default function NoMatch(): JSX.Element {
  return (
    <div>
      <h3>
        404 Error. <Link to="/">Go Back Home</Link>
      </h3>
    </div>
  );
}
