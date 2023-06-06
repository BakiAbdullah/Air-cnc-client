import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

// STEP:1 Base URL For Sharing the url
const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

// STEP:2
const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  // Step:3
  useEffect(() => {
    //**** */ 1. Intercept Requests (Client ------> server) N:B: config er jaigay jekono nam deya jay
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("access-token");
      if (token) { // token sobsomoy nao thakte pare tai check dite hbe
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    //** */ 2. Intercept Response (Client <------ Server  )
    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate, axiosSecure]);

  return [axiosSecure];
};

export default useAxiosSecure;
