import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import axiosClient, { BASE_URL } from "../apiConfig";

const signup = createAsyncThunk("auth/signup", async (values, api) => {
  const URL = `${BASE_URL}/auth/signup`;

  try {
    const response = await axios({ method: "POST", url: URL, data: values });
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

const login = createAsyncThunk("auth/login", async (values, api) => {
  const URL = `${BASE_URL}/auth/login`;

  try {
    const response = await axios({ method: "POST", url: URL, data: values });
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    localStorage.setItem("email", response.data.email);
    delete response.data.accessToken;
    delete response.data.refreshToken;
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

const verify = createAsyncThunk("auth/verify", async ({ hash }, api) => {
  const URL = `${BASE_URL}/auth/verify/${hash}`;

  try {
    const response = await axios({ method: "POST", url: URL });
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

const reset = createAsyncThunk("auth/reset", async (values, api) => {
  const URL = `${BASE_URL}/auth/reset`;

  try {
    const response = await axios({ method: "POST", url: URL, data: values });
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

const update = createAsyncThunk("auth/update", async (values, api) => {
  const URL = `${BASE_URL}/auth/update`;

  try {
    const response = await axios({ method: "POST", url: URL, data: values });
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

const onboarder = createAsyncThunk("auth/onboarder", async (values, api) => {
  console.log("onboarder-thunk-arrival", values);
  const URL = `${BASE_URL}/${values.userType.toLowerCase()}/update`;

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

const initialState = {
  loading: false,
  lgn: false,
  signupError: false,
  resetError: false,
  verifyError: false,
  updateError: false,
  lgnError: false,
  onboard: false,
  userInfo: null,
  userType: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    lgn: false,
    signupError: false,
    resetError: false,
    verifyError: false,
    updateError: false,
    lgnError: false,
    onboard: false,
    userInfo: null,
    userType: null,
  },
  reducers: {
    logout: (state, action) => {
      Object.assign(state, initialState);
      localStorage.clear();
      console.log("LOGOUT-STATE:", current(state));
    },
    resetErrors: (state, action) => {
      state.signupError = false;
      state.resetError = false;
      state.verifyError = false;
      state.lgnError = false;
    },
  },
  extraReducers: {
    [signup.pending]: (state, action) => {
      state.loading = true;
    },
    [signup.rejected]: (state, action) => {
      state.signupError = "failed";
      state.loading = false;
    },
    [signup.fulfilled]: (state, action) => {
      state.signupError = "success";
      state.loading = false;
    },
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.rejected]: (state, action) => {
      if (action.payload.data === "Verify email before login") state.lgnError = "verify";
      if (action.payload.data && action.payload.data === "Password mismatch") state.lgnError = "incorrect";
      if (action.payload.data === "Invalid Request") console.log(`ERROR-${action.payload.status}: ${action.payload.data}`);
      if (action.payload.status === 404) state.lgnError = "account404";
      state.loading = false;
    },
    [login.fulfilled]: (state, action) => {
      if (action.payload.onboard) state.onboard = true;
      state.userType = action.payload.userInfo.userType;
      state.userInfo = action.payload.userInfo;
      state.lgn = true;
      state.loading = false;
      console.log("LOGIN-CURRENT:", current(state));
    },
    [verify.pending]: (state, action) => {
      state.verifyError = true;
      state.loading = true;
    },
    [verify.rejected]: (state, action) => {
      state.verifyError = "failed";
      state.loading = false;
    },
    [verify.fulfilled]: (state, action) => {
      state.verifyError = "success";
      state.loading = false;
    },
    [reset.pending]: (state, action) => {
      state.resetError = true;
      state.loading = true;
    },
    [reset.rejected]: (state, action) => {
      if (action.payload.data === "Invalid Request") console.log(`ERROR-${action.payload.status}: ${action.payload.data}`);
      if (action.payload.status === 404) state.resetError = "account404";
      state.loading = false;
    },
    [reset.fulfilled]: (state, action) => {
      state.resetError = "success";
      state.loading = false;
    },
    [update.pending]: (state, action) => {
      state.updateError = "pending";
      state.loading = true;
    },
    [update.rejected]: (state, action) => {
      if (action.payload.data === "Invalid Request") console.log(`ERROR-${action.payload.status}: ${action.payload.data}`);
      state.updateError = "failed";
      state.loading = false;
    },
    [update.fulfilled]: (state, action) => {
      state.updateError = "success";
      state.loading = false;
    },
    [onboarder.pending]: (state, action) => {
      state.loading = true;
    },
    [onboarder.rejected]: (state, action) => {
      if (action.payload.data) console.log(`ERROR-${action.payload.status}: ${action.payload.data}`);
      state.loading = false;
    },
    [onboarder.fulfilled]: (state, action) => {
      state.onboard = false;
      state.loading = false;
    },
  },
});

export { signup, login, reset, update, verify, onboarder };

export const { logout, resetErrors } = authSlice.actions;

export default authSlice.reducer;
