import axios from 'axios';
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const baseUrl =  "https://mern-todo-df8q.onrender.com"
  // const baseUrl =  "http://localhost:5000"


  const register = async (username, email, password) => {
    setIsLoading(true);
    setError(null);
    axios.post(`${baseUrl}/api/user/signup`, {username, email, password }
    ).then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data));

      /** update the auth context */
      dispatch({ type: "LOGIN", payload: response.data });

      setIsLoading(false);
    }).catch(error => {
      setIsLoading(false);
      setError(error.response.data.error);
    });
  
  };
  return { register, isLoading, error };
};
