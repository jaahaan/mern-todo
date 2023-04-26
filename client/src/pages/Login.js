import { Button } from "@chakra-ui/button";
import { React, useState } from "react";
import { Link } from 'react-router-dom';
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password)
  };
  return (
    <div className="container mx-auto my-5 col-md-6 col-lg-4">
      <div className="box">
        <div className="title">
          <h4>Login</h4>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input_box flex flex-col justify-center py-4">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
           {error && <div className="alert alert-danger text-center">{error}</div>}
            <Button
                colorScheme="teal"
                width="100%"
                style={{ marginTop: 15 }}
                type="submit"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Login
              </Button>
          </div>
          <div className="title">
            <span>Don't have an account? <Link to="/register">Register</Link> </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
