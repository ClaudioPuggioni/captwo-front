import { Box, FormControl, InputAdornment, MenuItem, OutlinedInput, Rating, Select, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors, selectToBookDoctor } from "../features/dataSlice";
import { useNavigate } from "react-router-dom";

function HexMaker() {
  let inputs = "ABCDEF0123456789";
  let color = "#";
  for (let index = 0; index < 6; index++) {
    color += inputs[Math.floor(Math.random() * inputs.length)];
  }
  return color;
}

const labels = {
  0: "Unrated",
  0.5: "Useless",
  1: "Almost Useless",
  1.5: "Very Poor",
  2: "Poor",
  2.5: "Ok",
  3: "Acceptable",
  3.5: "Good",
  4: "Great",
  4.5: "Excellent",
  5: "Outstanding",
};

export default function SearchDoctors() {
  const { userType } = useSelector((state) => state.wall);
  const { doctors, filters } = useSelector((state) => state.cabinet);
  const dispatch = useDispatch();
  const goTo = useNavigate();

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [hospital_clinic, setHospital_clinic] = useState("");
  const [list, setList] = useState(null);
  const [search, setSearch] = useState("");
  const [openIdx, setOpenIdx] = useState(0);
  const [fromRate, setFromRate] = useState("");
  const [toRate, setToRate] = useState("");

  useEffect(() => {
    dispatch(getAllDoctors());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setList(doctors);
    // eslint-disable-next-line
  }, [doctors]);

  const handleCountry = (e) => {
    setCountry(e.target.value);
    const copyList = [...doctors];
    let filtered = e.target.value !== "" ? copyList.filter((ele) => ele.location[0] === e.target.value) : doctors;
    if (search.length > 0) filtered = filtered.filter((ele) => ele.name.includes(search));
    if (city.length > 0) filtered = filtered.filter((ele) => ele.location[1] === city);
    if (specialty.length > 0) filtered = filtered.filter((ele) => ele.specialty === specialty);
    if (hospital_clinic.length > 0) filtered = filtered.filter((ele) => ele.hospital_clinic === hospital_clinic);
    if (fromRate.length > 0) filtered = filtered.filter((ele) => ele.consult_rate / 2 >= fromRate);
    if (toRate.length > 0) filtered = filtered.filter((ele) => ele.consult_rate / 2 <= toRate);
    setList(filtered);
  };
  const handleCity = (e) => {
    setCity(e.target.value);
    const copyList = [...doctors];
    let filtered = e.target.value !== "" ? copyList.filter((ele) => ele.location[1] === e.target.value) : doctors;
    if (search.length > 0) filtered = filtered.filter((ele) => ele.name.includes(search));
    if (country.length > 0) filtered = filtered.filter((ele) => ele.location[0] === country);
    if (specialty.length > 0) filtered = filtered.filter((ele) => ele.specialty === specialty);
    if (hospital_clinic.length > 0) filtered = filtered.filter((ele) => ele.hospital_clinic === hospital_clinic);
    if (fromRate.length > 0) filtered = filtered.filter((ele) => ele.consult_rate / 2 >= fromRate);
    if (toRate.length > 0) filtered = filtered.filter((ele) => ele.consult_rate / 2 <= toRate);
    setList(filtered);
  };
  const handleSpecialty = (e) => {
    setSpecialty(e.target.value);
    const copyList = [...doctors];
    let filtered = e.target.value !== "" ? copyList.filter((ele) => ele.specialty === e.target.value) : doctors;
    if (search.length > 0) filtered = filtered.filter((ele) => ele.name.includes(search));
    if (country.length > 0) filtered = filtered.filter((ele) => ele.location[0] === country);
    if (city.length > 0) filtered = filtered.filter((ele) => ele.location[1] === city);
    if (hospital_clinic.length > 0) filtered = filtered.filter((ele) => ele.hospital_clinic === hospital_clinic);
    if (fromRate.length > 0) filtered = filtered.filter((ele) => ele.consult_rate / 2 >= fromRate);
    if (toRate.length > 0) filtered = filtered.filter((ele) => ele.consult_rate / 2 <= toRate);
    setList(filtered);
  };
  const handleHospital_clinic = (e) => {
    setHospital_clinic(e.target.value);
    const copyList = [...doctors];
    let filtered = e.target.value !== "" ? copyList.filter((ele) => ele.hospital_clinic === e.target.value) : doctors;
    if (search.length > 0) filtered = filtered.filter((ele) => ele.name.includes(search));
    if (country.length > 0) filtered = filtered.filter((ele) => ele.location[0] === country);
    if (city.length > 0) filtered = filtered.filter((ele) => ele.location[1] === city);
    if (specialty.length > 0) filtered = filtered.filter((ele) => ele.specialty === specialty);
    if (fromRate.length > 0) filtered = filtered.filter((ele) => ele.consult_rate / 2 >= fromRate);
    if (toRate.length > 0) filtered = filtered.filter((ele) => ele.consult_rate / 2 <= toRate);
    setList(filtered);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    const copyList = [...doctors];
    let filtered = e.target.value !== "" ? copyList.filter((ele) => ele.name.includes(e.target.value)) : doctors;
    if (country.length > 0) filtered = filtered.filter((ele) => ele.location[0] === country);
    if (city.length > 0) filtered = filtered.filter((ele) => ele.location[1] === city);
    if (specialty.length > 0) filtered = filtered.filter((ele) => ele.specialty === specialty);
    if (hospital_clinic.length > 0) filtered = filtered.filter((ele) => ele.hospital_clinic === hospital_clinic);
    if (fromRate.length > 0) filtered = filtered.filter((ele) => ele.consult_rate / 2 >= fromRate);
    if (toRate.length > 0) filtered = filtered.filter((ele) => ele.consult_rate / 2 <= toRate);
    setList(filtered);
  };

  const handleRateFrom = (e) => {
    setFromRate(e.target.value);
    const copyList = [...doctors];
    let filtered = e.target.value !== "" ? copyList.filter((ele) => ele.consult_rate / 2 >= e.target.value) : doctors;
    if (search.length > 0) filtered = filtered.filter((ele) => ele.name.includes(search));
    if (country.length > 0) filtered = filtered.filter((ele) => ele.location[0] === country);
    if (city.length > 0) filtered = filtered.filter((ele) => ele.location[1] === city);
    if (specialty.length > 0) filtered = filtered.filter((ele) => ele.specialty === specialty);
    if (hospital_clinic.length > 0) filtered = filtered.filter((ele) => ele.hospital_clinic === hospital_clinic);
    if (toRate.length > 0) filtered = filtered.filter((ele) => ele.consult_rate / 2 <= toRate);
    setList(filtered);
  };
  const handleRateTo = (e) => {
    setToRate(e.target.value);
    const copyList = [...doctors];
    let filtered = e.target.value !== "" ? copyList.filter((ele) => ele.consult_rate / 2 <= e.target.value) : doctors;
    if (search.length > 0) filtered = filtered.filter((ele) => ele.name.includes(search));
    if (country.length > 0) filtered = filtered.filter((ele) => ele.location[0] === country);
    if (city.length > 0) filtered = filtered.filter((ele) => ele.location[1] === city);
    if (specialty.length > 0) filtered = filtered.filter((ele) => ele.specialty === specialty);
    if (hospital_clinic.length > 0) filtered = filtered.filter((ele) => ele.hospital_clinic === hospital_clinic);
    if (fromRate.length > 0) filtered = filtered.filter((ele) => ele.consult_rate / 2 >= fromRate);
    setList(filtered);
  };

  const handleSelect = (idx) => (openIdx === idx ? setOpenIdx(null) : setOpenIdx(idx));

  const handleDoctorDetails = (e) => {
    e.stopPropagation();
  };
  const handleBookAppointment = ({ e, id }) => {
    e.stopPropagation();
    dispatch(selectToBookDoctor(id));
    goTo(`/${userType.toLowerCase()}/bookings`);
  };

  return (
    <div id="searchDoctorsContainer" style={{ position: "relative" }}>
      <div
        id="searchDoctorsFilters"
        style={{ position: "absolute", top: 0, bottom: 0, minHeight: "100%", width: "300px", borderRight: "1px solid grey" }}
      >
        <Box sx={{ mt: "20px" }}>
          <Typography sx={{ ml: 2, fontSize: "14px", fontWeight: 500 }}>Search</Typography>
          <FormControl sx={{ m: 2, mt: 0.5, minWidth: 270 }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              onChange={handleSearchChange}
              value={search}
              endAdornment={
                <InputAdornment position="end">
                  <img style={{ width: "25px" }} src="../assets/search-2.svg" alt="search" />
                </InputAdornment>
              }
              placeholder={"Search Doctor by Name"}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
            />
          </FormControl>
          <Typography sx={{ ml: 2, fontSize: "14px", fontWeight: 500 }}>Country</Typography>
          <FormControl sx={{ m: 2, mt: 0.5, minWidth: 270 }}>
            <Select value={country} onChange={handleCountry} displayEmpty inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value="">
                <em>Select a Country</em>
              </MenuItem>
              {filters
                ? filters.locations.countries.map((ele) => (
                    <MenuItem key={ele} value={ele}>
                      {ele}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
          <Typography sx={{ ml: 2, fontSize: "14px", fontWeight: 500 }}>City</Typography>
          <FormControl sx={{ m: 2, mt: 0.5, minWidth: 270 }}>
            <Select value={city} onChange={handleCity} displayEmpty inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value="">
                <em>Select a City</em>
              </MenuItem>
              {filters
                ? filters.locations.cities.map((ele) => (
                    <MenuItem key={ele} value={ele}>
                      {ele}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
          <Typography sx={{ ml: 2, fontSize: "14px", fontWeight: 500 }}>Specialty</Typography>
          <FormControl sx={{ m: 2, mt: 0.5, minWidth: 270 }}>
            <Select value={specialty} onChange={handleSpecialty} displayEmpty inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value="">
                <em>Select a Specialty</em>
              </MenuItem>
              {filters
                ? filters.specialties.map((ele) => (
                    <MenuItem key={ele} value={ele}>
                      {ele}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
          <Typography sx={{ ml: 2, fontSize: "14px", fontWeight: 500 }}>Hospital/Clinic</Typography>
          <FormControl sx={{ m: 2, mt: 0.5, minWidth: 270 }}>
            <Select value={hospital_clinic} onChange={handleHospital_clinic} displayEmpty inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value="">
                <em>Select a Hospital/Clinic</em>
              </MenuItem>
              {filters
                ? filters.hospitals_clinics.map((ele) => (
                    <MenuItem key={ele} value={ele}>
                      {ele}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
          <Typography sx={{ ml: 2, fontSize: "14px", fontWeight: 500 }}>Consultation Rate</Typography>
          <Box sx={{ m: 2, mt: 0.5, display: "flex", justifyContent: "space-around", alignItems: "center" }}>
            <FormControl sx={{ maxWidth: 135 }} variant="outlined">
              <OutlinedInput
                id="outlined-adornment-weight"
                value={fromRate}
                onChange={handleRateFrom}
                startAdornment={
                  <InputAdornment position="start" sx={{ position: "absolute", left: "9px" }}>
                    $
                  </InputAdornment>
                }
                placeholder={"From Rate"}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </FormControl>
            <Box sx={{ px: "11px" }}>to</Box>
            <FormControl sx={{ maxWidth: 135 }} variant="outlined">
              <OutlinedInput
                id="outlined-adornment-weight"
                value={toRate}
                onChange={handleRateTo}
                startAdornment={
                  <InputAdornment position="start" sx={{ position: "absolute", left: "9px" }}>
                    $
                  </InputAdornment>
                }
                placeholder={"Max Limit"}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </FormControl>
          </Box>
        </Box>
      </div>
      <div
        id="searchDoctorsList"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "300px",
          width: "calc(100% - 300px)",
          display: "flex",
          flexWrap: "wrap",
          alignContent: "flex-start",
          overflow: "auto",
        }}
      >
        {list
          ? list.map((ele, idx) => (
              <Box
                key={`doctorBox${idx}`}
                className="cellShadowBorder"
                onClick={() => handleSelect(idx)}
                sx={{
                  height: "235px",
                  width: openIdx !== idx ? "230px" : "460px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: openIdx !== idx ? "center" : "",
                  alignItems: "center",
                  backgroundColor: openIdx !== idx ? "whitesmoke" : "#1f8da0",
                  cursor: "pointer",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                  <img
                    style={{
                      height: "130px",
                      width: "120px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      objectPosition: "13px 15px",
                      border: `1px solid ${HexMaker()}`,
                      margin: openIdx !== idx ? "" : "0 39px",
                      backgroundColor: "white",
                    }}
                    src="../assets/doctorEdit.svg"
                    alt="doctor"
                  />
                  <Typography sx={{ fontSize: "19px" }}>{ele.name}</Typography>
                  <Typography>{ele.specialty}</Typography>
                </Box>
                {openIdx === idx ? (
                  <Box
                    sx={{
                      position: "relative",
                      height: "100%",
                      width: "100%",
                      borderLeft: "1px dotted #701b6b30",
                      backgroundColor: "#1f8da0",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      paddingLeft: "10px",
                      gap: "3px",
                    }}
                  >
                    {ele.hospital_clinic ? <Typography>Doctor at {ele.hospital_clinic}</Typography> : null}
                    <Typography sx={{ fontStyle: "italic", fontWeight: 300 }}>"{ele.self_intro}"</Typography>
                    {/* <Typography>{ele.qualifications}</Typography> */}
                    <Typography>Consultation Rate: ${ele.consult_rate / 2}</Typography>
                    <Typography>Rating:</Typography>
                    <Box
                      sx={{
                        width: 200,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Rating
                        name="text-feedback"
                        value={!ele.rating ? 0 : ele.rating}
                        readOnly
                        precision={0.5}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                      />
                      <Box sx={{ ml: 2 }}>{labels[!ele.rating ? 0 : ele.rating]}</Box>
                    </Box>
                    <button onClick={handleDoctorDetails} className="findDocBtns" style={{ top: "10px", right: "15px" }}>
                      See Details
                    </button>
                    <button
                      onClick={(e) => handleBookAppointment({ e, id: ele.id })}
                      className="findDocBtns"
                      style={{ bottom: "10px", right: "15px" }}
                    >
                      Book Appointment
                    </button>
                  </Box>
                ) : null}
              </Box>
            ))
          : null}
      </div>
    </div>
  );
}
