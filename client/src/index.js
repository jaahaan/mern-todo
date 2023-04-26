import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/css/style.scss";
import "./index.css";
// import "./assets/css/vendor/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/vendor/line-awesome.min.css";
import "./assets/css/vendor/lineicons.css";
import { AuthContextProvider } from "./context/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <React.StrictMode>
      <AuthContextProvider>
          <App />
      </AuthContextProvider>
    </React.StrictMode>
  </ChakraProvider>
);


