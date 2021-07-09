import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Header(): JSX.Element {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" aria-label="logo">
          <img src="logo.png" width="40" alt="" />
        </IconButton>
        <Typography align="center" style={{ width: "100%" }} variant="h4">
          Fun Planet
        </Typography>
        <IconButton edge="end" aria-label="home" component={Link} to="/">
          <Home style={{ color: "white" }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
