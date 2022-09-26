import { Typography } from "@mui/material";
import React from "react";

export default function Logo({ width = 50, gap = 0, fontSize = 50, alignSelf = "flexStart", text = false, contrast = false }) {
  return (
    <div
      id="logoContainer"
      style={{
        display: "flex",
        flexDirection: text === "bottom" ? "column" : "row",
        // justifyContent: text === "bottom" ? "center" : "",
        // alignItems: text === "bottom" ? "" : "center",
        justifyContent: "center",
        alignItems: "center",
        gap: gap,
        alignSelf: alignSelf,
      }}
    >
      <img style={{ width: width }} src="../assets/Logo-only.svg" alt="heal.me logo" />
      {!text ? null : (
        <Typography sx={{ fontFamily: "Lexend", fontSize: fontSize, fontWeight: 600, color: !contrast ? "#0a7878" : "white" }}>heal.me</Typography>
      )}
    </div>
  );
}
