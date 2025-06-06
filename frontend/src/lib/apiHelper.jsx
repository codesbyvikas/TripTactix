import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const apiHelper = {
  signup: async ({ fullName, email, password }) => {
    try {
      console.log(API_URL);
      const response = await axios.post(`${API_URL}/user/signup`, {
        fullName,
        email,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (![200, 201].includes(response.status) || response.data.error) {
        return { error: response.data.error || "Signup failed" };
      }

      return { data: response.data };
    } catch (error) {
      console.error("Signup API error:", error);
      return { error: error.response?.data?.error || error.message || "Network error" };
    }
  },

  login: async ({ email, password }) => {
    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        email,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (![200, 201].includes(response.status) || response.data.error) {
        return { error: response.data.error || "Login failed" };
      }

      // Debug: Log response headers to see if cookie is set
      console.log("Login response headers:", response.headers);
      console.log("Login success:", response.data);

      return { data: response.data };
    } catch (error) {
      console.error("Login API error:", error);
      return { error: error.response?.data?.error || error.message || "Network error" };
    }
  },

  getProfile: async () => {
    try {
      // Debug: Log current cookies
      console.log("Current cookies:", document.cookie);
      
      const response = await axios.get(`${API_URL}/user/profile`, {
        withCredentials: true,
      });

      if (response.status !== 200 || response.data.error) {
        return { error: response.data.error || "Failed to fetch profile" };
      }

      console.log("Profile fetched successfully:", response.data);
      return { data: response.data.user };
    } catch (error) {
      console.error("Profile API error:", error);
      
      // Debug: Log request details
      console.log("Request config:", error.config);
      console.log("Request headers:", error.config?.headers);
      
      return { error: error.response?.data?.error || error.message || "Network error" };
    }
  },

  logout: async () => {
    try {
      const response = await axios.get(`${API_URL}/user/logout`, {
        withCredentials: true,
      });
      return { data: response.data };
    } catch (error) {
      return { error: error.response?.data?.error || "Logout failed" };
    }
  },

  planItinerary: async ({ prompt }) => {
    try {
      const response = await axios.post(`${API_URL}/plan/generate-itinerary`, {
        prompt
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (![200, 201].includes(response.status) || response.data.error) {
        return { error: response.data.error || "Failed to get itinerary" };
      }

      return { data: response.data };
    } catch (error) {
      console.error("Planner API error:", error);
      return { error: error.response?.data?.error || error.message || "Network error" };
    }
  },
};