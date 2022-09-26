import { Box, Container, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneConsultation } from "../../features/dataSlice";
import TimeTable from "../TimeTable";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DoctorHome() {
  const { userType, userInfo } = useSelector((state) => state.wall);
  const { toBookDoctor, chosenDoctor, loading, currentConsultation } = useSelector((state) => state.cabinet);
  const dispatch = useDispatch();
  const [currDay, setCurrDay] = useState("sunday");
  const [consultOpen, setConsultOpen] = useState(false);

  const handleSelect = (target) => {
    if (userInfo.available_times && target[1]) dispatch(getOneConsultation({ consultId: userInfo.available_times[currDay][target[0]] }));
    if (target[1]) setConsultOpen(true);
  };

  const handleCloseModal = () => setConsultOpen(false);

  return (
    <Container>
      <Box>
        <Typography>Upcoming Bookings</Typography>
        {/* {userInfo.available_times ? Object.entries(userInfo.available_times).map((ele) => <button>{ele[0]}</button>) : null} */}
        <TimeTable schedule={userInfo.available_times} currDay={currDay} setCurrDay={setCurrDay} userType={"Doctor"} handleSelect={handleSelect} />
      </Box>
      <Modal open={consultOpen} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          {currentConsultation ? (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Consultation of Patient <h6>(ID: {currentConsultation.patientId})</h6>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Reason for Consulation: {currentConsultation.consult_reason}
                Appointment Date: {new Date().setHours()}
              </Typography>
            </>
          ) : null}
        </Box>
      </Modal>
    </Container>
  );
}
