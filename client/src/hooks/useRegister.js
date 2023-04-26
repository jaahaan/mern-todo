import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const baseUrl =  "https://mern-todo-s3kz.onrender.com"

  const register = async (username, email, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(`${baseUrl}/api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      /** save the user to local storage */
      localStorage.setItem("user", JSON.stringify(json));

      /** update the auth context */
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };
  return { register, isLoading, error };
};
