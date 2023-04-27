import { Button } from "@chakra-ui/button";
import { Box, Container, Text, VStack } from "@chakra-ui/react";
import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <VStack spacing="10px" className="container">
      <Container maxW="xl" centerContent>
        <Box
          d="flex"
          justifyContent="center"
          bg="#242526"
          w="100%"
          p={4}
          borderRadius="lg"
          style={{ marginTop: 30 }}
        >
          <Text fontSize="4xl" color="58a6ff" className="text-center">
            Login
          </Text>
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
              {error && (
                <div className="alert alert-danger text-center">{error}</div>
              )}
              <Button
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
              <span>
                Don't have an account? <Link to="/register">Register</Link>{" "}
              </span>
            </div>
          </form>
        </Box>
      </Container>
    </VStack>
  );
};

export default Login;
