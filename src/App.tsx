import React from "react";
import "./App.css";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { Users } from "./components/Users";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router";
import { Landning } from "./components/Landing";
import { setContext } from "apollo-link-context";
import { Signup } from "./pages/Signup";

const httpLink = new HttpLink({
  uri: "http://localhost:4000",
});

const authLink = setContext(async (req, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const link = authLink.concat(httpLink as any) as any;

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/landing" element={<Landning />}></Route>
          <Route path="/" element={<Users />}></Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
