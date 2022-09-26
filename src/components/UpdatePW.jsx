import { Box, Button, Container, Grid, Paper, styled, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { update } from "../features/authSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import Logo from "./Logo";

export default function UpdatePW({ handleCloseError }) {
  const { hash } = useParams();
  const dispatch = useDispatch();
  const { updateError } = useSelector((state) => state.wall);
  const goTo = useNavigate();

  useEffect(() => {
    if (hash.length !== 130) goTo("/landing");

    if (updateError === "success") {
      setTimeout(() => {
        goTo("/landing");
      }, 3000);
    }
    // eslint-disable-next-line
  }, [updateError]);

  const validationSchema = Yup.object({
    password: Yup.string().min(8, "Minimum 8 characters").max(15, "Max 15 characters").required("Required"),
    checkPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      checkPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // values.userType = isDoctor ? "Doctor" : "Patient";
      values.hash = hash;
      console.log("Reset-Submission:", values);
      dispatch(update(values));
    },
  });

  const HealMeButton = styled(Button)(({ theme }) => ({
    display: "flex",
    justifyContent: "center !important",
    color: "#107878",
    padding: "10px 0",
    borderRadius: "5px",
    border: "1.5px solid #107878",
    "&:hover": {
      color: theme.palette.getContrastText("#107878"),
      backgroundColor: "#107878",
      border: "1.5px solid #107878",
    },
  }));

  return (
    <div id="updateContainer" style={{ height: "100%", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Container sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Paper sx={{ p: "35px", pt: "35px", minWidth: "420px", display: "flex", flexDirection: "column", alignItems: "center" }} elevation={2}>
          <Logo width={70} gap={13} fontSize={39} text={"right"} />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography sx={{ pt: "9px", color: "#3a1e04", fontFamily: "Open Sans", fontSize: "25px", fontWeight: 700 }}>
              Create New Password
            </Typography>
          </Box>
          {updateError === "failed" ? (
            <Box sx={{ mt: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
              <img style={{ width: "55px" }} src="../assets/incorrect.png" alt="Verification Failed" />
              <Typography sx={{ color: "#d30000", fontWeight: 500 }}>Password reset failed</Typography>
            </Box>
          ) : updateError === "success" ? (
            <Box sx={{ mt: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
              <img style={{ width: "55px" }} src="../assets/correct.png" alt="Verification Success" />
              <Typography sx={{ color: "#27d300", fontWeight: 500 }}>Password reset succeeded</Typography>
            </Box>
          ) : updateError === "pending" ? (
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "15px" }}>
              <Typography>Please wait...</Typography>
              <CircularProgress color="grey" disableShrink />
            </Box>
          ) : (
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: "100%" }}>
              <Grid container sx={{ my: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "13px" }}>
                <Grid item xs={12} sx={{ width: "100%" }}>
                  <TextField
                    required
                    fullWidth
                    className="password"
                    name="password"
                    type="password"
                    label="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                </Grid>
                <Grid item xs={12} sx={{ width: "100%" }}>
                  <TextField
                    required
                    fullWidth
                    className="checkPassword"
                    name="checkPassword"
                    type="password"
                    label="Password"
                    value={formik.values.checkPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.checkPassword && Boolean(formik.errors.checkPassword)}
                    helperText={formik.touched.checkPassword && formik.errors.checkPassword}
                  />
                </Grid>
                <HealMeButton type="submit" variant="outlined" fullWidth disabled={updateError}>
                  Confirm New Password
                </HealMeButton>
              </Grid>
            </Box>
          )}
        </Paper>
      </Container>
    </div>
  );
}
