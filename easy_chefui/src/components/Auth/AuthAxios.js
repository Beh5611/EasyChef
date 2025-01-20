import axios from "axios";
import jwt_decode from "jwt-decode";
import { useContext } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";

const baseURL = process.env.REACT_APP_PRODUCTION_BACKEND_URL || "https://anologia.pythonanywhere.com";

const useAxios = () => {
  const navigate = useNavigate();
  const { authTokens, setAuthTokens, logoutUser } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true, // Ensures cookies/session data are sent
  });

  axiosInstance.interceptors.request.use(async (req) => {
    // Proceed without modifying request if no authTokens
    if (!authTokens?.access) {
      return req; // No Authorization header, but request proceeds
    }

    // Decode token & check expiration
    const token = jwt_decode(authTokens.access);
    const isExpired = Date.now() >= token.exp * 1000;

    if (!isExpired) {
      req.headers.Authorization = `Bearer ${authTokens.access}`;
      return req;
    }

    // Token expired - check if refresh token exists
    if (!authTokens.refresh) {
      await logoutUser();
      navigate("/login");
      return null;
    }

    try {
      // Refresh access token
      const response = await axios.post(
        `${baseURL}accounts/token/refresh/`,
        { refresh: authTokens.refresh },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setAuthTokens(response.data);

        // Update session with new tokens (if needed)
        await axios.post(
          `${baseURL}accounts/session/update_token/`,
          { tokens: response.data },
          { withCredentials: true }
        );

        req.headers.Authorization = `Bearer ${response.data.access}`;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      await logoutUser();
      navigate("/login");
      return null;
    }

    return req;
  });

  return axiosInstance;
};

export default useAxios;
