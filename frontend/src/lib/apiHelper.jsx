import axios from "axios";

const API_URL = "http://localhost:5000";

export const apiHelper = {
  signup: async ({ fullName, email, password }) => {
    try {
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

      return { data: response.data };
    } catch (error) {
      console.error("Login API error:", error);
      return { error: error.response?.data?.error || error.message || "Network error" };
    }

  },

  planIternary: async ({ prompt }) => {
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
        return { error: response.data.error || "Failed to get iternary" };
      }

      return { data: response.data };
    } catch (error) {
      console.error("Login API error:", error);
      return { error: error.response?.data?.error || error.message || "Network error" };
    }

  },
};
