import React, { forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { resetErrors, signup } from "../features/authSlice";
import { Box, Button, Container, FormControlLabel, Grid, Paper, Radio, RadioGroup, Snackbar, styled, TextField, Typography } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Logo from "./Logo";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
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

export default function Login({ isDoctor, handleIsDoctor, handleIsSignup, handleCloseError }) {
  const { loading, signupError } = useSelector((state) => state.wall);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (signupError === "success") {
        // dispatch(resetErrors());
        handleIsSignup();
      }
    }, 3000);
    // eslint-disable-next-line
  }, [signupError]);

  const validationSchema = Yup.object({
    name: Yup.string().min(5, "Minimum 5 characters").max(25, "Max 25 characters").required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(8, "Minimum 8 characters").max(15, "Max 15 characters").required("Required"),
    checkPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      checkPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values.userType = isDoctor ? "Doctor" : "Patient";
      console.log("Signup-Submission:", values);
      dispatch(signup(values));
    },
  });

  return (
    <div id="signupContainer" style={{ height: "100%", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Container sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Paper sx={{ p: "35px", pt: "35px", minWidth: "420px", display: "flex", flexDirection: "column", alignItems: "center" }} elevation={2}>
          <Logo width={70} gap={13} fontSize={39} text={"right"} />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography sx={{ color: "#3a1e04", fontFamily: "Open Sans", fontSize: "25px", fontWeight: 700 }}>Signup</Typography>
          </Box>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: "100%" }}>
            <Grid container sx={{ my: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "13px" }}>
              <Grid item xs={12} sx={{ width: "100%" }}>
                <TextField
                  required
                  fullWidth
                  className="name"
                  name="name"
                  type="text"
                  label="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} sx={{ width: "100%" }}>
                <TextField
                  required
                  fullWidth
                  className="email"
                  name="email"
                  type="text"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
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
              <Grid item xs={12} sx={{ width: "100%" }}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  sx={{ width: "100%", display: "flex", justifyContent: "space-around" }}
                >
                  <FormControlLabel control={<Radio checked={!isDoctor} onChange={handleIsDoctor} />} label="Patient" />
                  <FormControlLabel control={<Radio checked={isDoctor} onChange={handleIsDoctor} />} label="Doctor" />
                </RadioGroup>
              </Grid>
              <HealMeButton type="submit" variant="outlined" fullWidth disabled={loading || signupError === "success"}>
                Sign Up
              </HealMeButton>
              <Grid item xs={12} sx={{ color: "#361e02", fontSize: "15px", fontWeight: 500 }}>
                Already a member?&nbsp;
                <span className="fakeLink" onClick={() => handleIsSignup()}>
                  Log in
                </span>
                !
              </Grid>
            </Grid>
          </Box>
        </Paper>
        <Snackbar open={signupError === "success"} autoHideDuration={3000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="success" sx={{ width: "390px", position: "absolute", bottom: "30px", left: "15px" }}>
            <div>Verification email sent!</div>
            <div>Please verify email before login.</div>
          </Alert>
        </Snackbar>
        <Snackbar open={signupError === "failed"} autoHideDuration={3000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error" sx={{ width: "360px", position: "absolute", bottom: "30px", left: "15px" }}>
            <div>Something went wrong with the sign up.</div>
            <div>Please try again.</div>
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}
