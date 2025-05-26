import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const getInitialAuthState = () => {
  const token = localStorage.getItem("token");
  let role = null;
  let isAuthenticated = false;
  let user = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 > Date.now()) {
        role = decoded.role;
        isAuthenticated = true;
        // Try to get user info from token (adjust these fields as per your backend)
        user = {
          name: decoded.name || decoded.username || decoded.email || "User",
          email: decoded.email,
          id: decoded.id,
          // add more fields if your token has them
        };
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      }
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    }
  }
  return {
    isAuthenticated,
    user,
    role,
    accessToken: token,
    refreshToken: localStorage.getItem("refreshToken") || null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialAuthState(),
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user || null;
      state.role = action.payload.role;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("token", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
    },
  },
});

export const { loginSuccess, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
