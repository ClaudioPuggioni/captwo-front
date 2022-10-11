import { Box, Button, Grid, Modal, styled, Typography, alpha, TextareaAutosize, InputAdornment, MenuItem, TextField } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimeTable from "./TimeTable";
import { onboarder } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const specialties = [
  {
    value: "Allergy & Immunology",
  },
  {
    value: "Anesthesiology",
  },
  {
    value: "Dermatology",
  },
  {
    value: "Diagnostic Radiology",
  },
  {
    value: "Emergency Medicine",
  },
  {
    value: "Family Medicine",
  },
  {
    value: "Internal Medicine",
  },
  {
    value: "Medical Genetics",
  },
  {
    value: "Neurology",
  },
  {
    value: "Nuclear Medicine",
  },
  {
    value: "Obstetrics & Gynecology",
  },
  {
    value: "Ophthalmology",
  },
  {
    value: "Pathology",
  },
  {
    value: "Pediatrics",
  },
  {
    value: "Physical Medicine & Rehabilitation",
  },
  {
    value: "Preventive Medicine",
  },
  {
    value: "Psychiatry",
  },
  {
    value: "Radiation Oncology",
  },
  {
    value: "Surgery",
  },
  {
    value: "Urology",
  },
];

const sysFonts = [
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  "Roboto",
  '"Helvetica Neue"',
  "Arial",
  "sans-serif",
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "whitesmoke",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const HealMeButtonCustom = styled(Button)(({ theme }) => ({
  position: "absolute",
  bottom: "33px",
  right: "50px",
  display: "flex",
  justifyContent: "center !important",
  color: "#107878",
  fontSize: "13px",
  padding: "6px 30px",
  borderRadius: "5px",
  border: "1.5px solid #107878",
  "&:hover": {
    color: theme.palette.getContrastText("#107878"),
    backgroundColor: "#199696",
    border: "1.5px solid #199696",
  },
}));

const DelButton = styled(Button)(({ theme }) => ({
  display: "flex",
  justifyContent: "center !important",
  minWidth: "20px",
  padding: "8.1px",
  borderRadius: "5px",
  border: "1.5px solid #960822",
  "&:hover": {
    backgroundColor: "#a21141",
    border: "1.5px solid #960822",
  },
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#ffffff" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    height: "22px",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [...sysFonts].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default function Dashboard() {
  const { userInfo, userType, onboard } = useSelector((state) => state.wall);
  const dispatch = useDispatch();
  const goTo = useNavigate();

  const [specialty, setSpecialty] = useState("Allergy & Immunology");
  const [gender, setGender] = useState("Female");

  const diseaseRef = useRef();
  const durationRef = useRef();
  const [diseaseHistory, setDiseaseHistory] = useState([]);

  const experienceRef = useRef();
  const experienceDurationRef = useRef();
  const [experience, setExperience] = useState([]);

  const handleSelect = (e) => setSpecialty(e.target.value);

  const handleGender = (e) => setGender(e.target.value);

  const [timeTableIsOpen, setTimeTableIsOpen] = useState(false);

  const handleOpenTimeTable = () => (timeTableIsOpen ? setTimeTableIsOpen(false) : setTimeTableIsOpen(true));
  const [schedule, setSchedule] = useState({ sunday: {}, monday: {}, tuesday: {}, wednesday: {}, thursday: {}, friday: {}, saturday: {} });
  const [currDay, setCurrDay] = useState("sunday");

  useEffect(() => {
    if (onboard) goTo(`/${userType.toLowerCase()}/home`);
  }, [onboard]);

  const preventEnterSubmit = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  // PATIENT FORMIK
  const validationSchemaPatient = Yup.object({
    contact: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    city: Yup.string(),
    height: Yup.string(),
    weight: Yup.string(),
    blood_type: Yup.string(),
    age: Yup.number().required("Required"),
    preexisting_conditions: Yup.string(),
  });

  const formikPatient = useFormik({
    initialValues: {
      contact: "",
      country: "",
      city: "",
      height: "",
      weight: "",
      blood_type: "",
      age: "",
      preexisting_conditions: "",
    },
    validationSchema: validationSchemaPatient,
    onSubmit: (values) => {
      const location = [values.country];
      if (values.city.length > 0) location.push(values.city);
      values = { ...values, location: location };
      values.gender = gender;
      values.disease_history = diseaseHistory;
      values.userType = userType;
      values.patientId = userInfo.id;
      delete values.country;
      delete values.city;
      console.log("Patient-Onboard-Submission:", values);
      dispatch(onboarder(values));
    },
  });

  // DOCTOR FORMIK
  const validationSchemaDoctor = Yup.object({
    contact: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    city: Yup.string(),
    hospital_clinic: Yup.string(),
    experience: Yup.string(),
    consult_rate: Yup.number().required("Required"),
    qualifications: Yup.string(),
    specialty: Yup.string(),
    self_intro: Yup.string(),
    available_times: Yup.array(),
  });

  const formikDoctor = useFormik({
    initialValues: {
      contact: "",
      country: "",
      city: "",
      hospital_clinic: "",
      experience: "",
      consult_rate: "",
      qualifications: "",
      specialty: "",
      self_intro: "",
      available_times: "",
    },
    validationSchema: validationSchemaDoctor,
    onSubmit: (values) => {
      const location = [values.country];
      if (values.city.length > 0) location.push(values.city);
      values = { ...values, location: location };
      values.available_times = schedule;
      values.specialty = specialty;
      values.experience = experience;
      values.userType = userType;
      values.doctorId = userInfo.id;
      delete values.country;
      delete values.city;
      console.log("Doctor-Onboard-Submission:", values);
      dispatch(onboarder(values));
    },
  });

  return (
    <div>
      <Modal open={onboard}>
        {userType === "Patient" ? (
          <Box sx={{ ...style, height: "auto", width: 800, position: "relative", paddingBottom: "80px" }}>
            <Box sx={{ position: "absolute", top: "-70px" }}>
              <h2 id="modal-title" style={{ color: "white" }}>
                Provide your information.
              </h2>
              <p id="modal-description" style={{ marginLeft: "17px", marginTop: "4px", color: "white" }}>
                We promise to serve you with integrity and confidentiality.
              </p>
            </Box>
            <Box component="form" onSubmit={formikPatient.handleSubmit} onKeyDown={preventEnterSubmit} sx={{ width: "100%" }}>
              <Grid container sx={{ my: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "13px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                  <Grid item xs={4} sx={{ width: "100%" }}>
                    <Typography sx={{ mb: 0.3 }}>Contact Number*</Typography>
                    <BootstrapInput
                      required
                      className="contact"
                      name="contact"
                      type="text"
                      placeholder="Contact Number"
                      value={formikPatient.values.contact}
                      onChange={formikPatient.handleChange}
                      // error={formikPatient.touched.contact && Boolean(formikPatient.errors.contact)}
                      // helperText={formikPatient.touched.contact && formikPatient.errors.contact}
                    />
                  </Grid>
                  <Grid item xs={4} sx={{ width: "100%" }}>
                    <Typography sx={{ mb: 0.3 }}>Country*</Typography>
                    <BootstrapInput
                      required
                      className="country"
                      name="country"
                      type="text"
                      placeholder="Country"
                      value={formikPatient.values.country}
                      onChange={formikPatient.handleChange}
                      // error={formik.touched.country && Boolean(formik.errors.country)}
                      // helperText={formik.touched.country && formik.errors.country}
                    />
                  </Grid>
                  <Grid item xs={4} sx={{ width: "100%" }}>
                    <Typography sx={{ mb: 0.3 }}>City</Typography>
                    <BootstrapInput
                      className="city"
                      name="city"
                      type="text"
                      placeholder="City"
                      value={formikPatient.values.city}
                      onChange={formikPatient.handleChange}
                      // error={formik.touched.city && Boolean(formik.errors.city)}
                      // helperText={formik.touched.city && formik.errors.city}
                    />
                  </Grid>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                  <Grid item xs={4} sx={{ width: "100%" }}>
                    <Typography sx={{ mb: 0.3 }}>Height (cm/inch)</Typography>
                    <BootstrapInput
                      className="height"
                      name="height"
                      type="text"
                      placeholder="Height"
                      value={formikPatient.values.height}
                      onChange={formikPatient.handleChange}
                      // error={formik.touched.height && Boolean(formik.errors.height)}
                      // helperText={formik.touched.height && formik.errors.height}
                    />
                  </Grid>
                  <Grid item xs={4} sx={{ width: "100%" }}>
                    <Typography sx={{ mb: 0.3 }}>Weight (kg/lb)</Typography>
                    <BootstrapInput
                      className="weight"
                      name="weight"
                      type="text"
                      placeholder="Weight"
                      value={formikPatient.values.weight}
                      onChange={formikPatient.handleChange}
                      // error={formik.touched.weight && Boolean(formik.errors.weight)}
                      // helperText={formik.touched.weight && formik.errors.weight}
                    />
                  </Grid>
                  <Grid item xs={4} sx={{ width: "100%" }}>
                    <Typography sx={{ mb: 0.3 }}>Blood Type</Typography>
                    <BootstrapInput
                      className="blood_type"
                      name="blood_type"
                      type="text"
                      placeholder="Blood Type"
                      value={formikPatient.values.blood_type}
                      onChange={formikPatient.handleChange}
                      // error={formik.touched.blood_type && Boolean(formik.errors.blood_type)}
                      // helperText={formik.touched.blood_type && formik.errors.blood_type}
                    />
                  </Grid>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }}>
                  <Grid item xs={4} sx={{ width: "100%" }}>
                    <Typography sx={{ mb: 0.3 }}>Age*</Typography>
                    <BootstrapInput
                      required
                      className="age"
                      name="age"
                      type="number"
                      placeholder="Age"
                      value={formikPatient.values.age}
                      onChange={formikPatient.handleChange}

                      //   error={formik.touched.age && Boolean(formik.errors.age)}
                      //   helperText={formik.touched.age && formik.errors.age}
                    />
                  </Grid>
                  <Grid item xs={4} sx={{ width: "100%" }}>
                    <Typography sx={{ mb: 0.3 }}>Gender*</Typography>
                    <TextField
                      id="filled-select-currency"
                      select
                      value={gender}
                      onChange={handleGender}
                      variant="outlined"
                      sx={{ backgroundColor: "white" }}
                    >
                      {[{ value: "Female" }, { value: "Male" }].map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Box>
                <Grid item xs={12} sx={{ width: "100%" }}>
                  <Typography sx={{ mb: 0.3 }}>Preexisting Conditions (allergies, diabetes, etc.)</Typography>
                  <TextareaAutosize
                    className="txtAreaCustom preexisting_conditions"
                    name="preexisting_conditions"
                    minRows={1}
                    maxRows={2}
                    placeholder="Enter Preexisting Conditions here..."
                    value={formikPatient.values.preexisting_conditions}
                    onChange={formikPatient.handleChange}
                    //   error={formik.touched.preexisting_conditions && Boolean(formik.errors.preexisting_conditions)}
                    //   helperText={formik.touched.preexisting_conditions && formik.errors.preexisting_conditions}
                  />
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                  <Typography sx={{ mb: 0.3 }}>Disease History</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: "15px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                        maxHeight: "100px",
                        overflow: "auto !important",
                      }}
                    >
                      {diseaseHistory.map((ele, idx) => (
                        <Box key={`diseaseHistory${idx}`} sx={{ display: "flex", alignItems: "center", width: "100%", gap: "15px" }}>
                          <BootstrapInput
                            className="disease_history"
                            type="text"
                            placeholder="Disease History"
                            sx={{ width: "100%" }}
                            value={ele[0]}
                            onChange={(e) => {
                              const diseaseHistoryCopy = [...diseaseHistory];
                              diseaseHistoryCopy[idx][0] = e.target.value;
                              setDiseaseHistory(diseaseHistoryCopy);
                            }}
                          />
                          <BootstrapInput
                            className="duration"
                            type="text"
                            placeholder="Disease Duration"
                            sx={{ width: "26%" }}
                            value={ele[1]}
                            onChange={(e) => {
                              const diseaseHistoryCopy = [...diseaseHistory];
                              diseaseHistoryCopy[idx][1] = e.target.value;
                              setDiseaseHistory(diseaseHistoryCopy);
                            }}
                          />
                          <DelButton
                            className="delBtn"
                            onClick={() => {
                              const diseaseHistoryCopy = [...diseaseHistory];
                              diseaseHistoryCopy.splice(idx, 1);
                              setDiseaseHistory(diseaseHistoryCopy);
                            }}
                          >
                            <img style={{ width: "20px" }} src="../assets/trash.svg" alt="del disease" />
                          </DelButton>
                        </Box>
                      ))}
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%", gap: "15px" }}>
                      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: "2px" }}>
                        <Typography>Disease</Typography>
                        <BootstrapInput
                          ref={diseaseRef}
                          className="disease_history"
                          name="disease_history"
                          type="text"
                          placeholder="Disease History (PRESS ENTER TO ADD)"
                          sx={{ width: "100%" }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && diseaseRef.current.children[0].value && durationRef.current.children[0].value) {
                              setDiseaseHistory((diseaseHistory) => [
                                ...diseaseHistory,
                                [diseaseRef.current.children[0].value, durationRef.current.children[0].value],
                              ]);
                              diseaseRef.current.children[0].value = "";
                              durationRef.current.children[0].value = "";
                            }
                          }}
                        />
                      </Box>
                      <Box sx={{ display: "flex", flexDirection: "column", width: "26%", gap: "2px" }}>
                        <Typography>Start Year to Year</Typography>
                        <BootstrapInput
                          ref={durationRef}
                          className="duration"
                          name="duration"
                          type="text"
                          placeholder="Disease Duration"
                          sx={{ width: "100%" }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && diseaseRef.current.children[0].value && durationRef.current.children[0].value) {
                              setDiseaseHistory((diseaseHistory) => [
                                ...diseaseHistory,
                                [diseaseRef.current.children[0].value, durationRef.current.children[0].value],
                              ]);
                              diseaseRef.current.children[0].value = "";
                              durationRef.current.children[0].value = "";
                            }
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <HealMeButtonCustom type="submit">Save</HealMeButtonCustom>
            </Box>
            <Typography sx={{ position: "absolute", bottom: "13px", fontSize: "12px", color: "#ce0000" }}>
              Asterisk * denotes required fields
            </Typography>
          </Box>
        ) : (
          <Box sx={{ ...style, height: "auto", width: 865, position: "relative", paddingBottom: "80px" }}>
            <Box sx={{ position: "absolute", top: "-70px" }}>
              <h2 id="modal-title" style={{ color: "white" }}>
                Provide your information.
              </h2>
              <p id="modal-description" style={{ marginLeft: "17px", marginTop: "4px", color: "white" }}>
                We promise to serve you with integrity and confidentiality.
              </p>
            </Box>
            <Box component="form" onSubmit={formikDoctor.handleSubmit} onKeyDown={preventEnterSubmit} sx={{ width: "100%" }}>
              <Grid container sx={{ my: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "13px" }}>
                <Box sx={{ display: "flex", alignSelf: "flex-start", gap: "37px" }}>
                  <Grid item xs={4} sx={{ width: "100%" }}>
                    <Typography sx={{ mb: 0.3 }}>Contact Number*</Typography>
                    <BootstrapInput
                      required
                      className="contact"
                      name="contact"
                      type="text"
                      placeholder="Contact Number"
                      value={formikDoctor.values.contact}
                      onChange={formikDoctor.handleChange}
                      // error={formik.touched.contact && Boolean(formik.errors.contact)}
                      // helperText={formik.touched.contact && formik.errors.contact}
                    />
                  </Grid>
                  <Grid item xs={4} sx={{ width: "100%" }}>
                    <Typography sx={{ mb: 0.3 }}>Country*</Typography>
                    <BootstrapInput
                      required
                      className="country"
                      name="country"
                      type="text"
                      placeholder="Country"
                      value={formikDoctor.values.country}
                      onChange={formikDoctor.handleChange}
                      // error={formik.touched.country && Boolean(formik.errors.country)}
                      // helperText={formik.touched.country && formik.errors.country}
                    />
                  </Grid>
                  <Grid item xs={4} sx={{ width: "100%" }}>
                    <Typography sx={{ mb: 0.3 }}>City</Typography>
                    <BootstrapInput
                      className="city"
                      name="city"
                      type="text"
                      placeholder="City"
                      value={formikDoctor.values.city}
                      onChange={formikDoctor.handleChange}
                      // error={formik.touched.city && Boolean(formik.errors.city)}
                      // helperText={formik.touched.city && formik.errors.city}
                    />
                  </Grid>
                </Box>

                <Box sx={{ display: "flex", alignSelf: "flex-start", gap: "30px" }}>
                  <Grid item xs={5.5} sx={{ width: "100%" }}>
                    <Typography sx={{ mb: 0.3 }}>Hospital/Clinic*</Typography>
                    <BootstrapInput
                      required
                      className="hospital_clinic"
                      name="hospital_clinic"
                      type="text"
                      placeholder="Hospital/Clinic"
                      value={formikDoctor.values.hospital_clinic}
                      onChange={formikDoctor.handleChange}
                      //   error={formik.touched.age && Boolean(formik.errors.age)}
                      //   helperText={formik.touched.age && formik.errors.age}
                    />
                  </Grid>

                  <Grid item xs={4} sx={{ width: "100%" }}>
                    <Typography sx={{ mb: 0.3, overflow: "visible" }} noWrap>
                      Consultation Rate* (per 30 mins)
                    </Typography>
                    <BootstrapInput
                      required
                      className="consult_rate"
                      name="consult_rate"
                      type="number"
                      placeholder="Consultation Rate"
                      value={formikDoctor.values.consult_rate}
                      onChange={formikDoctor.handleChange}
                      startAdornment={
                        <InputAdornment disablePointerEvents position="end" sx={{ position: "relative", right: "-17px", top: "1px", zIndex: 1 }}>
                          $
                        </InputAdornment>
                      }
                      //   error={formik.touched.age && Boolean(formik.errors.age)}
                      //   helperText={formik.touched.age && formik.errors.age}
                    />
                  </Grid>
                  <Grid item xs={4} sx={{ width: "100%", position: "absolute", right: "41px" }}>
                    <Typography sx={{ mb: 0.3 }}>Specialty*</Typography>
                    <TextField select value={specialty} onChange={handleSelect} variant="outlined" sx={{ backgroundColor: "white" }}>
                      {specialties.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Box>

                <Grid item xs={12} sx={{ width: "100%" }}>
                  <Typography sx={{ mb: 0.3 }}>Qualifications*</Typography>
                  <TextareaAutosize
                    required
                    className="txtAreaCustom qualifications"
                    name="qualifications"
                    minRows={1}
                    maxRows={2}
                    placeholder="Enter Qualifications here..."
                    value={formikDoctor.values.qualifications}
                    onChange={formikDoctor.handleChange}
                    //   error={formik.touched.preexisting_conditions && Boolean(formik.errors.preexisting_conditions)}
                    //   helperText={formik.touched.preexisting_conditions && formik.errors.preexisting_conditions}
                  />
                </Grid>

                <Grid item xs={12} sx={{ width: "100%" }}>
                  <Typography sx={{ mb: 0.3 }}>Self Intro*</Typography>
                  <TextareaAutosize
                    required
                    className="txtAreaCustom self_intro"
                    name="self_intro"
                    minRows={1}
                    maxRows={2}
                    placeholder="Enter Self Intro here..."
                    value={formikDoctor.values.self_intro}
                    onChange={formikDoctor.handleChange}
                    //   error={formik.touched.preexisting_conditions && Boolean(formik.errors.preexisting_conditions)}
                    //   helperText={formik.touched.preexisting_conditions && formik.errors.preexisting_conditions}
                  />
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                  <Typography sx={{ mb: 0.3 }}>Experience*</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: "15px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                        maxHeight: "100px",
                        overflow: "auto !important",
                      }}
                    >
                      {experience.map((ele, idx) => (
                        <Box key={`experience${idx}`} sx={{ display: "flex", alignItems: "center", width: "100%", gap: "15px" }}>
                          <BootstrapInput
                            className="experience"
                            type="text"
                            placeholder="Experience"
                            sx={{ width: "100%" }}
                            value={ele[0]}
                            onChange={(e) => {
                              const experienceCopy = [...experience];
                              experienceCopy[idx][0] = e.target.value;
                              setExperience(experienceCopy);
                            }}
                          />
                          <BootstrapInput
                            className="duration"
                            type="text"
                            placeholder="Disease Duration"
                            sx={{ width: "26%" }}
                            value={ele[1]}
                            onChange={(e) => {
                              const experienceCopy = [...experience];
                              experienceCopy[idx][1] = e.target.value;
                              setExperience(experienceCopy);
                            }}
                          />
                          <DelButton
                            className="delBtn"
                            onClick={() => {
                              const experienceCopy = [...experience];
                              experienceCopy.splice(idx, 1);
                              setExperience(experienceCopy);
                            }}
                          >
                            <img style={{ width: "20px" }} src="../assets/trash.svg" alt="del disease" />
                          </DelButton>
                        </Box>
                      ))}
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%", gap: "15px" }}>
                      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: "2px" }}>
                        <Typography>Place of Employment</Typography>
                        <BootstrapInput
                          ref={experienceRef}
                          className="experience"
                          name="experience"
                          type="text"
                          placeholder="Place of Employment (PRESS ENTER TO ADD)"
                          sx={{ width: "100%" }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && experienceRef.current.children[0].value && experienceDurationRef.current.children[0].value) {
                              setExperience((experience) => [
                                ...experience,
                                [experienceRef.current.children[0].value, experienceDurationRef.current.children[0].value],
                              ]);
                              experienceRef.current.children[0].value = "";
                              experienceDurationRef.current.children[0].value = "";
                            }
                          }}
                        />
                      </Box>
                      <Box sx={{ display: "flex", flexDirection: "column", width: "26%", gap: "2px" }}>
                        <Typography>Duration</Typography>
                        <BootstrapInput
                          ref={experienceDurationRef}
                          className="experienceDuration"
                          name="experienceDuration"
                          type="text"
                          placeholder='(E.g.: "2 years")'
                          sx={{ width: "100%" }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && experienceRef.current.children[0].value && experienceDurationRef.current.children[0].value) {
                              setExperience((experience) => [
                                ...experience,
                                [experienceRef.current.children[0].value, experienceDurationRef.current.children[0].value],
                              ]);
                              experienceRef.current.children[0].value = "";
                              experienceDurationRef.current.children[0].value = "";
                            }
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sx={{ width: "100%" }}>
                  <Typography sx={{ mb: 0.3 }}>Available Times*</Typography>
                </Grid>
              </Grid>
              <HealMeButtonCustom onClick={handleOpenTimeTable} sx={{ left: "33px", bottom: "50px", width: "200px" }}>
                Open Timetable*
              </HealMeButtonCustom>
              <HealMeButtonCustom type="submit" disabled={experience.length === 0}>
                Save
              </HealMeButtonCustom>
            </Box>
            <Typography sx={{ position: "absolute", bottom: "13px", fontSize: "12px", color: "#ce0000" }}>
              Asterisk * denotes required fields
            </Typography>
          </Box>
        )}
      </Modal>
      <Modal open={timeTableIsOpen}>
        <TimeTable
          handleOpenTimeTable={handleOpenTimeTable}
          style={style}
          schedule={schedule}
          setSchedule={setSchedule}
          currDay={currDay}
          setCurrDay={setCurrDay}
        />
      </Modal>
    </div>
  );
}
