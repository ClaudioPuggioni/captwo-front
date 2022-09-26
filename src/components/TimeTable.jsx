import { Box, Button, styled } from "@mui/material";
import React from "react";

const slots = [
  "00:00 - 00:30",
  "00:30 - 01:00",
  "01:00 - 01:30",
  "01:30 - 02:00",
  "02:00 - 02:30",
  "02:30 - 03:00",
  "03:00 - 03:30",
  "03:30 - 04:00",
  "04:00 - 04:30",
  "04:30 - 05:00",
  "05:00 - 05:30",
  "05:30 - 06:00",
  "06:00 - 06:30",
  "06:30 - 07:00",
  "07:00 - 07:30",
  "07:30 - 08:00",
];

const slots2 = [
  "08:00 - 08:30",
  "08:30 - 09:00",
  "09:00 - 09:30",
  "09:30 - 10:00",
  "10:00 - 10:30",
  "10:30 - 11:00",
  "11:00 - 11:30",
  "11:30 - 12:00",
  "12:00 - 12:30",
  "12:30 - 13:00",
  "13:00 - 13:30",
  "13:30 - 14:00",
  "14:00 - 14:30",
  "14:30 - 15:00",
  "15:00 - 15:30",
  "15:30 - 16:00",
];

const slots3 = [
  "16:00 - 16:30",
  "16:30 - 17:00",
  "17:00 - 17:30",
  "17:30 - 18:00",
  "18:00 - 18:30",
  "18:30 - 19:00",
  "19:00 - 19:30",
  "19:30 - 20:00",
  "20:00 - 20:30",
  "20:30 - 21:00",
  "21:00 - 21:30",
  "21:30 - 22:00",
  "22:00 - 22:30",
  "22:30 - 23:00",
  "23:00 - 23:30",
  "23:30 - 00:00",
];

const HealMeButtonCustom = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: "20px",
  right: "33px",
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

export default function TimeTable({
  handleOpenTimeTable,
  style,
  schedule,
  setSchedule,
  currDay,
  setCurrDay,
  userType = "Patient",
  handleSelect = null,
}) {
  const handleClick = (e) => {
    if (userType === "Patient") {
      const copySchedule = JSON.parse(JSON.stringify(schedule));
      copySchedule[currDay][e.target.innerText]
        ? delete copySchedule[currDay][e.target.innerText]
        : (copySchedule[currDay][e.target.innerText] = true);
      setSchedule(copySchedule);
    } else if (userType === "Doctor") {
      handleSelect([e.target.innerText, e.target.style.backgroundColor === "rgb(67, 106, 184)"]);
    }
  };

  return (
    <Box sx={{ ...style, height: "auto", width: userType === "Patient" ? 830 : 790, position: "relative", paddingBottom: "80px" }}>
      {userType === "Patient" ? (
        <Box>
          <h2 id="modal-title">Set your schedule (UTC/GMT).</h2>
          <p id="modal-description" style={{ marginBottom: "10px", marginLeft: "17px", marginTop: "4px" }}>
            Tell us when you're available to see patients, so they can register for live consultations.
          </p>
          <HealMeButtonCustom onClick={handleOpenTimeTable}>Return</HealMeButtonCustom>
        </Box>
      ) : null}
      <Box sx={{ display: "flex", width: "100%" }}>
        {Object.keys(schedule).map((ele) => (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", width: "100%" }}>
            <button
              className="unselectable"
              onClick={(e) => setCurrDay(ele)}
              style={{
                textTransform: "capitalize",
                border: "2px solid #b25c93",
                borderBottom: currDay === ele ? "none" : "2px solid #b25c93",
                padding: "3px 11px",
                borderTopLeftRadius: "3px",
                borderTopRightRadius: "3px",
                height: "30px",
                backgroundColor: currDay === ele ? "#41adeb" : "#7c568e",
                fontWeight: currDay === ele ? 500 : 300,
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              {ele}
            </button>
          </div>
        ))}
      </Box>
      <Box sx={{ display: "flex", height: "350px", width: "100%" }}>
        {Object.keys(schedule).map((ele) => (
          <div
            style={{
              position: "relative",
              top: "0px",
              display: currDay === ele ? "flex" : "none",
              border: "2px solid #b25c93",
              borderTop: "none",
              borderBottomLeftRadius: "3px",
              borderBottomRightRadius: "3px",
              height: "400px",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "9px",
                width: "265px",
                backgroundColor: "#b9b9d2",
                padding: "10px",
                paddingTop: "15px",
                paddingBottom: "15px",
              }}
            >
              <div style={{ width: "100%", textAlign: "center" }}>Night (00:00 - 08:00)</div>
              {slots.map((ele) => (
                <button
                  className="unselectable"
                  onClick={handleClick}
                  style={{
                    backgroundColor:
                      schedule[currDay][ele] && typeof schedule[currDay][ele] === "boolean"
                        ? "#6dce6d"
                        : typeof schedule[currDay][ele] === "string"
                        ? "#436ab8"
                        : "#f4d5da",
                    padding: "7px 15px",
                    border: "1px solid grey",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  {ele}
                </button>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "9px",
                width: "265px",
                backgroundColor: "#eeeeac",
                padding: "10px",
                paddingTop: "15px",
                paddingBottom: "15px",
              }}
            >
              <div style={{ width: "100%", textAlign: "center" }}>Day (08:00 - 16:00)</div>
              {slots2.map((ele) => (
                <button
                  className="unselectable"
                  onClick={handleClick}
                  style={{
                    backgroundColor:
                      schedule[currDay][ele] && typeof schedule[currDay][ele] === "boolean"
                        ? "#6dce6d"
                        : typeof schedule[currDay][ele] === "string"
                        ? "#436ab8"
                        : "#f4d5da",
                    padding: "7px 15px",
                    border: "1px solid grey",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  {ele}
                </button>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "9px",
                width: "265px",
                backgroundColor: "#c3eae8",
                padding: "10px",
                paddingTop: "15px",
                paddingBottom: "15px",
              }}
            >
              <div style={{ width: "100%", textAlign: "center" }}>Evening (16:00 - 00:00)</div>
              {slots3.map((ele) => (
                <button
                  className="unselectable"
                  onClick={handleClick}
                  style={{
                    backgroundColor:
                      schedule[currDay][ele] && typeof schedule[currDay][ele] === "boolean"
                        ? "#6dce6d"
                        : typeof schedule[currDay][ele] === "string"
                        ? "#436ab8"
                        : "#f4d5da",
                    padding: "7px 15px",
                    border: "1px solid grey",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  {ele}
                </button>
              ))}
            </div>
          </div>
        ))}
      </Box>
    </Box>
  );
}
