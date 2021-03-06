import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import withSession from "./components/Auth/withSession";
import Navbar from "./components/Navbar";

import Profile from "./components/Profile/Profile";
import AddRecipe from "./components/Recipe/Add";
import Search from "./components/Recipe/Search";
import RecipePage from "./components/Recipe/RecipePage";

const client = new ApolloClient({
  uri: "http://localhost:4444/graphql",
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ networkError }) => {
    console.log("Network Error", networkError);
  }
});

const Root = ({ refetch, session }) => (
  <Router>
    <Navbar session={session} />
    <Switch>
      <Route path="/" exact component={App} />
      <Route
        path="/signin"
        render={() => {
          return <Signin refetch={refetch} />;
        }}
      />
      <Route
        path="/signup"
        render={() => {
          return <Signup refetch={refetch} />;
        }}
      />
      <Route path="/search" component={Search} />
      <Route path="/recipe/add" component={AddRecipe} />
      <Route path="/profile" component={Profile} />
      <Route path="/recipes/:_id" component={RecipePage} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById("root")
);
