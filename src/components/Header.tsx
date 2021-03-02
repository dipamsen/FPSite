import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";

export default function Header(): JSX.Element {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton color="primary" edge="start" aria-label="menu">
          <img src="logo.png" width="40" alt="" />
        </IconButton>
        <Typography align="center" style={{ width: "100%" }} variant="h4">
          Fun Planet
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
