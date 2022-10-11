import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axiosClient, { BASE_URL } from "../apiConfig";

const getAllDoctors = createAsyncThunk("data/getAllDoctors", async (values, api) => {
  const URL = `${BASE_URL}/doctor`;

  try {
    const response = await axiosClient({ method: "GET", url: URL });
    return response.data;
  } catch (err) {
    const error = err.response
      ? { status: err.response.status, data: err.response.data }
      : err.request
      ? { request: err.request }
      : { message: err.message };
    return api.rejectWithValue(error);
  }
});

const getOneDoctor = createAsyncThunk("data/getOneDoctor", async (doctorId, api) => {
  const URL = `${BASE_URL}/doctor/${doctorId}`;

  try {
    const response = await axiosClient({ method: "GET", url: URL });
    return response.data;
  } catch (err) {
    const error = err.response
      ? { status: err.response.status, data: err.response.data }
      : err.request
      ? { request: err.request }
      : { message: err.message };
    return api.rejectWithValue(error);
  }
});

const registerConsultation = createAsyncThunk("data/registerConsultation", async (values, api) => {
  const URL = `${BASE_URL}/consult/apply`;

  console.log(values);

  try {
    const response = await axiosClient({ method: "POST", url: URL, data: values });
    return response.data;
  } catch (err) {
    const error = err.response
      ? { status: err.response.status, data: err.response.data }
      : err.request
      ? { request: err.request }
      : { message: err.message };
    return api.rejectWithValue(error);
  }
});

const getOneConsultation = createAsyncThunk("data/getOneConsultation", async ({ consultId }, api) => {
  const URL = `${BASE_URL}/consult/${consultId}`;

  try {
    const response = await axiosClient({ method: "GET", url: URL });
    return response.data;
  } catch (err) {
    const error = err.response
      ? { status: err.response.status, data: err.response.data }
      : err.request
      ? { request: err.request }
      : { message: err.message };
    return api.rejectWithValue(error);
  }
});

const initialState = {
  loading: false,
  doctors: null,
  filters: null,
  toBookDoctor: null,
  chosenDoctor: false,
  currentConsultation: false,
};

const dataSlice = createSlice({
  name: "data",
  initialState: { loading: false, doctors: null, filters: null, toBookDoctor: null, chosenDoctor: false, currentConsultation: false },
  reducers: {
    clearAll: (state, action) => {
      Object.assign(state, initialState);
    },
    selectToBookDoctor: (state, action) => {
      state.toBookDoctor = action.payload;
    },
  },
  extraReducers: {
    [getAllDoctors.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllDoctors.rejected]: (state, action) => {
      if (action.payload.data) console.log(`ERROR-${action.payload.status}: ${action.payload.data}`);
      state.loading = false;
    },
    [getAllDoctors.fulfilled]: (state, action) => {
      state.doctors = action.payload.allFoundDoctors;
      state.filters = { locations: { countries: [], cities: [] }, hospitals_clinics: [], specialties: [] };
      for (const doctor of action.payload.allFoundDoctors) {
        if (!state.filters.locations.countries.includes(doctor.location[0])) state.filters.locations.countries.push(doctor.location[0]);
        if (doctor.location[1] && !state.filters.locations.cities.includes(doctor.location[1]))
          state.filters.locations.cities.push(doctor.location[1]);
        if (doctor.hospital_clinic && !state.filters.hospitals_clinics.includes(doctor.hospital_clinic))
          state.filters.hospitals_clinics.push(doctor.hospital_clinic);
        if (doctor.specialty && !state.filters.specialties.includes(doctor.specialty)) state.filters.specialties.push(doctor.specialty);
      }
      state.loading = false;
      console.log("GETALLDOCTORS-STATE:", current(state));
    },
    [getOneDoctor.pending]: (state, action) => {
      state.loading = true;
    },
    [getOneDoctor.rejected]: (state, action) => {
      if (action.payload.data) console.log(`ERROR-${action.payload.status}: ${action.payload.data}`);
      state.loading = false;
    },
    [getOneDoctor.fulfilled]: (state, action) => {
      state.chosenDoctor = action.payload.foundDoctor;
      state.loading = false;
      console.log("GETONEDOCTOR-STATE:", current(state));
    },
    [registerConsultation.pending]: (state, action) => {
      state.loading = true;
    },
    [registerConsultation.rejected]: (state, action) => {
      if (action.payload.data) console.log(`ERROR-${action.payload.status}: ${action.payload.data}`);
      state.loading = false;
    },
    [registerConsultation.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("REGISTERCONSULTATION-STATE:", current(state));
    },
    [getOneConsultation.pending]: (state, action) => {
      state.loading = true;
    },
    [getOneConsultation.rejected]: (state, action) => {
      if (action.payload.data) console.log(`ERROR-${action.payload.status}: ${action.payload.data}`);
      state.loading = false;
    },
    [getOneConsultation.fulfilled]: (state, action) => {
      state.currentConsultation = action.payload;
      state.loading = false;
      console.log("REGISTERCONSULTATION-STATE:", current(state));
    },
  },
});

export { getAllDoctors, getOneDoctor, registerConsultation, getOneConsultation };

export const { clearAll, selectToBookDoctor } = dataSlice.actions;

export default dataSlice.reducer;
