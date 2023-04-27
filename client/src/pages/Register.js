import { Button } from "@chakra-ui/button";
import { React, useState } from "react";

import { Box, Container, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, isLoading, error } = useRegister();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(username, email, password);
    // setUsername('')
    // setEmail('')
    // setPassword('')
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
            Register
          </Text>
          <form onSubmit={handleSubmit}>
            <div className="input_box flex flex-col justify-center py-4">
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
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
                Register
              </Button>
            </div>
            <div className="title">
              <span>
                Already have an account? <Link to="/login">Login</Link>{" "}
              </span>
            </div>
          </form>
        </Box>
      </Container>
    </VStack>
  );
};

export default Register;
