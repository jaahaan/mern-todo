import axios from 'axios';
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const baseUrl =  "https://mern-todo-df8q.onrender.com"
  // const baseUrl =  "http://localhost:5000"

  const login = async ( email, password) => {
    setIsLoading(true);
    setError(null);
    axios.post(`/api/user/login`, { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data));

      /** update the auth context */
      dispatch({ type: "LOGIN", payload: response.data });

      setIsLoading(false);
    }).catch(error => {
      setIsLoading(false);
      setError(error.response.data.error);
    });


    // const response = await fetch(`${baseUrl}/api/user/login`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ email, password }),
    // });
    // const json = await response.json();

    // if (!response.ok) {
    //   setIsLoading(false);
    //   setError(json.error);
    // }
    // if (response.ok) {
    //   /** save the user to local storage */
    //   localStorage.setItem("user", JSON.stringify(json));

    //   /** update the auth context */
    //   dispatch({ type: "LOGIN", payload: json });

    //   setIsLoading(false);
    // }
  };
  return { login, isLoading, error };
};
