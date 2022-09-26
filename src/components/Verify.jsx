import { Box, Container, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { verify } from "../features/authSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Logo from "./Logo";

export default function Verify() {
  const { hash } = useParams();
  const dispatch = useDispatch();
  const { verifyError } = useSelector((state) => state.wall);
  const goTo = useNavigate();

  useEffect(() => {
    dispatch(verify({ hash }));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (hash.length !== 130) goTo("/landing");
    setTimeout(() => goTo("/landing"), 2000);
    // eslint-disable-next-line
  }, [verifyError]);

  return (
    <div id="verifyContainer" style={{ height: "100%", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Container sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Paper sx={{ p: "35px", pt: "35px", minWidth: "420px", display: "flex", flexDirection: "column", alignItems: "center" }} elevation={2}>
          <Logo width={70} gap={13} fontSize={39} text={"right"} />
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Typography sx={{ pt: "9px", color: "#3a1e04", fontFamily: "Open Sans", fontSize: "25px", fontWeight: 700 }}>
              Email Verification
            </Typography>
            {verifyError === "success" ? (
              <Box sx={{ mt: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <img style={{ width: "55px" }} src="../assets/correct.png" alt="Verification Success" />
                <Typography sx={{ color: "#27d300", fontWeight: 500 }}>Email is now verified!</Typography>
              </Box>
            ) : verifyError === "failed" ? (
              <Box sx={{ mt: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <img style={{ width: "55px" }} src="../assets/incorrect.png" alt="Verification Failed" />
                <Typography sx={{ color: "#d30000", fontWeight: 500 }}>Email verification failed.</Typography>
              </Box>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "15px" }}>
                <Typography>Please wait...</Typography>
                <CircularProgress color="grey" disableShrink />
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
