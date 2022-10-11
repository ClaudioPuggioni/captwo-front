import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { Box, Button, Container, styled, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getOneDoctor, registerConsultation } from "../../features/dataSlice";

const weekdayOrder = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const HealMeButtonCustom = styled(Button)(({ theme }) => ({
  marginTop: "15px",
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

export default function BookingsDoctor() {
  const { userType, userInfo } = useSelector((state) => state.wall);
  const { toBookDoctor, chosenDoctor, loading } = useSelector((state) => state.cabinet);
  const dispatch = useDispatch();
  const [value, setValue] = useState(dayjs.extend(utc).utc());
  const [timetable, setTimetable] = useState(null);
  const [timeNow, setTimeNow] = useState(new Date().toUTCString());
  const [bookedSlot, setBookedSlot] = useState([null, null]);
  const [consultReason, setConsultReason] = useState("");

  // const available_times_Parser = function (inputObj) {
  //   const thisWeek = {};
  //   const nextWeek = {};
  //   const currentDay = new Date().toUTCString();
  //   const currWeekdaySLUG3 = currentDay.slice(0, 3).toLowerCase();
  //   let currDayIdx = weekdayOrder.findIndex((ele) => ele.slice(0, 3) === currWeekdaySLUG3);
  //   let isNextDay = true;

  //   const orderedWeek = [];

  //   for (const weekdayIdx in weekdayOrder) {
  //     orderedWeek[weekdayIdx] = { [weekdayOrder[weekdayIdx]]: inputObj[weekdayOrder[weekdayIdx]] };
  //   }

  //   // console.log(orderedWeek);

  //   for (const weekdayObj of orderedWeek) {
  //     // console.log(weekdayObj, currDayIdx);
  //     const weekday = Object.keys(weekdayObj)[0];
  //     const daySlots = Object.values(weekdayObj)[0];
  //     // console.log("WEEKDAY:", weekday);
  //     // console.log("DAYSLOTS:", daySlots);
  //     if (Object.values(daySlots).length !== 0) {
  //       const weekIdx = weekdayOrder.findIndex((ele) => ele === weekday);
  //       if (weekIdx < currDayIdx) {
  //         // console.log([weekIdx, currDayIdx]);
  //         // nextWeek.push(weekdayObj);
  //         nextWeek[weekday] = daySlots;
  //       } else {
  //         // split day into two if timeslot is past current time
  //         if (isNextDay) {
  //           isNextDay = false;

  //           const thisWeekToday = {};
  //           const nextWeekToday = {};

  //           let regex = /\d\d:\d\d/;
  //           const currTimeArr = currentDay.match(regex)[0].split(":");
  //           const currTime = new Date();

  //           const timeslots = Object.entries(daySlots);
  //           for (let index = 0; index < timeslots.length; index++) {
  //             // console.log("timeslots[index]:", timeslots[index]);

  //             const timeSlotArr = timeslots[index][0].slice(0, 5).split(":");
  //             const slotTime = new Date();

  //             currTime.setHours(Number(currTimeArr[0]), Number(currTimeArr[1]), 0);
  //             slotTime.setHours(Number(timeSlotArr[0]), Number(timeSlotArr[1]), 0);

  //             if (currTime < slotTime) {
  //               thisWeekToday[timeslots[index][0]] = timeslots[index][1];
  //             } else {
  //               nextWeekToday[timeslots[index][0]] = timeslots[index][1];
  //             }
  //           }

  //           if (Object.keys(thisWeekToday).length > 0) thisWeek[weekday] = thisWeekToday;
  //           if (Object.keys(nextWeekToday).length > 0) nextWeek[weekday] = nextWeekToday;
  //         } else {
  //           thisWeek[weekday] = daySlots;
  //         }
  //       }
  //     }
  //   }
  //   setTimetable([thisWeek, nextWeek]);
  // };

  useEffect(() => {
    let timeTicker = setInterval(() => {
      setTimeNow(new Date().toUTCString());
    }, 1000);

    if (toBookDoctor) {
      dispatch(getOneDoctor(toBookDoctor));
    }
    return () => {
      clearInterval(timeTicker);
    };
  }, []);

  useEffect(() => {
    // if (chosenDoctor && chosenDoctor.available_times) available_times_Parser(chosenDoctor.available_times);
  }, [chosenDoctor]);

  useEffect(() => {
    console.log("TIMETABLE-USEEFFECT", timetable);
    // console.log("today:", [weekdayOrder.find((ele) => ele.slice(0, 3) === value["$d"].toString().slice(0, 3).toLowerCase())]);
    console.log("today:", value["$d"]);
  }, [timetable]);

  const handleSubmit = () => {
    dispatch(registerConsultation({ doctorId: chosenDoctor.id, patientId: userInfo.id, consult_reason: "Not implemented yet", date: bookedSlot }));
  };

  return (
    <div id="bookingsContainer" style={{ position: "relative" }}>
      <div style={{ position: "absolute", top: 0, bottom: 0, minHeight: "100%", width: "100%" }}>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", p: "20px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              orientation="landscape"
              openTo="day"
              value={value}
              // shouldDisableDate={isWeekend}
              minDate={Date.now()}
              maxDate={Date.now() + 86400000 * 7}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              sx={{
                "& .MuiButtonBase-root": { display: "none" },
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Typography>Current Time:</Typography>
            <Typography>{timeNow}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "900px", display: "flex", flexWrap: "wrap", alignItems: "center" }}>
            {/* <Typography>{ele[0]}</Typography> */}
            {/* {timetable
              ? Object.entries(timetable[0][weekdayOrder.find((ele) => ele.slice(0, 3) === value["$d"].toString().slice(0, 3).toLowerCase())]).map(
                  (button, idx) => (
                    <button
                      key={`button${idx}`}
                      onClick={() =>
                        setBookedSlot([weekdayOrder.find((ele) => ele.slice(0, 3) === value["$d"].toString().slice(0, 3).toLowerCase()), button[0]])
                      }
                      style={{
                        width: "140px",
                        backgroundColor:
                          button[1] && bookedSlot[1] && button[0] !== bookedSlot[1]
                            ? "#6dce6d"
                            : bookedSlot[1] && button[0] === bookedSlot[1]
                            ? "#1c58b1"
                            : "#f4d5da",
                        padding: "7px 15px",
                        border: "1px solid grey",
                        borderRadius: "3px",
                        cursor: "pointer",
                      }}
                      disabled={!button[1]}
                    >
                      {button[0]}
                    </button>
                  )
                )
              : null} */}
          </Box>
        </Box>
        <HealMeButtonCustom onClick={handleSubmit} disabled={loading}>
          Register Appointment
        </HealMeButtonCustom>
      </div>
    </div>
  );
}
