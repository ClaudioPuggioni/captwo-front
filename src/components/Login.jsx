import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { login, reset } from "../features/authSlice";
import { Box, Button, Container, FormControlLabel, Grid, Paper, Radio, RadioGroup, Snackbar, styled, TextField, Typography } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Logo from "./Logo";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login({ isDoctor, handleIsDoctor, handleIsSignup, handleCloseError }) {
  const { loading, lgnError, resetError } = useSelector((state) => state.wall);
  const dispatch = useDispatch();
  const [forgot, setForgot] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(8, "Minimum 8 characters").max(15, "Max 15 characters").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values.userType = isDoctor ? "Doctor" : "Patient";
      console.log("Login-Submission:", values);
      dispatch(login(values));
    },
  });

  const validationSchemaForgot = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  const formikForgot = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchemaForgot,
    onSubmit: (values) => {
      values.userType = isDoctor ? "Doctor" : "Patient";
      console.log("Forgot-Submission:", values);
      dispatch(reset(values));
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

  const handleForgot = () => {
    !forgot ? setForgot(true) : setForgot(false);
  };

  useEffect(() => {
    if (resetError === "success")
      setTimeout(() => {
        setForgot(false);
      }, 3000);
  }, [resetError]);

  return (
    <div id="loginContainer" style={{ height: "100%", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Container sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Paper sx={{ p: "35px", pt: "35px", minWidth: "420px", display: "flex", flexDirection: "column", alignItems: "center" }} elevation={2}>
          <Logo width={70} gap={13} fontSize={39} text={"right"} />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography sx={{ pt: "9px", color: "#3a1e04", fontFamily: "Open Sans", fontSize: "25px", fontWeight: 700 }}>
              {!forgot ? "Login" : "Password Reset"}
            </Typography>
          </Box>
          {!forgot ? (
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: "100%" }}>
              <Grid container sx={{ my: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
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
                <Typography onClick={handleForgot} sx={{ alignSelf: "flex-end", fontSize: "13.5px", textDecoration: "underline", cursor: "pointer" }}>
                  Forgot your password?
                </Typography>
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
                <HealMeButton type="submit" variant="outlined" fullWidth disabled={loading}>
                  Log In
                </HealMeButton>
                <Grid item xs={12} sx={{ color: "#212121", fontSize: "15px", fontWeight: 500 }}>
                  New to heal.me?&nbsp;
                  <span className="fakeLink" onClick={() => handleIsSignup()}>
                    Sign up
                  </span>
                  !
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box component="form" onSubmit={formikForgot.handleSubmit} sx={{ width: "100%" }}>
              <Grid container sx={{ my: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
                <Grid item xs={12} sx={{ width: "100%" }}>
                  <TextField
                    required
                    fullWidth
                    className="email"
                    name="email"
                    type="text"
                    label="Email"
                    value={formikForgot.values.email}
                    onChange={formikForgot.handleChange}
                    error={formikForgot.touched.email && Boolean(formikForgot.errors.email)}
                    helperText={formikForgot.touched.email && formikForgot.errors.email}
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
                <HealMeButton type="submit" variant="outlined" fullWidth disabled={resetError}>
                  Send Password Reset Mail
                </HealMeButton>
                <Grid item xs={12} sx={{ color: "#212121", fontSize: "15px", fontWeight: 500 }}>
                  Remembered your password?&nbsp;
                  <span className="fakeLink" onClick={handleForgot}>
                    Log in!
                  </span>
                  !
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
        <Snackbar open={lgnError === "verify"} autoHideDuration={3000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="warning" sx={{ width: "360px", position: "absolute", bottom: "30px", left: "15px" }}>
            <div>Account is inactive.</div>
            <div>Please check your email and verify before login.</div>
          </Alert>
        </Snackbar>
        <Snackbar open={lgnError === "incorrect"} autoHideDuration={3000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error" sx={{ width: "240px", position: "absolute", bottom: "30px", left: "15px" }}>
            <div>Incorrect password.</div>
          </Alert>
        </Snackbar>
        <Snackbar open={lgnError === "account404" || resetError === "account404"} autoHideDuration={3000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error" sx={{ width: "260px", position: "absolute", bottom: "30px", left: "15px" }}>
            <div>Account does not exist.</div>
          </Alert>
        </Snackbar>
        <Snackbar open={resetError === "success"} autoHideDuration={3000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="success" sx={{ width: "360px", position: "absolute", bottom: "30px", left: "15px" }}>
            <div>Password reset link sent to email!</div>
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}
