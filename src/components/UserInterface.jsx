import React from "react";
import { Outlet } from "react-router-dom";
import MainBar from "./MainBar";

export default function UserInterface() {
  return (
    <div id="uiContainer">
      <MainBar />
      <Outlet />
    </div>
  );
}
